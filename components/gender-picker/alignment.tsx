import type { FunctionComponent } from "react";
import { Field } from "react-final-form";

const moralitySpectrum = ["Good", "Neutral", "Evil"];
const authoritySpectrum = ["Lawful", "Neutral", "Chaotic"];

export const Alignment: FunctionComponent = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          {authoritySpectrum.map((authority) => (
            <td key={authority}>{authority}</td>
          ))}
        </tr>
        {moralitySpectrum.map((morality) => (
          <tr key={morality}>
            <td>{morality}</td>
            {authoritySpectrum.map((authority) => (
              <td key={`${authority}-${morality}`}>
                <Field
                  name="alignment"
                  component="input"
                  type="radio"
                  value={`${authority} ${morality}`}
                  aria-label={`${authority} ${morality}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
