import {
  type QwikIntrinsicElements,
  component$,
  useContext,
  useComputed$,
} from "@builder.io/qwik";

import styles from "./flag.module.scss";
import { FlagContext } from "~/components/flag-provider/flag-provider";

// todo: move these somewhere they can be shared by scss...json maybe?
const FLAGS = ["progress-pride", "trans", "lesbian"] as const;
const NUM_COLUMNS = 18;

const lesbianFlagDescription = `An animated pixel-art seven-stripe lesbian pride flag.

The seven stripes represent, from top to bottom: Gender Non-Conformity, Independence, Community, Relationships Unique to Womanhood, Serenity and Peace, Love and Sex, Femininity`;

const progressPrideDescription = `An animated pixel-art intersex-inclusive progress pride flag.

The horizontal stripes from the Rainbow Flag represent, from top to bottom: Life, Healing, Sunlight, Nature, Serenity, and Spirit.

The diagonal stripes black and brown stripes from the Philadelphia Rainbow Flag represent, from right to left, Black people and their inclusion and those that have been lost to AIDS, and Brown people and their inclusion.

The three diagonal stripes to left from the Transgender Pride flag represent, from right to left, the traditional color for baby boys, the traditional color for baby girls, and people who are transitioning or non-binary.

The purple circle set on a yellow field from the Intersex Pride flag represents completeness and feeling whole, and both colors are chosen to avoid traditionally gendered colors.`;

const transPrideDescription = `An animated pixel-art transgender pride flag.

The blue stripes symbolize the traditional color for baby boys.

The pink stripes symbolize the traditional color for baby girls.

The central white stripe represents those who are transitioning or are agender or otherwise non-binary.`;

export type FlagName = (typeof FLAGS)[number];

type FlagProps = Omit<QwikIntrinsicElements["div"], "onClick$">;

export default component$(({ class: classes, ...props }: FlagProps) => {
  const columns = [...new Array(NUM_COLUMNS).keys()];
  const flag = useContext(FlagContext);
  const titleText = useComputed$(() => {
    switch (flag.value) {
      case "progress-pride":
        return progressPrideDescription;
      case "trans":
        return transPrideDescription;
      case "lesbian":
        return lesbianFlagDescription;
      default:
        throw new Error(`Unknown flag: ${flag.value}`);
    }
  });

  return (
    <div
      class={`${styles.flag} ${styles[flag.value]} ${classes}`}
      title={titleText.value}
      onClick$={() => {
        switch (flag.value) {
          case "progress-pride":
            flag.value = "trans";
            break;
          case "trans":
            flag.value = "lesbian";
            break;
          case "lesbian":
            flag.value = "progress-pride";
            break;
          default:
            throw new Error(`Unknown flag: ${flag.value}`);
        }
      }}
      {...props}
    >
      {columns.map((_, i) => {
        return <div class={styles.column} key={`column-${i}`} />;
      })}
    </div>
  );
});
