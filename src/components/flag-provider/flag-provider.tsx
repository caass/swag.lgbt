import {
  type Signal,
  component$,
  useContextProvider,
  Slot,
  createContextId,
} from "@builder.io/qwik";
import { type FlagName } from "~/components/flag/flag";
import { useFlagCookie, useFlagLoader } from "~/routes/layout";

export const FLAG_CONTEXT_NAME = "lgbt.swag.flag-kind";

export const FlagContext = createContextId<Signal<FlagName>>(FLAG_CONTEXT_NAME);

export default component$(() => {
  const flag = useFlagCookie(useFlagLoader);
  useContextProvider(FlagContext, flag);

  return <Slot />;
});
