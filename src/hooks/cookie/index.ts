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
import { parseCookieString, setCookie } from "./util";

/**
 * Return the value of a cookie if it's set, and use a default if it's not.
 */
function createCookieLoader<
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
        setCookie(document)(name, value.value, options);
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
    const cookieValue = track(() => value.value);
    const cookieHasInitialized = track(() => hasInitialized.value);

    if (isBrowser && cookieHasInitialized) {
      setCookie(document)(name, cookieValue, options);
    }
  });
}

export function cookie<T extends string, PLATFORM = QwikCityPlatform>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): {
  cookieLoader: (requestEvent: RequestEventLoader<PLATFORM>) => T;
  createCookieHook(cookieLoader: Loader<T>): () => Signal<T>;
};
export function cookie<T extends number, PLATFORM = QwikCityPlatform>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): {
  cookieLoader: (requestEvent: RequestEventLoader<PLATFORM>) => T;
  createCookieHook(cookieLoader: Loader<T>): () => Signal<T>;
};
export function cookie<
  T extends Record<string, unknown>,
  PLATFORM = QwikCityPlatform,
>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): {
  cookieLoader: (requestEvent: RequestEventLoader<PLATFORM>) => T;
  createCookieHook(cookieLoader: Loader<T>): () => Signal<T>;
};
export function cookie<
  T extends string | number | Record<string, unknown>,
  PLATFORM = QwikCityPlatform,
>(
  name: string,
  defaultValue: T,
  options?: CookieOptions
): {
  cookieLoader: (requestEvent: RequestEventLoader<PLATFORM>) => T;
  createCookieHook(cookieLoader: Loader<T>): () => Signal<T>;
} {
  const createCookieHook = (useCookieLoader: Loader<T>) => {
    const useCookie = () => {
      const initialValue = useCookieLoader();
      const cookieValue = useSignal(initialValue.value);
      useCookiePersistence(name, cookieValue, options);
      return cookieValue as Signal<T>;
    };

    return useCookie;
  };

  const cookieLoader = createCookieLoader<T, PLATFORM>(
    name,
    defaultValue,
    options
  );

  return {
    cookieLoader,
    createCookieHook,
  };
}
