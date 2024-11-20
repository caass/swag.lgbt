import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { FLAG_CONTEXT_NAME } from "~/components/flag-provider/flag-provider";
import { type FlagName } from "~/components/flag/flag";
import { cookie } from "~/hooks/cookie";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return <Slot />;
});

const flagCookie = cookie<FlagName>(FLAG_CONTEXT_NAME, "progressPride");

export const useFlagLoader = routeLoader$((event) =>
  flagCookie.loaderImpl(event),
);
export const useFlagCookie = flagCookie.createHook(useFlagLoader);
