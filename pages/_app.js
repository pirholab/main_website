import "@/styles/cal.css";
import "@/styles/globals.scss";
import { getCalApi } from "@calcom/embed-react";
import localFont from "next/font/local";
import { useEffect } from "react";
import CustomCursor from "../components/CustomCursor";
import "../styles/project-custom.css";

const myFont = localFont({ src: "../fonts/old.otf", weight: "500" });

export default function App({ Component, pageProps }) {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "30min" });
            cal("floatingButton", {
                calLink: "pirhotech/30min",
                config: { layout: "month_view" },
                buttonColor: "#5F33D6",
                buttonText: "Book a Call",
            });
            cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
        })();
    }, []);

    return (
        <>
            <style jsx global>{`
                * {
                    cursor: none !important;
                }

                /* Preserve system cursor for text inputs */
                input,
                textarea,
                [contenteditable="true"] {
                    cursor: text !important;
                }

                /* Preserve system cursor for text selection */
                ::selection {
                    cursor: text !important;
                }

                /* Hide cursor on touch devices */
                @media (hover: none) {
                    * {
                        cursor: auto !important;
                    }
                }
            `}</style>
            <CustomCursor />
            <main className={myFont.className}>
                <Component {...pageProps} />
            </main>
        </>
    );
}
