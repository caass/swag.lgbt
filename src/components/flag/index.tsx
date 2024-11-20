import {
  type PropsOf,
  component$,
  useStylesScoped$,
  type QRLEventHandlerMulti,
  type Signal,
  useContext,
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
  onClick$?: QRLEventHandlerMulti<PointerEvent, HTMLDivElement>;
} & Omit<PropsOf<"div">, "onClick$">;

export const cycleFlags = async (flag: Signal<FlagName>) => {
  switch (flag.value) {
    case "progressPride": {
      flag.value = "transgender";
      break;
    }
    case "transgender": {
      flag.value = "lesbian";
      break;
    }
    case "lesbian": {
      flag.value = "progressPride";
      break;
    }
  }
};

export const Flag = component$(
  ({ displayAltText = false, class: classes, title, ...props }: FlagProps) => {
    const currentFlag = useContext(FlagContext);

    useStylesScoped$(".pointer { cursor: pointer; }");

    return (
      <div
        title={displayAltText ? FLAGS[currentFlag.value].altText : title}
        class={[
          styles.flag,
          FLAGS[currentFlag.value].cssClass,
          { pointer: props.onClick$ !== undefined },
          `${classes}`,
        ]}
        {...props}
      >
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
