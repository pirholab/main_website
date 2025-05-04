"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMessageCircle,
  FiStar,
  FiThumbsUp,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import TestimonialsBackground from "./TestimonialsBackground";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, StyleHaven",
      image: "/testimonials/testimonial1.jpg",
      content:
        "PiRhoTech transformed our online presence with a stunning e-commerce platform. Sales increased by 75% within three months of launch. Their team was responsive, knowledgeable, and delivered beyond our expectations.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Founder, FitLife",
      image: "/testimonials/testimonial2.jpg",
      content:
        "Working with PiRhoTech on our fitness app was a game-changer. They understood our vision perfectly and turned it into an intuitive, feature-rich application that our users love. The attention to detail was exceptional.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      position: "Marketing Director, TechNova",
      image: "/testimonials/testimonial3.jpg",
      content:
        "The rebrand that PiRhoTech created for us completely revitalized our company image. Their strategic approach to design and branding helped us connect with our target audience in ways we never thought possible.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Wilson",
      position: "CTO, HomeQuest",
      image: "/testimonials/testimonial4.jpg",
      content:
        "The real estate platform developed by PiRhoTech has been instrumental in our growth. Their technical expertise and innovative approach to problem-solving resulted in a seamless, user-friendly experience.",
      rating: 4,
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [inView, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="py-24 relative">
      {/* Animated Quotes Background */}
      <TestimonialsBackground />

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
              What people say
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              Client <span className="text-[var(--accent)]">Testimonials</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : { width: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Here's what our clients say about working with PiRhoTech.
            </p>
          </motion.div>

          {/* Testimonials Carousel with Enhanced Design */}
          <div className="relative max-w-4xl mx-auto px-4">
            {/* Navigation Arrows with Improved Design */}
            <motion.div
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-[rgba(20,20,20,0.7)] backdrop-blur-md text-white hover:text-[var(--accent)] transition-all border border-transparent hover:border-[rgba(78,204,163,0.3)] shadow-lg"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft size={24} />
              </button>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-[rgba(20,20,20,0.7)] backdrop-blur-md text-white hover:text-[var(--accent)] transition-all border border-transparent hover:border-[rgba(78,204,163,0.3)] shadow-lg"
                aria-label="Next testimonial"
              >
                <FiChevronRight size={24} />
              </button>
            </motion.div>

            {/* Testimonial Cards with Modern Design */}
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: inView ? 1 : 0,
                  x: `-${currentSlide * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full">
                    <motion.div
                      className="bg-[rgba(20,20,20,0.7)] backdrop-blur-md p-8 md:p-10 rounded-2xl border border-[rgba(78,204,163,0.15)] shadow-xl"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{
                        boxShadow: "0 20px 40px rgba(78, 204, 163, 0.15)",
                      }}
                    >
                      {/* Improved layout for client information */}
                      <div className="flex items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-dark)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-xl font-bold text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-[var(--accent)]">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>

                      {/* Decorative quote icon */}
                      <div className="absolute -top-6 -left-2 text-[var(--accent)] opacity-20 transform scale-150">
                        <FiMessageCircle size={40} />
                      </div>

                      {/* Content with better typography */}
                      <blockquote className="text-gray-200 text-lg leading-relaxed mb-6 relative z-10">
                        <span className="text-[var(--accent)] text-4xl absolute -top-4 -left-2 opacity-20">
                          "
                        </span>
                        {testimonial.content}
                        <span className="text-[var(--accent)] text-4xl absolute -bottom-10 -right-2 opacity-20">
                          "
                        </span>
                      </blockquote>

                      {/* Improved Rating Display */}
                      <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-800">
                        <div className="flex text-[var(--accent)]">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={18}
                              className={
                                i < testimonial.rating
                                  ? "fill-current"
                                  : "opacity-40"
                              }
                            />
                          ))}
                        </div>

                        <div className="flex items-center text-gray-400 text-sm">
                          <FiThumbsUp className="mr-1" />
                          <span>Verified Client</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Indicators */}
            <div className="flex justify-center mt-10 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 h-3 bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] rounded-full"
                      : "w-3 h-3 bg-gray-600 hover:bg-gray-400 rounded-full"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xl text-gray-300 mb-6">
              Ready to collaborate with us?
            </p>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--tertiary)] text-black font-medium inline-flex items-center shadow-lg hover:shadow-[0_5px_20px_rgba(78,204,163,0.5)] transition-all duration-300 hover:scale-105"
            >
              <span>Get in Touch</span>
              <FiChevronRight className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
