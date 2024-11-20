import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Flag } from "~/components/flag";

import styles from "./index.module.css";

export default component$(() => {
  return (
    <div class={styles.home}>
      <header>
        <h1>Welcome to swag dot lgbt</h1>
      </header>
      <main>
        <Flag class={styles.flag} cycleOnClick displayAltText />
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "swagLGBT",
  meta: [
    {
      name: "description",
      content: "swagLGBT",
    },
  ],
};
