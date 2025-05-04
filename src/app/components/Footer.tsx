"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowUp,
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: <FiGithub size={20} />, url: "https://github.com/pirhotech" },
    { icon: <FiTwitter size={20} />, url: "https://twitter.com/pirhotech" },
    {
      icon: <FiLinkedin size={20} />,
      url: "https://linkedin.com/company/pirhotech",
    },
    { icon: <FiInstagram size={20} />, url: "https://instagram.com/pirhotech" },
    { icon: <FiFacebook size={20} />, url: "https://facebook.com/pirhotech" },
  ];

  const footerLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-[#0A0A0A] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 mb-8 border-b border-gray-800">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold">
                <span className="text-white">
                  Pi<span className="text-[var(--accent)]">Rho</span>Tech
                </span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Digital innovation agency specializing in web development, mobile
              apps, and digital marketing. We help businesses transform their
              digital presence and grow online.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-full text-gray-300 hover:text-[var(--accent)] transition-colors"
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive the latest updates and
              news.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-l-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-[var(--accent)] text-black px-4 font-medium rounded-r-lg hover:bg-[var(--accent-light)] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-gray-500 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PiRhoTech. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-3 glass rounded-full text-white hover:text-[var(--accent)] transition-colors"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
