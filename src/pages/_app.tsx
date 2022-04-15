import "normalize.css";
import "styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Footer } from "components/footer";
import { Header } from "components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>swag</title>
      </Head>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <div style={{ flex: 1 }}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
