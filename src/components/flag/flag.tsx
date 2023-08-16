import { component$ } from "@builder.io/qwik";

import styles from "./flag.module.scss";

export type FlagProps = {
  kind: "pan";
};

export default component$((props: FlagProps) => {
  const columns = [...new Array(15).keys()];
  return (
    <div class={[styles.flag, styles[props.kind]]}>
      {columns.map((_, i) => {
        return (
          <div
            class={[styles.column, styles[`column-${i}`]]}
            key={`column-${i}`}
          />
        );
      })}
    </div>
  );
});
