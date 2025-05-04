"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Use dynamic import with no SSR for Three.js component
const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
});

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [subtitleRef, subtitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 300,
  });

  const [buttonRef, buttonInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 600,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* 3D Background */}
      <HeroBackground scrollY={scrollY} />

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background z-0"></div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: titleInView ? 1 : 0, y: titleInView ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-white">Digital Innovation</span>
          <br />
          <span className="text-gradient">Starts Here</span>
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: subtitleInView ? 1 : 0,
            y: subtitleInView ? 0 : 20,
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Web. Apps. Growth. Designed to scale your business.
        </motion.p>

        <motion.div
          ref={buttonRef}
          className="flex flex-col sm:flex-row gap-4 mt-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: buttonInView ? 1 : 0, y: buttonInView ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <a href="#contact" className="accent-btn">
            Let's Build Together
          </a>
          <a href="#projects" className="outline-btn">
            See Our Work
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
