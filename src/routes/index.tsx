import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import styles from "./index.module.scss";
import { Flag } from "~/components/flag";

export default component$(() => {
  return (
    <div class={styles.home}>
      <header>
        <h1>Welcome to swag dot lgbt</h1>
      </header>
      <main>
        <Flag class={styles.flag} cycleOnClick displayAltText />
        <ul class={styles.links}>
          {/* <li>
            <a href="https://tumblr.swag.lgbt">tumblr</a>
          </li> */}
          <li>
            <a href="https://github.com/caass/">github</a>
          </li>
        </ul>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "swag.lgbt",
  meta: [
    {
      name: "description",
      content: "swag dot lgbt",
    },
  ],
};
