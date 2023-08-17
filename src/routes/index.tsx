import { component$, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

import styles from "./index.module.scss";
import { default as Flag, FLAGS } from "~/components/flag/flag";

export default component$(() => {
  const currentFlagIndex = useSignal(0);

  return (
    <div class={styles.home}>
      <header>
        <h1>Welcome to swag dot lgbt</h1>
      </header>
      <main>
        <Flag
          kind={FLAGS[currentFlagIndex.value]}
          class={styles.flag}
          onClick$={() => {
            currentFlagIndex.value =
              (currentFlagIndex.value + 1) % FLAGS.length;
          }}
        />
        <ul>
          <li>
            <Link href="https://tumblr.swag.lgbt">tumblr</Link>
          </li>
          <li>
            <Link href="https://github.com/caass">github</Link>
          </li>
        </ul>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
