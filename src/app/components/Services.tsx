"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiMonitor,
  FiPenTool,
  FiShield,
  FiSmartphone,
  FiTrendingUp,
  FiVideo,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import ServicesBackground from "./ServicesBackground";

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
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
    [0.7, 1, 1, 0.7]
  );

  const services = [
    {
      title: "Web Development",
      icon: <FiMonitor size={36} />,
      description:
        "Modern, responsive websites built with cutting-edge technologies. We specialize in creating fast, secure, and SEO-friendly web applications that drive user engagement.",
      features: [
        "Custom Web Apps",
        "E-commerce Solutions",
        "CMS Development",
        "Progressive Web Apps",
        "API Integration",
      ],
    },
    {
      title: "Mobile App Development",
      icon: <FiSmartphone size={36} />,
      description:
        "Native and cross-platform mobile applications designed to deliver exceptional user experiences across all devices and platforms.",
      features: [
        "iOS & Android Apps",
        "Cross-platform Development",
        "App Store Optimization",
        "App Maintenance",
        "Performance Optimization",
      ],
    },
    {
      title: "SEO & Digital Marketing",
      icon: <FiTrendingUp size={36} />,
      description:
        "Data-driven strategies to boost your online visibility, attract quality traffic, and convert visitors into loyal customers.",
      features: [
        "Search Engine Optimization",
        "Content Marketing",
        "Social Media Campaigns",
        "Email Marketing",
        "Analytics & Reporting",
      ],
    },
    {
      title: "Graphic Design & Branding",
      icon: <FiPenTool size={36} />,
      description:
        "Creative design solutions that communicate your brand's story and create memorable visual identities that resonate with your audience.",
      features: [
        "Logo Design",
        "Brand Identity",
        "UI/UX Design",
        "Print Materials",
        "Marketing Collateral",
      ],
    },
    {
      title: "Video Editing",
      icon: <FiVideo size={36} />,
      description:
        "Professional video production and editing services to create compelling visual content for your brand across multiple platforms.",
      features: [
        "Corporate Videos",
        "Promotional Content",
        "Motion Graphics",
        "Social Media Videos",
        "Event Coverage",
      ],
    },
    {
      title: "Cybersecurity",
      icon: <FiShield size={36} />,
      description:
        "Comprehensive security solutions to protect your digital assets, ensure data privacy, and maintain compliance with regulations.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Data Encryption",
        "Compliance Management",
        "Security Training",
      ],
    },
  ];

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="services" className="py-24 relative">
      {/* Animated Background */}
      <ServicesBackground />

      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div ref={ref}>
          {/* Section Title with enhanced design */}
          <motion.div
            className="text-center mb-16"
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
              What we do
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              Our <span className="text-[var(--accent)]">Services</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : { width: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              We offer a comprehensive range of digital services to help your
              business thrive in the digital landscape.
            </p>
          </motion.div>

          {/* Tabs for small screens - Redesigned for better UX */}
          <div className="md:hidden mb-8">
            <div className="flex overflow-x-auto space-x-4 pb-2 p-4 rounded-xl bg-[rgba(20,20,20,0.7)] backdrop-blur-md scrollbar-thin">
              {services.map((service, index) => (
                <button
                  key={index}
                  className={`whitespace-nowrap px-4 py-2 rounded-full transition-all ${
                    activeTab === index
                      ? "bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] text-black font-medium"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {service.title}
                </button>
              ))}
            </div>

            <motion.div
              className="mt-6 p-6 rounded-xl bg-[rgba(20,20,20,0.7)] backdrop-blur-md border border-[rgba(78,204,163,0.15)] shadow-xl"
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-[var(--accent-dark)] to-[var(--accent)] p-3 rounded-lg text-white mr-4">
                  {services[activeTab].icon}
                </div>
                <h3 className="text-xl font-bold">
                  {services[activeTab].title}
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {services[activeTab].description}
              </p>
              <ul className="grid grid-cols-1 gap-3">
                {services[activeTab].features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center bg-[rgba(30,30,30,0.5)] backdrop-blur-sm rounded-lg p-3 border border-[rgba(78,204,163,0.1)]"
                  >
                    <span className="text-[var(--accent)] mr-3">
                      <FiCheckCircle />
                    </span>
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Grid for larger screens - With enhanced card design */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-[rgba(20,20,20,0.7)] backdrop-blur-md border border-transparent transition-all duration-300 group shadow-lg hover:shadow-[0_10px_25px_rgba(78,204,163,0.2)]"
                variants={cardVariants}
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{
                  y: -10,
                  borderColor: "rgba(78,204,163,0.4)",
                }}
              >
                <div className="bg-gradient-to-br from-[var(--accent-dark)] to-[var(--accent)] p-3 rounded-lg inline-block mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 gap-2">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-[var(--accent)] mt-1">
                        <FiCheckCircle />
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-6 pt-4 border-t border-gray-800 group-hover:border-[rgba(78,204,163,0.3)] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center text-[var(--accent)] hover:text-white transition-colors"
                  >
                    <span className="mr-2">Learn more</span>
                    <FiArrowRight />
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Improved CTA with gradient button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] text-black font-medium inline-flex items-center shadow-lg hover:shadow-[0_5px_20px_rgba(78,204,163,0.5)] transition-all duration-300 hover:scale-105"
            >
              <span>Get Started</span>
              <FiArrowRight className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
