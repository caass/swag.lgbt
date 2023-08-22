import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { a } from "@builder.io/qwik-city";

export const useAge = routeLoader$(async () => {
  const now = new Date();
  const yearsSince99 = now.getFullYear() - 1999;

  if (now.getMonth() === 0 && now.getDate() < 6) {
    // it's not my birthday yet
    return yearsSince99 - 1;
  } else {
    return yearsSince99;
  }
});

export default component$(() => {
  const age = useAge();

  return (
    <>
      <header>
        <h1>about me</h1>
      </header>
      <main>
        <p>my name is cass, and this is my website.</p>
        <p>
          i'm {age.value} years old and my hobbies include reading,{" "}
          <a href="https://www.last.fm/user/caaaass">listening to music</a>,{" "}
          <a href="https://github.com/caass/">writing code</a>, and that sort of
          thing.
        </p>
        <p>
          I have this website mostly because the domain name was available and i
          thought it was fun. But since I've got it, I use it to post{" "}
          <a href="/blog">well-thought-out long-form content</a>. As opposed to{" "}
          <a href="https://tumblr.swag.lgbt">my tumblr</a>, which is for
          poorly-thought-out short-form content.
        </p>
        <p>
          More interesting facts...well, my flags are all here, you can click
          through them and it'll cycle the ones I identify with. I shamelessly
          stole the idea from{" "}
          <a href="https://www.joshwcomeau.com/animation/pride-flags/">
            josh comeau
          </a>
          . I also used to play the saxophone.
        </p>
        <p>This font is </p>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "about cass",
  meta: [
    {
      name: "description",
      content: "a little about me, cass.",
    },
  ],
};
