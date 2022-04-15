import type { FunctionComponent, ComponentPropsWithRef } from "react";
import type { FieldRenderProps } from "react-final-form";
import { Field } from "react-final-form";
import { Alignment } from "./alignment";
import { ColorPicker } from "./color-picker";
import { StarChart } from "./star-chart";
import styles from "./gender-picker.module.css";
import { titleCase } from "util/titleCase";

/**
 * A beginner-level gender picker, for cisgender people or particularly dense
 * transgender people.
 */
const BeginnerGenderPicker: FunctionComponent = () => (
  <>
    <label>
      <Field name="gender-trinary" component="input" type="radio" value="man" />
      Man
    </label>
    <label>
      <Field
        name="gender-trinary"
        component="input"
        type="radio"
        value="woman"
      />
      Woman
    </label>
    <label>
      <Field
        name="gender-trinary"
        component="input"
        type="radio"
        value="non-binary"
      />
      Non-Binary
    </label>
  </>
);

/**
 * An intermediate-level gender picker, for people taking their first little
 * baby steps towards understanding Gender.
 */
const IntermediateGenderPicker: FunctionComponent = () => (
  <>
    <label>
      Masculine
      <Field
        name="masculine-feminine-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Feminine
    </label>
  </>
);

/**
 * An advanced-level gender picker, for cisgender allies, eggs, or transgender
 * people with a moderate understanding of Gender.
 */
const AdvancedGenderPicker: FunctionComponent = () => (
  <>
    <label>
      Masculine
      <Field
        name="masculine-feminine-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Feminine
    </label>
    <label>
      Agender
      <Field
        name="agender-hypergender-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Hypergender
    </label>
    <label>
      Queer
      <Field
        name="normativity-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Normative
    </label>
  </>
);

/**
 * An expert-level gender picker for those sufficient enough in Gender to
 * understand it as a complex subject with varied and multifaceted spectra.
 * Due to the nature of Gender this picker cannot ever be exhaustive, but PR's
 * are welcome to assist in the sisyphean task of creating a truly accurate
 * gender picker.
 */
const ExpertGenderPicker: FunctionComponent = () => (
  <>
    <label>
      Hypomasculine
      <Field
        name="masculinity-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Hypermasculine
    </label>
    <label>
      Hypofeminine
      <Field
        name="femininity-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Hyperfeminine
    </label>
    <label>
      Gendersolid
      <Field
        name="fluidity-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Genderfluid
    </label>
    <label>
      Cis
      <Field
        name="trans-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Trans
    </label>
    <label>
      Queer
      <Field
        name="normativity-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Normative
    </label>
    <StarChart />
    <label>
      Aura
      <Field
        name="aura"
        component={ColorPicker}
        className={styles.aura}
        styles={{
          default: {
            controls: { display: "none" },
            head: { display: "none" },
            body: { padding: "0.5rem" },
          },
        }}
      />
    </label>
    <label>
      Nerd
      <Field
        name="nerd-jock-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Jock
    </label>
    <label>
      Wretched
      <Field
        name="wretchedness-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Ethereal
    </label>
    <label>
      Herbivore
      <Field
        name="omnivorous-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Carnivore
    </label>
    <label>
      Cringe
      <Field
        name="cringe-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Based
    </label>
    <Alignment />
    <label>
      Pure of Heart, Dumb of Ass
      <Field
        name="pureness-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Villain (Sexy)
    </label>
    <label>
      Hoarder
      <Field
        name="clutter-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Spartan
    </label>
    <label>
      Top
      <Field
        name="position-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Bottom
    </label>
    <label>
      Cats
      <Field
        name="cats-dogs-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Dogs
    </label>
    <label>
      Podcasts
      <Field
        name="audio-axis"
        component="input"
        type="range"
        min="0"
        max="100"
        step="10"
      />
      Music
    </label>
  </>
);

/**
 * For those among us who are true Gender Understanders, nothing less than full
 * control over their gender identity will do. Hence, the humble textarea is
 * elevated to the status of One True Gender Picker.
 *
 * To non-believers, who want gender to be an enum (or even worse, a boolean),
 * I say this: it's `${currentYear}`, I promise your Postgres instance can
 * handle the few extra bytes necessary to store a string.
 */
const HardcoreGenderPicker: FunctionComponent = () => (
  <Field name="gender-details" component="textarea" />
);

/**
 * A gender picker beyond the comprehension of most mortals, reserved for those
 * rare few who have peered long and hard into the void of Their Own Identity
 * without coming away raving and gibbering fools -- those divine amogus who
 * have decided that while they certainly Have or Do Not Have a Gender, even
 * attempting to explain their identity is a foolish and impossible task.
 */
const ElevatedGenderPicker: FunctionComponent = () => (
  <>
    <label>
      <Field
        name="gender-boolean"
        component="input"
        type="radio"
        value="yes-gender"
      />
      Yes
    </label>
    <label>
      <Field
        name="gender-boolean"
        component="input"
        type="radio"
        value="no-gender"
      />
      No
    </label>
  </>
);

const genderPickerMap: Record<string, FunctionComponent> = {
  beginner: BeginnerGenderPicker,
  intermediate: IntermediateGenderPicker,
  advanced: AdvancedGenderPicker,
  expert: ExpertGenderPicker,
  hardcore: HardcoreGenderPicker,
  elevated: ElevatedGenderPicker,
};

const GenderPickerBody: FunctionComponent<FieldRenderProps<string>> = ({
  input: { value: picker },
}) => {
  const Picker = genderPickerMap[picker];
  return <Picker />;
};

export const GenderPicker: FunctionComponent<
  ComponentPropsWithRef<"fieldset">
> = (props) => {
  return (
    <fieldset {...props}>
      <legend>Gender</legend>
      <Field
        name="level"
        component="select"
        initialValue="beginner"
        className={styles["level"]}
      >
        {Object.keys(genderPickerMap).map((level) => (
          <option value={level} key={level}>
            {titleCase(level)}
          </option>
        ))}
      </Field>
      <Field
        name="level"
        subscription={{ value: true }}
        component={GenderPickerBody}
      />
    </fieldset>
  );
};
