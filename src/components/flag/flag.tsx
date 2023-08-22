import {
  type QwikIntrinsicElements,
  component$,
  useContext,
} from "@builder.io/qwik";

import styles from "./flag.module.scss";
import { FlagContext } from "~/components/flag-provider/flag-provider";

const FLAGS = ["progress-pride", "trans", "lesbian"] as const;

export type FlagName = (typeof FLAGS)[number];

type FlagProps = Omit<QwikIntrinsicElements["div"], "onClick$">;

export default component$(({ class: classes, ...props }: FlagProps) => {
  const columns = [...new Array(18).keys()];
  const flag = useContext(FlagContext);

  return (
    <div
      class={`${styles.flag} ${styles[flag.value]} ${classes}`}
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
