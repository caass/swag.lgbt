import {
  type Signal,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  type Loader,
  type CookieOptions,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { isBrowser } from "@builder.io/qwik/build";

// ripped from https://github.com/BuilderIO/qwik/blob/main/packages/qwik-city/middleware/request-handler/cookie.ts#L17
const SAMESITE = {
  lax: "Lax",
  none: "None",
  strict: "Strict",
} as const;

const UNIT = {
  seconds: 1,
  minutes: 1 * 60,
  hours: 1 * 60 * 60,
  days: 1 * 60 * 60 * 24,
  weeks: 1 * 60 * 60 * 24 * 7,
};

function tryDecodeUriComponent(str: string) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

const createSetCookieValue = (
  cookieName: string,
  cookieValue: string,
  options: CookieOptions
) => {
  const c = [`${cookieName}=${cookieValue}`];

  if (typeof options.domain === "string") {
    c.push(`Domain=${options.domain}`);
  }

  // If both Expires and Max-Age are set, Max-Age has precedence.
  if (typeof options.maxAge === "number") {
    c.push(`Max-Age=${options.maxAge}`);
  } else if (Array.isArray(options.maxAge)) {
    c.push(`Max-Age=${options.maxAge[0] * UNIT[options.maxAge[1]]}`);
  } else if (
    typeof options.expires === "number" ||
    typeof options.expires == "string"
  ) {
    c.push(`Expires=${options.expires}`);
  } else if (options.expires instanceof Date) {
    c.push(`Expires=${options.expires.toUTCString()}`);
  }

  if (options.httpOnly) {
    c.push("HttpOnly");
  }

  if (typeof options.path === "string") {
    c.push(`Path=${options.path}`);
  }

  const sameSite = resolveSameSite(options.sameSite);
  if (sameSite) {
    c.push(`SameSite=${sameSite}`);
  }

  if (options.secure) {
    c.push("Secure");
  }

  return c.join("; ");
};

const setCookie =
  (document: Document) =>
  (
    name: string,
    value: Signal<string | number | Record<string, unknown>>,
    options?: CookieOptions
  ) => {
    const serializedValue =
      typeof value.value === "string"
        ? value.value
        : typeof value.value === "number"
        ? value.value.toString()
        : JSON.stringify(value.value);

    document.cookie = createSetCookieValue(
      name,
      serializedValue,
      options ?? {}
    );
  };

function resolveSameSite(
  sameSite: boolean | "strict" | "lax" | "none" | undefined
) {
  if (sameSite === true) {
    return "Strict";
  }
  if (sameSite === false) {
    return "None";
  }
  if (sameSite) {
    return SAMESITE[sameSite];
  }
  return undefined;
}

const parseCookieString = (cookieString: string | undefined | null) => {
  const cookie: Record<string, string> = {};
  if (typeof cookieString === "string" && cookieString !== "") {
    const cookieSegments = cookieString.split(";");
    for (const cookieSegment of cookieSegments) {
      const separatorIndex = cookieSegment.indexOf("=");
      if (separatorIndex !== -1) {
        cookie[
          tryDecodeUriComponent(cookieSegment.slice(0, separatorIndex).trim())
        ] = tryDecodeUriComponent(
          cookieSegment.slice(separatorIndex + 1).trim()
        );
      }
    }
  }
  return cookie;
};

/**
 * Return the value of a cookie if it's set, and use a default if it's not.
 */
function cookieLoader<
  T extends string | number | Record<string, unknown>,
  PLATFORM = QwikCityPlatform,
>(name: string, defaultValue: T, options?: CookieOptions) {
  return (requestEvent: RequestEventLoader<PLATFORM>) => {
    const cookie = requestEvent.cookie.get(name);

    if (cookie === null) {
      requestEvent.cookie.set(name, defaultValue, options);
      return defaultValue;
    } else if (typeof defaultValue === "string") {
      return cookie.value as T;
    } else if (typeof defaultValue === "number") {
      return cookie.number() as T;
    } else {
      return cookie.json<T>();
    }
  };
}

function useCookiePersistence<
  T extends string | number | Record<string, unknown>,
>(name: string, value: Signal<T>, options?: CookieOptions) {
  const hasInitialized = useSignal(false);

  // we register this first to have it run before the lower task so it can
  // set the value if it's already in document cookies
  useVisibleTask$(
    () => {
      const cookies = parseCookieString(document.cookie);

      if (name in cookies) {
        const alreadySetCookie = cookies[name];
        if (typeof value.value === "string") {
          value.value = alreadySetCookie as T;
        } else if (typeof value.value === "number") {
          value.value = Number(alreadySetCookie) as T;
        } else {
          value.value = JSON.parse(alreadySetCookie) as T;
        }
      } else {
        setCookie(document)(name, value, options);
      }

      hasInitialized.value = true;
    },
    {
      strategy: "document-idle",
    }
  );

  // this will run before the above task since `useTask$` executes before `useVisibleTask$`
  // we want to register the tracking, but we use a server guard (or in this case,
  // browser guard) to only access `window` in the browser and after we've initalized
  // (i.e. loaded a value from localstorage)
  useTask$(({ track }) => {
    track(() => value.value);

    if (isBrowser && hasInitialized.value) {
      setCookie(document)(name, value, options);
    }
  });
}

export function cookie<T extends string, PLATFORM = QwikCityPlatform>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): [
  (requestEvent: RequestEventLoader<PLATFORM>) => T,
  (useCookieLoader: Loader<T>) => Signal<T>,
];
export function cookie<T extends number, PLATFORM = QwikCityPlatform>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): [
  (requestEvent: RequestEventLoader<PLATFORM>) => T,
  (useCookieLoader: Loader<T>) => Signal<T>,
];
export function cookie<
  T extends Record<string, unknown>,
  PLATFORM = QwikCityPlatform,
>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): [
  (requestEvent: RequestEventLoader<PLATFORM>) => T,
  (useCookieLoader: Loader<T>) => Signal<T>,
];
export function cookie<
  T extends string | number | Record<string, unknown>,
  PLATFORM = QwikCityPlatform,
>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): [
  (requestEvent: RequestEventLoader<PLATFORM>) => T,
  (useCookieLoader: Loader<T>) => Signal<T>,
] {
  const useThisCookie = (useCookieLoader: Loader<T>) =>
    useCookie(useCookieLoader, name, options);

  return [
    cookieLoader<T, PLATFORM>(name, defaultValue, options),
    useThisCookie,
  ];
}

const useCookie = <T extends string | number | Record<string, unknown>>(
  useCookieLoader: Loader<T>,
  name: string,
  options?: CookieOptions
): Signal<T> => {
  const initialValue = useCookieLoader();
  const cookieValue = useSignal(initialValue.value);
  useCookiePersistence(name, cookieValue, options);
  return cookieValue as Signal<T>;
};
