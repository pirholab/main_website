"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbars from "../components/Navbars";
import Image from "next/image";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import Button from "@/components/Button";
import { Footer } from "@/components/Footer";
import { SingleSplitText } from "@/ui/SingleSplitText";
import Head from "next/head";

const members = [
  {
    name: "Farhan Sadik",
    img: "farhan.jpg",
    skill: "Founder & CEO",
  },
  {
    name: "Md Nuruzzaman Emon",
    img: "emon.jpg",
    skill: "Founder & CTO",
  },
  {
    name: "Fahad Ali",
    img: "fahad.jpeg",
    skill: "Tech Lead",
  },
  {
    name: "Hasanuzzaman Roky",
    img: "roky.jpg",
    skill: "Web Developer",
  },
  {
    name: "Mahmudul Hasan Refatt",
    img: "refat.jpg",
    skill: "Graphics Designer",
  },
  {
    name: "Abdullah Al Tacin",
    img: "tacin.jpg",
    skill: "Web Developer",
  },
  {
    name: "Arman Hossain",
    img: "arman.jpg",
    skill: "Android App Developer",
  },
  {
    name: "Muhammad Jahid Hasan Jitu",
    img: "jitu.jpg",
    skill: "Android App Developer",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const trRef = useRef();
  const memRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const fadeInTl = gsap.timeline();
      fadeInTl.to(".images", {
        opacity: 1,
        duration: 0.5,
        stagger: 0.3,
        ease: "power2.out",
      });
    }, mainRef); // Scope to mainRef

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className={`relative z-[999]`}>
      <Head>
        {/* Primary Meta Tags */}
        <title>PiRhotech - About</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.ico" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech.com" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}

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
      <div
        className="mt-[50px] flex justify-center main mb-[250px]"
        ref={mainRef}
      >
        <div className="w-[90%] sm:w-[83%]">
          <h1 className="text-center sm:text-start text-[4rem] md:text-9xl mt-[50px] sm:mt-[100px] flex flex-col md:text-[5rem] lg:text-[6rem]">
            <SingleSplitText>Meet Our</SingleSplitText>
            <SingleSplitText>talented Team</SingleSplitText>
          </h1>
          <div
            className="flex transition-all justify-center items-center flex-wrap gap-[30px] imageContent"
            ref={memRef}
          >
            {members?.map((e, i) => (
              <div
                className="rounded-[30px] overflow-hidden relative lgl:odd:mt-[100px] images opacity-0"
                key={i}
              >
                <Image
                  src={`/${e.img}`}
                  width={300}
                  height={500}
                  alt="Image1"
                  priority={true}
                  className="w-[250px] object-cover md:w-[300px] h-[400px] md:h-[500px]"
                />
                <div className="absolute w-full bottom-0 flex flex-col items-start">
                  <svg
                    id="Layer_1"
                    className="w-[30px] rotate-[180deg] relative bottom-0"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    viewBox="0 0 100 100"
                  >
                    <path
                      fill="#18171b"
                      d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z"
                    />
                  </svg>
                  <div className="bottom-0 flex items-end">
                    <div className="p-[15px] pl-[30px] bg-[#18181b] rounded-tr-[30px]">
                      <h1 className="text-xl">{e.name}</h1>
                      <p className="font-[100] opacity-[0.5]">{e.skill}</p>
                    </div>
                    <svg
                      id="Layer_1"
                      className="w-[30px] rotate-[180deg] relative bottom-0"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0"
                      y="0"
                      viewBox="0 0 100 100"
                    >
                      <path
                        fill="#18171b"
                        d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="flex flex-col text-5xl mt-[150px]">
            <span>Your Vision, Our Passion</span>
            <span>Bringing Your Dreams to Life</span>{" "}
          </h1>
          <br />
          <p className="text-xl font-[100] opacity-[0.7]">
            At Phirotech, we truly care about your work and the impact it has.
            Our team is committed to delivering high-quality results with
            creativity and precision. We work closely with you to understand
            your goals and ensure every detail aligns with your vision. With our
            expertise and dedication, we help bring your ideas to life in the
            best possible way. Together, we can achieve exceptional outcomes and
            make your project stand out.
          </p>

          <h1 className="mt-[50px] text-5xl">
            {"Want to work with a passionate team? "}
          </h1>
          <div className="flex items-center">
            <h1 className="text-[2rem]">{"Let's talk"}</h1>
            <Button className="block w-fit bg-black relative left-[11px] top-[0px] p-[10px] rounded-[10px] border-none">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <Footer loading={loading} setLoading={setLoading} trRef={trRef} />
      <div
        className={`fixed inset-0 bg-[#18181b] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
          loading ? " opacity-[1]" : "opacity-[0] pointer-events-none"
        }`}
        style={{ zIndex: 99999999999999, backgroundColor: "#18181b" }}
        ref={trRef}
      />
    </main>
  );
}
