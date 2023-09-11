import {
  type QwikIntrinsicElements,
  component$,
  useContext,
  useComputed$,
} from "@builder.io/qwik";

import { FlagContext } from "~/components/flag-provider/flag-provider";

import styles from "./flag.module.scss";
import flags from "./flags.json";

const FLAGS = Object.keys(flags) as (keyof typeof flags)[];
const NUM_COLUMNS = 18;

export type FlagName = (typeof FLAGS)[number];

export const isFlagName = (name: string): name is FlagName => {
  return name === "progress-pride" || name === "lesbian" || name === "trans";
};

type FlagProps = Omit<QwikIntrinsicElements["div"], "onClick$">;

export default component$(({ class: classes, ...props }: FlagProps) => {
  const columns = [...new Array(NUM_COLUMNS).keys()];
  const flag = useContext(FlagContext);
  const titleText = useComputed$(() => {
    return flags[flag.value]["description"];
  });

  return (
    <div
      class={`${styles.flag} ${styles[flag.value]} ${classes}`}
      title={titleText.value}
      onClick$={() => {
        switch (flag.value) {
          case "progress-pride":
            flag.value = "trans";
            break;
          case "trans":
            flag.value = "lesbian";
            break;
          case "lesbian":
            flag.value = "progress-pride";
            break;
          default:
            throw new Error(`Unknown flag: ${flag.value}`);
        }
      }}
      {...props}
    >
      {columns.map((_, i) => {
        return <div class={styles.column} key={`column-${i}`} />;
      })}
    </div>
  );
});
