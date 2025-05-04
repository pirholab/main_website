import Faqs from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import GreenButton from "@/components/GreenButton";
import GreenCity from "@/components/GreenCity";
import Motivation from "@/components/Motivation";
import Project from "@/components/Project";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRef, useState } from "react";
import Brand from "../components/Brand";
import List from "../components/List";
import Navbars from "../components/Navbars";
import Services from "../components/Services";
import Who from "../components/Who";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const trRef = useRef();

  return (
    <main className={`relative z-[999]`}>
      <Head>
        {/* Primary Meta Tags */}
        <title>PiRhoTech</title>
        <meta
          name="description"
          content="Creative Agency Designing Tomorrow's Visions of the Future"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.ico" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech.com" />
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
      
      {/* Hero Section with Green City */}
      <div className="h-screen w-full relative">
        <GreenCity />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We Build <span className="text-[var(--green-accent)]">Digital Experiences</span> 
            <br />For The Future
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creative agency specializing in innovative web solutions, 
            3D experiences, and cutting-edge design
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GreenButton size="lg">Get Started</GreenButton>
            <GreenButton variant="secondary" size="lg">Our Projects</GreenButton>
          </motion.div>
        </div>
      </div>

      <div className="mt-[70px]">
        <br />
        <Who />
        <Brand />
        <br />
        <br />
        <Services />
        <List />
        <Project />
        <Faqs />
        <Motivation />
        <Footer loading={loading} setLoading={setLoading} trRef={trRef} />
        <div
          className={`fixed inset-0 bg-[var(--green-dark)] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
            loading ? " opacity-[1]" : "opacity-[0] pointer-events-none"
          }`}
          style={{ zIndex: 99999999999999 }}
          ref={trRef}
        />
      </div>
    </main>
  );
}
