import "@/styles/globals.scss";
import "@/styles/cal.css";
import localFont from "next/font/local";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import '../styles/project-custom.css';

const myFont = localFont({ src: "../fonts/old.otf", weight: "500" });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("floatingButton", {"calLink":"pirhotech/30min","config":{"layout":"month_view"},"buttonText":"Book a Call"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
