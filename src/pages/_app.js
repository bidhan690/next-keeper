import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This Is Kepper App Used To Keep Notes Like Google Notes!"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Next Keeper</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
