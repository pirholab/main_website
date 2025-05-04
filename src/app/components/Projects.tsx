"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import ProjectsBackground from "./ProjectsBackground";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
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

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      client: "StyleHaven",
      category: "web",
      image: "/projects/ecommerce.jpg",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      description:
        "A fully responsive e-commerce platform with integrated payment processing and inventory management.",
    },
    {
      id: 2,
      title: "Fitness Tracker App",
      client: "FitLife",
      category: "app",
      image: "/projects/fitness-app.jpg",
      tech: ["React Native", "Firebase", "Redux"],
      description:
        "A cross-platform mobile app for tracking workouts, nutrition, and fitness goals.",
    },
    {
      id: 3,
      title: "Corporate Rebrand",
      client: "TechNova",
      category: "branding",
      image: "/projects/rebrand.jpg",
      tech: ["Adobe Creative Suite", "Brand Strategy", "Design Systems"],
      description:
        "Complete visual identity redesign including logo, style guide, and marketing materials.",
    },
    {
      id: 4,
      title: "Real Estate Platform",
      client: "HomeQuest",
      category: "web",
      image: "/projects/real-estate.jpg",
      tech: ["Next.js", "Tailwind CSS", "Google Maps API"],
      description:
        "Property listing and search platform with advanced filtering and virtual tours.",
    },
    {
      id: 5,
      title: "SEO & Content Strategy",
      client: "EcoSolutions",
      category: "marketing",
      image: "/projects/seo.jpg",
      tech: ["Keyword Research", "Content Marketing", "Analytics"],
      description:
        "Comprehensive SEO strategy resulting in 150% organic traffic growth over 6 months.",
    },
    {
      id: 6,
      title: "Food Delivery App",
      client: "QuickBite",
      category: "app",
      image: "/projects/food-app.jpg",
      tech: ["Flutter", "Firebase", "Google Maps API"],
      description:
        "On-demand food delivery application with real-time order tracking and payment integration.",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const filterCategories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "app", label: "App" },
    { id: "branding", label: "Branding" },
    { id: "marketing", label: "Marketing" },
  ];

  const projectVariants = {
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
    <section id="projects" className="py-24 relative">
      {/* Animated Line Background */}
      <ProjectsBackground />

      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div ref={ref}>
          {/* Enhanced Section Title */}
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
              Our work
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              Projects We{" "}
              <span className="text-[var(--accent)]">Delivered</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : { width: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Explore our portfolio of successful projects across various
              industries.
            </p>
          </motion.div>

          {/* Improved Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filterCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === category.id
                    ? "bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] text-black font-medium"
                    : "bg-[rgba(20,20,20,0.7)] backdrop-blur-md text-white hover:bg-[rgba(78,204,163,0.1)] border border-transparent hover:border-[rgba(78,204,163,0.3)]"
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Project Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group overflow-hidden rounded-xl relative bg-[rgba(20,20,20,0.7)] backdrop-blur-md border border-transparent hover:border-[rgba(78,204,163,0.3)] transition-all duration-300 shadow-lg"
                  variants={projectVariants}
                  custom={index}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px rgba(78, 204, 163, 0.15)",
                  }}
                >
                  {/* Project image with stylish placeholder */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a60] to-[var(--accent-dark)] opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-5xl text-white font-bold opacity-10 group-hover:opacity-5 transition-opacity">
                      {project.category.toUpperCase()}
                    </div>
                    <motion.div
                      className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[rgba(0,0,0,0.3)] backdrop-blur-md text-white border border-white/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.div>
                  </div>

                  {/* Project Info with Improved Design */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Client:{" "}
                          <span className="text-[var(--accent)]">
                            {project.client}
                          </span>
                        </p>
                      </div>
                      <div className="bg-[rgba(78,204,163,0.1)] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiExternalLink className="text-[var(--accent)]" />
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full bg-[rgba(78,204,163,0.1)] text-[var(--accent)] border border-[rgba(78,204,163,0.2)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-gray-800 flex justify-end">
                      <motion.button
                        className="text-sm flex items-center text-[var(--accent)] hover:text-white transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        <span className="mr-1">View Details</span>
                        <FiArrowRight size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] font-medium inline-flex items-center hover:bg-[var(--accent)] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(78,204,163,0.3)]"
            >
              <span>Start Your Project</span>
              <FiArrowRight className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
