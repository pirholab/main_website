import { useRef, useState } from "react";

import Brand from "../components/Brand";
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
    <main className={`relative z-[999] `}>
      <Head>
        {/* Primary Meta Tags */}
        <title>PiRhoTech | Creative Technology Agency in Bangladesh</title>
        <meta
          name="description"
          content="PiRhoTech is a leading creative technology agency in Bangladesh specializing in web development, mobile apps, branding, and digital solutions. Home of Cover Page Generator - the #1 app for creating professional assignment cover pages with 9K+ downloads and 5.0 star rating."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.ico" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pirhotech.com" />
        <meta property="og:title" content="PiRhoTech | Creative Technology Agency" />
        <meta
          property="og:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future. Creators of Cover Page Generator - the top-rated app for university assignments in Bangladesh with over 9,000 downloads."
        />
        <meta property="og:image" content="https://pirhotech.com/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://pirhotech.com" />
        <meta name="twitter:title" content="PiRhoTech | Creative Technology Agency" />
        <meta
          name="twitter:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future. Creators of Cover Page Generator - the top-rated app for university assignments in Bangladesh with over 9,000 downloads."
        />
        <meta name="twitter:image" content="https://pirhotech.com/logo.png" />
        
        {/* Keywords */}
        <meta
          name="keywords"
          content="PiRhoTech, creative agency, Bangladesh, web development, mobile apps, Cover Page Generator, technology solutions, branding, UI/UX design, software development"
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
              "name": "PiRhoTech",
              "url": "https://pirhotech.com",
              "logo": "https://pirhotech.com/logo.png",
              "description": "Creative Technology Agency Designing Tomorrow's Visions of the Future",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Bangladesh"
              },
              "sameAs": [
                "https://www.facebook.com/pirhotech",
                "https://twitter.com/pirhotech",
                "https://www.linkedin.com/company/pirhotech"
              ],
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "SoftwareApplication",
                  "name": "Cover Page Generator",
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Android",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "BDT"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5.0",
                    "ratingCount": "9000"
                  },
                  "description": "Create professional cover pages for assignments and lab reports for universities in Bangladesh."
                }
              }
            })
          }}
        />
      </Head>
      <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
      <div className="mt-[70px]">
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
        <Footer loading={loading} setLoading={setLoading} trRef={trRef} />
        <div
          className={`fixed inset-0 bg-[#18181b] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
            loading ? " opacity-[1]" : "opacity-[0] pointer-events-none"
          }`}
          style={{ zIndex: 99999999999999, backgroundColor: "#18181b" }}
          ref={trRef}
        />
      </div>
    </main>
  );
}
