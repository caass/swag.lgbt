import { component$ } from "@builder.io/qwik";

import styles from "./flag.module.css";

export const Flag = component$(() => {
  return (
    <div class={[styles.flag, styles["progress-pride"]]}>
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
      <span class={styles.column} />
    </div>
  );
});
