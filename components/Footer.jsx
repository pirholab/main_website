"use client";

import Link from "next/link";
import Image from "next/image";
import TransitionLink from "@/ui/TransitionLink";

export function Footer({ loading, setLoading, trRef }) {
  
  return (
    <footer className="bg-black text-white ">
      <div className="relative flex flex-row items-start justify-end">
        <svg
          id="Layer_1"
          className="w-[52px] rotate-[360deg] relative left-[1px] "
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 100 100"
        >
          <path
            fill="#18171b"
            d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z"
          ></path>
        </svg>
        <Link
          href={"mailto:hello@pirhotech.com"}
          target="_blank"
          className="text-[1.7rem] sml:text-3xl md:text-5xl rounded-bl-[30px] bg-[#18171b] p-[12px] lg:text-6xl font-light tracking-tight"
        >
          hello@pirhotech.com
        </Link>
      </div>
      <div className="max-w-7xl mx-auto pl-3 pb-16">
        {/* Top Section with Logo and Email */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-7 mb-20">
          <div className="text-2xl font-bold border border-white p-2 mb-6 md:mb-0">
            PiRhoTech
          </div>
        </div>

        {/* Middle Section with Links */}
        <div className="flex">
          {/* Social Links */}
          <div className="flex flex-row w-full sm:flex-col justify-between gap-[76px] sm:gap-0">
            <div className="space-y-3 flex flex-wrap flex-col sm:flex-row items-start sm:items-end gap-[11px]">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex items-center group"
                >
                  <span className="text-lg hover:text-gray-300 transition-colors">
                    {link.name}
                  </span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
            {/* // <Link
                            //     key={link.name}
                            //     href={link.href}
                            //     className="flex items-center group"
                            // > */}

            {/* Quick Links */}
            <div className="space-y-3 flex items-end gap-[11px] flex-col sm:flex-row">
              {quickLinks.map((link) => (
                <TransitionLink
                  key={link}
                  href={`${link.href}`}
                  trRef={trRef}
                  loading={loading}
                  setLoading={setLoading}
                  
                  className="flex items-center group"
                >
                  <span className="text-lg hover:text-gray-300 transition-colors">
                    {link.name}
                  </span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
        <h1 className="mt-[50px] sm:mt-0 text-[1.5rem] sm:text-[2.77rem] lg:text-[4.8rem]">
          <span>Crafting brands,</span>
          <span>designing success</span>
        </h1>
        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
          {/* Sectors */}
          {/* <div className="flex-1">
                        <p className="text-gray-400 mb-4">Our sectors:</p>
                        <div className="flex flex-wrap gap-3">
                            {sectors.map((sector) => (
                                <Link
                                    key={sector}
                                    href="#"
                                    className="px-4 py-2 rounded-full border border-gray-800 hover:border-gray-600 transition-colors text-sm"
                                >
                                    {sector}
                                </Link>
                            ))}
                        </div>
                    </div> */}

          {/* Awards */}
          {/* <div className="flex gap-6">
                        {awards.map((award, index) => (
                            <Image
                                key={index}
                                src={award}
                                alt="Award logo"
                                width={60}
                                height={40}
                                className="opacity-70 hover:opacity-100 transition-opacity"
                            />
                        ))}
                    </div> */}

          {/* Newsletter Button */}
          {/* <button
                        variant="outline"
                        className="text-white border-white hover:bg-white hover:text-black transition-colors rounded-full px-6"
                    >
                        Sign up to our newsletter
                    </button> */}
        </div>

        {/* Copyright */}
        <div className=" text-sm text-gray-400">
          © PIRHOTECH {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/pirhotech" },
  { name: "Facebook", href: "https://www.facebook.com/pirhotech" },
  { name: "Instagram", href: "https://www.instagram.com/pirhotech" },
  { name: "X", href: "https://x.com/pirhotech" },
];

const quickLinks = [
  { name: "Contact", href: "/contact" },
  { name: "FAQs", href: "/#faqs" },
  { name: "Privacy Policy", href: "/privacy" },
];

const sectors = [
  "Agencies",
  "SaaS and Tech",
  "B2B Transformation",
  "Healthcare",
  "Media & Entertainment",
  "Retail",
];

const awards = [
  "https://images.unsplash.com/photo-placeholder-1.jpg",
  "https://images.unsplash.com/photo-placeholder-2.jpg",
  "https://images.unsplash.com/photo-placeholder-3.jpg",
  "https://images.unsplash.com/photo-placeholder-4.jpg",
];
