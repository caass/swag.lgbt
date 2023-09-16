import {
  type VisibleTaskStrategy,
  type Signal,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

/**
 * Check if a media query matches.
 * 
 * ```tsx
 * const prefersReducedMotion = useMediaQueryMatches$(
    "(prefers-reduced-motion: reduce)"
  );
 * return (
 *   <div
 *     class={prefersReducedMotion.value ? styles["static"] : styles["dynamic"]}
 *   >
 *     Hello, world!
 *   </div>
 * )
 * ```
 */
export const useMediaQueryMatches = (
  query: string,
  opts?: { default?: boolean; strategy?: VisibleTaskStrategy },
): Signal<boolean> => {
  const mediaQueryMatches = useSignal(opts?.default ?? false);

  useVisibleTask$(
    () => {
      const mediaQuery = window.matchMedia(query);
      mediaQueryMatches.value = mediaQuery.matches;
      mediaQuery.onchange = (event) => {
        mediaQueryMatches.value = event.matches;
      };
    },
    { strategy: opts?.strategy },
  );

  return mediaQueryMatches;
};
