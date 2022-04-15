import { LinkList } from "components/link-list";
import type { NextPage } from "next";
import styles from "./index.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles["content"]}>
      <p>hello, welcome to swag dot lgbt 😎</p>
      <p>there is not much here. but you do not need much. to have swag!!</p>
      <ul>
        <li>
          things that have been useful to me
          <LinkList
            links={[
              {
                text: "the trevor project",
                href: "https://www.thetrevorproject.org/",
              },
              {
                text: "name / gender change info (US)",
                href: "https://transequality.org/documents",
              },
              {
                text: "substance abuse & mental health hotline",
                href: "https://www.samhsa.gov/find-help/national-helpline",
              },
            ]}
          />
        </li>
        <li>
          things that i made
          <LinkList links={[{ text: "sign up now!", href: "/sign-up" }]} />
        </li>
      </ul>
    </div>
  );
};

export default Home;
