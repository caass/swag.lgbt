import {
  type Signal,
  component$,
  useContextProvider,
  useSignal,
  Slot,
  createContextId,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

export const MotionContext = createContextId<Signal<boolean>>(
  "lgbt.swag.prefers-reduced-motion"
);

const useMediaQueryMatches$ = (query: string): Signal<boolean> => {
  const mediaQueryMatches = useSignal(false);

  if (isBrowser) {
    const mediaQuery = window.matchMedia(query);
    mediaQueryMatches.value = mediaQuery.matches;
    mediaQuery.onchange = (event) => {
      mediaQueryMatches.value = event.matches;
    };
  }

  return mediaQueryMatches;
};

export default component$(() => {
  const prefersReducedMotion = useMediaQueryMatches$(
    "(prefers-reduced-motion: reduce)"
  );

  useContextProvider(MotionContext, prefersReducedMotion);

  return <Slot />;
});
