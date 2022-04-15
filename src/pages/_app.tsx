import "normalize.css";
import "styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styles from "./_app.module.css";
import { Footer } from "components/footer";
import { Header } from "components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>swag dot lgbt</title>
      </Head>
      <div className={styles["container"]}>
        <Header />
        <div className={styles["content"]}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
