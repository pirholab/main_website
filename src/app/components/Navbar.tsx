"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiChevronRight,
  FiCode,
  FiGlobe,
  FiLayers,
  FiMenu,
  FiPhone,
  FiStar,
  FiUserPlus,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [animateHamburger, setAnimateHamburger] = useState(false);

  // Handle scrolling and active section highlighting
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrameId: number | null = null;

    const handleScroll = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = requestAnimationFrame(() => {
        // Set scrolled state for navbar styling
        setScrolled(window.scrollY > 50);

        // Only update scrollY state when significant change to avoid re-renders
        if (Math.abs(scrollY - window.scrollY) > 50) {
          setScrollY(window.scrollY);
        }

        // Determine active section based on scroll position
        const sections = document.querySelectorAll<HTMLElement>("section[id]");
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");
          if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight &&
            sectionId
          ) {
            setActiveSection(sectionId);
          }
        });

        lastScrollY = window.scrollY;
        animationFrameId = null;
      });
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle hamburger animation effect
  const toggleMenu = () => {
    setAnimateHamburger(true);
    setTimeout(() => setAnimateHamburger(false), 300);
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", href: "#hero", icon: <FiGlobe size={18} /> },
    { name: "About", href: "#about", icon: <FiUserPlus size={18} /> },
    { name: "Services", href: "#services", icon: <FiLayers size={18} /> },
    { name: "Projects", href: "#projects", icon: <FiCode size={18} /> },
    {
      name: "Testimonials",
      href: "#testimonials",
      icon: <FiStar size={18} />,
    },
    { name: "Contact", href: "#contact", icon: <FiPhone size={18} /> },
  ];

  const logoPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const splitNavVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const hamburgerVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    hidden: {
      clipPath: "circle(0% at calc(100% - 40px) 40px)",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    visible: {
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // Enhanced animation variants
  const glowVariants = {
    initial: { boxShadow: "0 0 0 rgba(99, 102, 241, 0)" },
    hover: {
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)",
      transition: { duration: 0.3 },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <nav ref={navRef} className={`fixed w-full z-30 transform-gpu`}>
      {/* Split Navbar Design - Top Section */}
      <div
        className={`w-full ${
          scrolled
            ? "bg-[rgba(15,23,42,0.85)] backdrop-blur-xl shadow-lg border-b border-[var(--accent-light)]/10 h-[60px] sm:h-[70px]"
            : "bg-transparent h-[70px] sm:h-[80px]"
        }`}
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transition: "all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)",
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="flex justify-between items-center w-full h-full">
            {/* Logo with SVG Animation - simplified for mobile */}
            <Link href="/" className="flex items-center group relative z-10">
              <motion.div
                className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-2 overflow-hidden"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[rgba(15,23,42,0.7)] backdrop-blur-sm border border-[rgba(99,102,241,0.3)] flex items-center justify-center overflow-hidden group-hover:border-[var(--accent)]"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="overflow-visible"
                  >
                    <motion.path
                      d="M5 6L12 3L19 6M5 6V18L12 21M5 6L12 9M19 6V18L12 21M19 6L12 9M12 9V21"
                      stroke="url(#logoGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={logoPathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <defs>
                      <linearGradient
                        id="logoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="var(--accent)" />
                        <stop offset="100%" stopColor="var(--tertiary)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-dark)]/20 to-[var(--tertiary)]/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold leading-none">
                  <span className="text-white">
                    Pi
                    <motion.span
                      className="text-gradient font-bold"
                      animate={{
                        color: [
                          "var(--accent)",
                          "var(--tertiary)",
                          "var(--accent)",
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      Rho
                    </motion.span>
                    Tech
                  </span>
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 tracking-wider font-light">
                  DIGITAL INNOVATION
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <motion.div
              className="hidden lg:flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center space-x-1 bg-[rgba(15,23,42,0.4)] backdrop-blur-md px-2 py-1 rounded-full border border-white/5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative"
                    onHoverStart={() => setHoveredLink(index)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded-full flex items-center transition-all duration-300 relative overflow-hidden ${
                        activeSection === link.href.substring(1)
                          ? "text-white font-medium"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {/* Active/hover background */}
                      {(activeSection === link.href.substring(1) ||
                        hoveredLink === index) && (
                        <motion.div
                          className="absolute inset-0 rounded-full z-0"
                          layoutId="activeNavLinkBg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                          style={{
                            background:
                              activeSection === link.href.substring(1)
                                ? "linear-gradient(to right, var(--accent), var(--tertiary))"
                                : "rgba(255, 255, 255, 0.05)",
                          }}
                        />
                      )}

                      <motion.span
                        className="mr-1.5 relative z-10"
                        variants={floatVariants}
                        animate="animate"
                        initial="initial"
                      >
                        {link.icon}
                      </motion.span>

                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Menu Button with Animation */}
            <motion.button
              className="lg:hidden relative z-50 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md bg-[rgba(15,23,42,0.5)] border border-white/10 text-white"
              onClick={toggleMenu}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              animate={animateHamburger ? "animate" : "initial"}
              variants={hamburgerVariants}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.div
                className="relative"
                whileHover="hover"
                initial="initial"
              >
                <motion.a
                  href="#contact"
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium flex items-center space-x-1 transition-all hover:bg-white/10"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  variants={glowVariants}
                >
                  <span>Get a quote</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FiChevronRight size={16} />
                  </motion.div>
                </motion.a>
              </motion.div>

              <motion.a
                href="#contact"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] text-white font-medium flex items-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Project</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FiArrowRight className="ml-2" />
                </motion.div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden fixed inset-0 z-40 bg-gradient-to-b from-[rgba(15,23,42,0.98)] to-[rgba(30,41,59,0.98)] backdrop-blur-xl flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-6 py-20 overflow-auto">
              <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-bg border border-[var(--accent)]/20 flex items-center justify-center overflow-hidden shadow-lg"
                  variants={pulseVariants}
                  animate="animate"
                  initial="initial"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 6L12 3L19 6M5 6V18L12 21M5 6L12 9M19 6V18L12 21M19 6L12 9M12 9V21"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-gradient">PiRhoTech</span>
                </motion.h2>
                <motion.p
                  className="text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Digital Innovation Agency
                </motion.p>
              </motion.div>

              <div className="space-y-3 max-w-md mx-auto w-full">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <Link
                      href={link.href}
                      className={`group w-full flex items-center p-4 transition-all ${
                        activeSection === link.href.substring(1)
                          ? "bg-gradient-to-r from-[var(--accent)] via-[var(--accent-light)] to-[var(--tertiary)] text-white font-medium"
                          : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl mr-4 ${
                          activeSection === link.href.substring(1)
                            ? "bg-white/20"
                            : "bg-[rgba(15,23,42,0.5)] text-[var(--accent)]"
                        }`}
                        whileHover={{ rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          rotate: { duration: 0.2 },
                          scale: { duration: 0.1 },
                        }}
                      >
                        {link.icon}
                      </motion.div>
                      <div className="flex-1 flex flex-col">
                        <span className="font-medium text-base">
                          {link.name}
                        </span>
                        <span className="text-xs text-white/50">
                          {index === 0 && "Welcome Home"}
                          {index === 1 && "Our Story"}
                          {index === 2 && "What We Do"}
                          {index === 3 && "Our Work"}
                          {index === 4 && "Client Feedback"}
                          {index === 5 && "Get In Touch"}
                        </span>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <FiChevronRight className="text-white" size={20} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12 max-w-md mx-auto w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.a
                    href="#contact"
                    className="py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium flex items-center justify-center space-x-2"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Get a Quote</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FiChevronRight />
                    </motion.span>
                  </motion.a>

                  <motion.a
                    href="#contact"
                    className="py-4 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] text-white font-medium flex items-center justify-center space-x-2"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Start Project</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FiArrowRight />
                    </motion.span>
                  </motion.a>
                </div>

                <motion.div
                  className="mt-10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} PiRhoTech. All rights reserved.
                  </p>
                  <div className="flex justify-center mt-4 space-x-3">
                    <motion.a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
                      whileHover={{ y: -2 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
                      whileHover={{ y: -2 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10"
                      whileHover={{ y: -2 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
