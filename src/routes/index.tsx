import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Flag } from "~/components/flag/flag";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <Flag />
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
    </>
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
