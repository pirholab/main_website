"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FiAward,
  FiCode,
  FiDatabase,
  FiMonitor,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import AboutBackground from "./AboutBackground";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  const techStack = [
    { name: "React", icon: <FiCode size={24} /> },
    { name: "Next.js", icon: <FiMonitor size={24} /> },
    { name: "Node.js", icon: <FiDatabase size={24} /> },
    { name: "MongoDB", icon: <FiDatabase size={24} /> },
    { name: "Laravel", icon: <FiShield size={24} /> },
    { name: "Marketing", icon: <FiTrendingUp size={24} /> },
  ];

  const milestones = [
    { year: "2018", event: "Founded PiRhoTech" },
    { year: "2019", event: "Launched first enterprise client" },
    { year: "2020", event: "Expanded to mobile app development" },
    { year: "2021", event: "Partnered with tech accelerators" },
    { year: "2022", event: "Reached 50+ successful projects" },
    { year: "2023", event: "Expanded team to 25 experts globally" },
  ];

  const values = [
    {
      title: "Innovation",
      icon: <FiZap size={30} />,
      description:
        "We constantly push the boundaries of what's possible in digital technology.",
    },
    {
      title: "Quality",
      icon: <FiAward size={30} />,
      description:
        "We're committed to excellence in every line of code and pixel of design.",
    },
    {
      title: "Collaboration",
      icon: <FiUsers size={30} />,
      description:
        "We work closely with clients to create solutions tailored to their needs.",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      {/* Animated Particles Background */}
      <AboutBackground />

      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div ref={ref} className="flex flex-col gap-16">
          {/* Section Title with elegant design */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            style={{ y, opacity }}
          >
            <motion.span
              className="text-[var(--accent)] uppercase tracking-wider text-sm font-semibold mb-2 block"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our story
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              About <span className="text-[var(--accent)]">PiRhoTech</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : { width: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              We transform visionary ideas into exceptional digital products
              that drive real business growth.
            </p>
          </motion.div>

          {/* Mission & Values with enhanced design */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[rgba(20,20,20,0.7)] backdrop-blur-md rounded-2xl p-8 border border-[rgba(78,204,163,0.15)] shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-[var(--accent)]">
                Our Mission
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At PiRhoTech, we're committed to transforming ideas into
                impactful digital solutions that drive business growth. We
                combine cutting-edge technology with creative design to build
                seamless experiences that connect brands with their audience.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our collaborative approach ensures that every project we
                undertake is tailored to meet specific business objectives while
                delivering exceptional user experiences. We're not just
                developers; we're strategic partners in your digital journey.
              </p>

              {/* Company values */}
              <div className="mt-8 grid grid-cols-1 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                  >
                    <div className="p-3 rounded-lg bg-[rgba(78,204,163,0.1)] text-[var(--accent)]">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        {value.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-[rgba(20,20,20,0.6)] backdrop-blur-md p-8 rounded-2xl border border-[rgba(78,204,163,0.15)] shadow-xl">
                <h3 className="text-2xl font-bold mb-8 text-white">
                  Our Journey
                </h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 relative"
                      custom={index}
                      variants={fadeIn}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                    >
                      <span className="text-[var(--accent)] font-mono font-bold text-lg min-w-[60px] relative z-10 bg-[rgba(20,20,20,0.8)] rounded-full px-3 py-1 flex items-center justify-center">
                        {milestone.year}
                      </span>
                      <div className="absolute left-[30px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] to-transparent h-full"></div>
                      <div className="bg-[rgba(30,30,30,0.5)] backdrop-blur-sm rounded-lg p-4 flex-1 border border-[rgba(78,204,163,0.1)]">
                        <span className="text-gray-200">{milestone.event}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack with improved visual design */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Our Technology Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="bg-[rgba(30,30,30,0.5)] backdrop-blur-md p-6 rounded-xl flex flex-col items-center justify-center text-center border border-transparent transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(78,204,163,0.3)]"
                  whileHover={{
                    y: -5,
                    scale: 1.03,
                    borderColor: "rgba(78,204,163,0.5)",
                  }}
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <div className="text-[var(--accent)] mb-3 transform transition-all duration-500 hover:scale-110">
                    {tech.icon}
                  </div>
                  <h4 className="font-medium">{tech.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
