import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { FlagContext } from "~/components/flag-provider/flag-provider";

import { Flag, cycleFlags } from "~/components/flag/flag";

export default component$(() => {
  const flag = useContext(FlagContext);

  return (
    <>
      <h1>Hi 👋</h1>
      <Flag onClick$={() => cycleFlags(flag)} displayAltText />
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
