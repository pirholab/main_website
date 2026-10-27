import { useRef, useState } from "react";

import Brand from "../components/Brand";
import CustomCursor from "../components/CustomCursor";
import Navbars from "../components/Navbars";
import Poster from "../components/Poster";
import Who from "../components/Who";

import Faqs from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import Motivation from "@/components/Motivation";
import Project from "@/components/Project";
import Head from "next/head";
import List from "../components/List";
import Services from "../components/Services";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const trRef = useRef();
    return (
        <main className={`relative z-999 cursor-none`}>
            {/* <CustomCursor /> */}
            <Head>
                {/* Primary Meta Tags */}
                <title>PiRhoTech | Software, AI &amp; Automation Company in Bangladesh</title>
                <meta
                    name="description"
                    content="PiRhoTech builds custom software, web apps, Flutter mobile apps, AI chatbots and business automation for startups and growing businesses. 50+ projects delivered from Dhaka, Bangladesh."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="UTF-8" />

                {/* Favicon */}
                <meta name="apple-mobile-web-app-title" content="PiRhoTech" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pirhotech.com" />
                <meta
                    property="og:title"
                    content="PiRhoTech | Software, AI &amp; Automation Company in Bangladesh"
                />
                <meta
                    property="og:description"
                    content="PiRhoTech builds custom software, web apps, Flutter mobile apps, AI chatbots and business automation for startups and growing businesses. 50+ projects delivered from Dhaka, Bangladesh."
                />
                <meta
                    property="og:image"
                    content="https://pirhotech.com/og-image.png"
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://pirhotech.com" />
                <meta
                    name="twitter:title"
                    content="PiRhoTech | Software, AI &amp; Automation Company in Bangladesh"
                />
                <meta
                    name="twitter:description"
                    content="PiRhoTech builds custom software, web apps, Flutter mobile apps, AI chatbots and business automation for startups and growing businesses. 50+ projects delivered from Dhaka, Bangladesh."
                />
                <meta
                    name="twitter:image"
                    content="https://pirhotech.com/og-image.png"
                />

                {/* Keywords */}
                <meta
                    name="keywords"
                    content="software development company in Bangladesh, web development company Bangladesh, mobile app development company, Flutter app development, AI chatbot development, business automation services, custom software development, Shopify app development, offshore software development, PiRhoTech, Solidy.io"
                />

                {/* Canonical URL */}
                <link rel="canonical" href="https://pirhotech.com" />

                {/* Author */}
                <meta name="author" content="PiRhoTech" />

                {/* Structured Data / JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "PiRhoTech",
                            url: "https://pirhotech.com",
                            logo: "https://pirhotech.com/android-chrome-512x512.png",
                            description:
                                "Software development company in Dhaka, Bangladesh building custom web apps, Flutter mobile apps, AI chatbots and business automation.",
                            founder: {
                                "@type": "Person",
                                name: "Farhan Sadik",
                            },
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Dhaka",
                                addressCountry: "BD",
                            },
                            sameAs: [
                                "https://www.facebook.com/pirhotech",
                                "https://x.com/pirhotech",
                                "https://www.instagram.com/pirhotech",
                                "https://www.linkedin.com/company/pirhotech",
                            ],
                            subOrganization: {
                                "@type": "Organization",
                                name: "Solidy.io",
                                url: "https://solidy.io",
                                description:
                                    "PiRhoTech's software development brand for international clients.",
                            },
                            makesOffer: {
                                "@type": "Offer",
                                itemOffered: {
                                    "@type": "SoftwareApplication",
                                    name: "Cover Page Generator",
                                    applicationCategory:
                                        "EducationalApplication",
                                    operatingSystem: "Android",
                                    offers: {
                                        "@type": "Offer",
                                        price: "0",
                                        priceCurrency: "BDT",
                                    },
                                    description:
                                        "Create professional cover pages for assignments and lab reports for universities in Bangladesh.",
                                },
                            },
                        }),
                    }}
                />
            </Head>
            <style jsx global>{`
                * {
                    cursor: none !important;
                }

                /* Preserve system cursor for text selection */
                *:active,
                *:focus {
                    cursor: auto !important;
                }
            `}</style>
            <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
            <div className="mt-[100px]">
                <Poster />
                <br />
                <Who />

                <Brand />
                <br />
                <br />
                {/* <What /> */}
                <Services />
                <List />

                <Project />
                <Faqs />

                <Motivation />
                <Footer
                    loading={loading}
                    setLoading={setLoading}
                    trRef={trRef}
                />
                <div
                    className={`fixed inset-0 bg-[#18181b] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
                        loading
                            ? " opacity-[1]"
                            : "opacity-[0] pointer-events-none"
                    }`}
                    style={{
                        zIndex: 99999999999999,
                        backgroundColor: "#18181b",
                    }}
                    ref={trRef}
                />
            </div>
        </main>
    );
}
