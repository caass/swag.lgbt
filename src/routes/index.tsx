import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

import styles from "./index.module.scss";
import Flag from "~/components/flag/flag";

export default component$(() => {
  return (
    <div class={styles.home}>
      <header>
        <h1>Welcome to swag dot lgbt</h1>
      </header>
      <main>
        <Flag class={styles.flag} />
        <ul class={styles.links}>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <Link href="blog">blog</Link>
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
      content: "this is my homepage",
    },
  ],
};
