"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      title: "Email Us",
      content: "info@pirhotech.com",
      link: "mailto:info@pirhotech.com",
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Visit Us",
      content: "123 Innovation Drive, Tech City, TC 10101",
      link: "https://maps.google.com",
    },
    {
      icon: <FiPhone size={24} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="contact" className="py-20 bg-[#0D0D0D]">
      <div ref={ref} className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Let's <span className="text-[var(--accent)]">Talk</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Get in touch with us to see how we can help
            bring your vision to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <FiCheckCircle
                    size={48}
                    className="text-[var(--accent)] mb-4"
                  />
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-gray-300">
                    Thank you for contacting us. We'll get back to you as soon
                    as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="SEO & Marketing">SEO & Marketing</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="accent-btn w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        <FiSend className="mr-2" /> Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-full flex flex-col">
              <div className="neumorphic p-8 rounded-xl mb-6">
                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                      custom={index}
                      variants={fadeInUp}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                    >
                      <div className="p-3 rounded-full glass text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{info.title}</h4>
                        <p className="text-gray-300 group-hover:text-[var(--accent)] transition-colors">
                          {info.content}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="glass p-8 rounded-xl mt-auto">
                <h3 className="text-xl font-bold mb-4">Working Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-300">Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
