import {
  type Signal,
  useSignal,
  useTask$,
  useOnDocument,
  $,
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

  // we register this first to have it run client-side before the lower task
  // so it can set the value if it's already in document cookies
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
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
    }),
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

/**
 * `CookieOptions` with a required `Same-Site` attribute
 */
interface SwagCookieOptions extends CookieOptions {
  sameSite: Required<CookieOptions>["sameSite"];
}

/**
 * Set up the scaffolding required to use a cookie with a string payload.
 *
 * @param name The name of the cookie
 * @param defaultValue The default cookie value to use if none is already set
 * @param options `CookieOptions` to configure the cookie. Defaults to `{ sameSite: "strict", secure: true }`
 */
export function cookie<T extends string, PLATFORM = QwikCityPlatform>(
  name: string,
  defaultValue: T,
  options?: SwagCookieOptions,
): {
  /**
   * Route loader implementation to read and/or set this cookie server-side.
   *
   * You'll need to wire this up to a `routeLoader$` in an arrow function
   * manually since Qwik depends on you exporting loaders from your `layout.tsx`:
   *
   * ```ts
   * // layout.tsx
   * const myCookie = cookie("my-cookie", "cookie-default-value");
   * export const useCookieLoader = routeLoader$((event) => myCookie.loaderImpl(event));
   * ```
   */
  loaderImpl: (requestEvent: RequestEventLoader<PLATFORM>) => T;

  /**
   * Convenience function to create a hook you can use client-side to access this cookie.
   */
  createHook(cookieLoader: Loader<T>): () => Signal<T>;
};
export function cookie<T extends number, PLATFORM = QwikCityPlatform>(
  name: string,
  defaultValue: T,
  options?: SwagCookieOptions,
): {
  loaderImpl: (requestEvent: RequestEventLoader<PLATFORM>) => T;
  createHook(cookieLoader: Loader<T>): () => Signal<T>;
};
export function cookie<
  T extends Record<string, unknown>,
  PLATFORM = QwikCityPlatform,
>(
  name: string,
  defaultValue: T,
  options?: SwagCookieOptions,
): {
  loaderImpl: (requestEvent: RequestEventLoader<PLATFORM>) => T;
  createHook(cookieLoader: Loader<T>): () => Signal<T>;
};
export function cookie<
  T extends string | number | Record<string, unknown>,
  PLATFORM = QwikCityPlatform,
>(
  name: string,
  defaultValue: T,
  options: SwagCookieOptions = {
    sameSite: "strict",
    secure: true,
    domain: __APP_URL__,
  },
): {
  loaderImpl: (requestEvent: RequestEventLoader<PLATFORM>) => T;
  createHook(cookieLoader: Loader<T>): () => Signal<T>;
} {
  const createHook = (useCookieLoader: Loader<T>) => {
    const useCookie = () => {
      const initialValue = useCookieLoader();
      const cookieValue = useSignal(initialValue.value);
      useCookiePersistence(name, cookieValue, options);
      return cookieValue as Signal<T>;
    };

    return useCookie;
  };

  const loaderImpl = createCookieLoader<T, PLATFORM>(
    name,
    defaultValue,
    options,
  );

  return {
    loaderImpl,
    createHook,
  };
}
