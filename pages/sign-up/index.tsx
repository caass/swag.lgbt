import { GenderPicker } from "components/gender-picker";
import type { NextPage } from "next";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import styles from "./sign-up.module.css";

const SignUpForm: NextPage = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <div className={styles["container"]}>
      <Form
        onSubmit={(values) => {
          console.log(values);
          setHasSubmitted(true);
        }}
        destroyOnUnregister
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles["form"]}>
            <fieldset>
              <legend>Sign Up</legend>
              <label>
                Name
                <Field name="name" component="input" type="text" value="name" />
              </label>
              <label>
                Email
                <Field
                  name="email"
                  component="input"
                  type="email"
                  value="email"
                />
              </label>
              <GenderPicker />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        )}
      />
      {hasSubmitted
        ? "congratulations, your information has been submitted to the NSA for processing"
        : null}
    </div>
  );
};

export default SignUpForm;
