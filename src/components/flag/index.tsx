import {
  type QwikIntrinsicElements,
  component$,
  useContext,
  useComputed$,
  useStylesScoped$,
} from "@builder.io/qwik";

import { FlagContext } from "~/components/flag-provider";

import styles from "./flag.module.scss";
import flags from "./flags.json";

const FLAGS = Object.keys(flags) as (keyof typeof flags)[];
const NUM_COLUMNS = 18;

export type FlagName = (typeof FLAGS)[number];

export const isFlagName = (name: string): name is FlagName => {
  return name === "progress-pride" || name === "lesbian" || name === "trans";
};

export type FlagProps = {
  displayAltText?: boolean;
  cycleOnClick?: boolean;
} & Omit<QwikIntrinsicElements["div"], "onClick$">;

export const Flag = component$(
  ({ class: classes, cycleOnClick = false, displayAltText = false, ...props }: FlagProps) => {
    const columns = [...new Array(NUM_COLUMNS).keys()];
    const flag = useContext(FlagContext);
    const titleText = useComputed$(() => {
      return flags[flag.value]["description"];
    });

    useStylesScoped$(".pointer { cursor: pointer; }");

    return (
      <div
        class={[styles.flag, styles[flag.value], { pointer: cycleOnClick }, `${classes}`]}
        title={displayAltText ? titleText.value : undefined}
        onClick$={() => {
          if (!cycleOnClick) {
            return;
          }
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
  },
);
