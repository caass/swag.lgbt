import {
  type Signal,
  component$,
  useContextProvider,
  useSignal,
  Slot,
  createContextId,
} from "@builder.io/qwik";
import { type FlagName } from "~/components/flag/flag";

export const FlagContext = createContextId<Signal<FlagName>>("lgbt.swag.flag");

type FlagProviderProps = {
  default?: FlagName;
};

export default component$((props: FlagProviderProps) => {
  useContextProvider(FlagContext, useSignal(props.default ?? "progress-pride"));

  return <Slot />;
});
