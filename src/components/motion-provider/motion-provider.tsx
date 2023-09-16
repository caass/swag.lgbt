import {
  type Signal,
  component$,
  useContextProvider,
  Slot,
  createContextId,
} from "@builder.io/qwik";
import { useMediaQueryMatches } from "~/hooks/media-query-matches";

export const MotionContext = createContextId<Signal<boolean>>("lgbt.swag.prefers-reduced-motion");

export default component$(() => {
  const prefersReducedMotion = useMediaQueryMatches("(prefers-reduced-motion: reduce)");

  useContextProvider(MotionContext, prefersReducedMotion);

  return <Slot />;
});
