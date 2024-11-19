import "@/styles/globals.scss";
import localFont from "next/font/local";

const myFont = localFont({ src: "../fonts/old.otf", weight: "500" });

export default function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
