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
        <Flag kind="pan" />
        <ul>
          <li>
            <Link href="/blog">blog</Link>
          </li>
          <li>
            <Link href="https://tumblr.swag.lgbt">tumblr</Link>
          </li>
          <li>
            <Link href="/about">about</Link>
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
