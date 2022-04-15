import type { FunctionComponent } from "react";
import { Field } from "react-final-form";

const planets = [
  "Sun",
  "Moon",
  "Rising",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];
const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export const StarChart: FunctionComponent = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          {planets.map((planet) => (
            <td key={planet}>{planet}</td>
          ))}
        </tr>
        {signs.map((sign) => (
          <tr key={sign}>
            <td>{sign}</td>
            {planets.map((planet) => (
              <td key={`${sign}-${planet}`}>
                <Field
                  name={planet}
                  component="input"
                  type="radio"
                  value={sign}
                  aria-label={`${sign} ${planet}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
