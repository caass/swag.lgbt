import { type Signal, useSignal, useVisibleTask$, useTask$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

/**
 * Persist the value of a signal to [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),
 * updating the stored value on each change.
 *
 * If there is already a value in local storage when this hook first executes,
 * the value of the signal will be updated to match it.
 *
 * @returns a signal indicating whether or not the value has been initialized
 */

export const useLocalStorage = (key: string, value: Signal<string>) => {
  const hasInitialized = useSignal(false);

  // we register this first to have it run before the lower task so it can
  // set the value if it's already in local storage
  useVisibleTask$(
    () => {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        value.value = storedValue;
      } else {
        window.localStorage.setItem(key, value.value);
      }

      hasInitialized.value = true;
    },
    {
      // execute eagerly, on document load
      strategy: "document-ready",
    },
  );

  // this will run before the above task since `useTask$` executes before `useVisibleTask$`
  // we want to register the tracking, but we use a server guard (or in this case,
  // browser guard) to only access `window` in the browser and after we've initalized
  // (i.e. loaded a value from localstorage)
  useTask$(({ track }) => {
    track(() => value.value);

    if (isBrowser && hasInitialized.value) {
      window.localStorage.setItem(key, value.value);
    }
  });

  return hasInitialized;
};
