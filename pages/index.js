import React, { useState, useRef } from "react";

import { Inter } from "next/font/google";
import Poster from "../components/Poster";
import Navbars from "../components/Navbars";
import Brand from "../components/Brand";
import Who from "../components/Who";

import List from "../components/List";
import Services from "../components/Services";
import Faqs from "@/components/Faqs";
import Motivation from "@/components/Motivation";
import { Footer } from "@/components/Footer";
import Project from "@/components/Project";
import Head from "next/head";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const trRef = useRef();
  return (
    <main className={`relative z-[999] `}>
      <Head>
        {/* Primary Meta Tags */}
        <title>PiRhotech</title>
        <meta
          name="description"
          content=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon.ico"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logo.png"
        />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech.com" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.ico"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="PirRhotech.com" />
        <meta
          property="og:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future"
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PirRhotech.com" />
        <meta
          name="twitter:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future"
        />
        <meta name="twitter:image" content="/logo.png" />

        {/* Keywords */}
        <meta
          name="keywords"
          content="Next.js, SEO, favicon, web development, branding"
        />

        {/* Author */}
        <meta name="author" content="Your Name or Company Name" />
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
