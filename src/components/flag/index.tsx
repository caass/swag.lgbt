import {
  type PropsOf,
  component$,
  useStylesScoped$,
  useContext,
  $,
} from "@builder.io/qwik";

import styles from "./flag.module.css";
import { FlagContext } from "../flag-provider";

const FLAGS = {
  progressPride: {
    cssClass: styles["progress-pride"],
    altText:
      "A pixel-art intersex-inclusive progress pride flag.\n\nThe horizontal stripes from the Rainbow Flag represent, from top to bottom: Life, Healing, Sunlight, Nature, Serenity, and Spirit.\n\nThe diagonal black and brown stripes from the Philadelphia Rainbow Flag represent, from right to left, Black people and their inclusion and those that have been lost to AIDS, and Brown people and their inclusion.\n\nThe three diagonal stripes to left from the Transgender Pride flag represent, from right to left, the traditional color for baby boys, the traditional color for baby girls, and people who are transitioning or non-binary.\n\nThe purple circle set on a yellow field from the Intersex Pride flag represents completeness and feeling whole. Purple and yellow are chosen to avoid traditionally gendered colors.",
  },
  lesbian: {
    cssClass: styles.lesbian,
    altText:
      "A pixel-art seven-stripe lesbian pride flag.\n\nThe seven stripes represent, from top to bottom: Gender Non-Conformity, Independence, Community, Relationships Unique to Womanhood, Serenity and Peace, Love and Sex, Femininity",
  },
  transgender: {
    cssClass: styles.transgender,
    altText:
      "A pixel-art transgender pride flag.\n\nThe blue stripes symbolize the traditional color for baby boys. The pink stripes symbolize the traditional color for baby girls. The central white stripe represents those who are transitioning or are agender or otherwise non-binary.",
  },
} as const;

export type FlagName = keyof typeof FLAGS;

export type FlagProps = {
  displayAltText?: boolean;
  cycleOnClick?: boolean;
} & PropsOf<"div">;

export const Flag = component$(
  ({
    displayAltText = false,
    cycleOnClick = false,
    class: classes,
    title,
    onClick$,
    ...props
  }: FlagProps) => {
    const currentFlag = useContext(FlagContext);

    useStylesScoped$(".pointer { cursor: pointer; }");

    return (
      <div
        title={displayAltText ? FLAGS[currentFlag.value].altText : title}
        class={[
          styles.flag,
          FLAGS[currentFlag.value].cssClass,
          { pointer: cycleOnClick },
          `${classes}`,
        ]}
        onClick$={
          cycleOnClick
            ? $(() => {
                switch (currentFlag.value) {
                  case "progressPride": {
                    currentFlag.value = "transgender";
                    break;
                  }
                  case "transgender": {
                    currentFlag.value = "lesbian";
                    break;
                  }
                  case "lesbian": {
                    currentFlag.value = "progressPride";
                    break;
                  }
                }
              })
            : onClick$
        }
        {...props}
      >
        {/* 18 columns */}
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
  },
);
