import { Image } from "components/image";
import type { FunctionComponent } from "react";
import styles from "./header.module.css";
import sparklyFlag from "public/sparkly-flag.gif";

const Flag: FunctionComponent = () => (
  <Image src={sparklyFlag} alt="" layout="fixed" width="99px" height="56px" />
);

export const Header: FunctionComponent = () => {
  return (
    <a
      href="https://www.outyouth.org/donate"
      target="_blank"
      rel="noreferrer noopener"
      className={styles["header-link"]}
    >
      <header className={styles["scroll-container"]}>
        <div className={styles["scroll-content"]}>
          <Flag />
          <span className={styles["scroll-text"]}>TRANS LIBERATION NOW</span>
          <Flag />
          <span className={styles["scroll-text"]}>TRANS LIBERATION NOW</span>
          <Flag />
          <span className={styles["scroll-text"]}>TRANS LIBERATION NOW</span>
          <Flag />
          <span className={styles["scroll-text"]}>TRANS LIBERATION NOW</span>
          <Flag />
          <span className={styles["scroll-text"]}>TRANS LIBERATION NOW</span>
          <Flag />
          <span className={styles["scroll-text"]}>TRANS LIBERATION NOW</span>
          <Flag />
          <span className={styles["scroll-text"]}>TRANS LIBERATION NOW</span>
          <Flag />
        </div>
      </header>
    </a>
  );
};
