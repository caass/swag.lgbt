import type { FunctionComponent } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import smiles from "@/public/smiles.gif";

export const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <Image
        src={smiles}
        alt=""
        layout="fixed"
        width="608px"
        height="25px"
        priority
      />
      <span>Copyright © Cassandra Fridkin {new Date().getFullYear()}</span>
    </footer>
  );
};
