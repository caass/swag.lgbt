import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";

import styles from "./flag.module.scss";

export const FLAGS = ["progress-pride", "pan"] as const;

export type FlagProps = {
  kind: (typeof FLAGS)[number];
} & QwikIntrinsicElements["div"];

export default component$(({ kind, class: classes, ...props }: FlagProps) => {
  const columns = [...new Array(18).keys()];
  return (
    <div class={`${styles.flag} ${styles[kind]} ${classes}`} {...props}>
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
