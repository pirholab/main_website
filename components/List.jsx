"use client";
import { motion, useMotionValue, useMotionTemplate, useInView, animate, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

// Array of image URLs
const imageArray = [
  "https://via.placeholder.com/150/FF0000/FFFFFF?text=Image1",
  "https://via.placeholder.com/150/00FF00/FFFFFF?text=Image2",
  "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image3",
  "https://via.placeholder.com/150/FFFF00/FFFFFF?text=Image4",
  "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Image5",
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const HeroHighlight = ({ children, className, containerClassName }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={classNames(
        "relative flex items-center justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />
      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={classNames("relative z-20", className)}>{children}</div>
    </motion.div>
  );
};

export const Highlight = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.span
      ref={ref}
      style={{
        backgroundSize: isInView ? "100% 100%" : "0% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
        display: "inline-block",
        transition: "background-size 0.5s ease", // Add a transition for smoothness
      }}
      className={classNames(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: isInView ? "100% 100%" : "0% 100%" }}
    >
      {children}
    </motion.span>
  );
};


export default function List() {
  const parentRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("");
  const hiddenImageRef = useRef(null);
  const [rotate, setRotate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobileOrTablet = () => {
      const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
      setIsMobile(isMobileOrTablet);
    };

    checkIfMobileOrTablet();
    window.addEventListener("resize", checkIfMobileOrTablet);
    return () => window.removeEventListener("resize", checkIfMobileOrTablet);
  }, []);



  useEffect(() => {
    function hoverCommand(event) {
      const itemId = event.target.dataset.item;
      const imageSrc = imageArray[itemId - 1];
      setCurrentImage(imageSrc);

      if (!isMobile && hiddenImageRef.current) {
        animate(hiddenImageRef.current, { scale: 1, opacity: 1 }, { duration: 0.5 });
        hiddenImageRef.current.style.visibility = 'visible';
      }
    }

    function hideImage() {
      if (!isMobile && hiddenImageRef.current) {
        animate(hiddenImageRef.current, { scale: 0, opacity: 0 }, { duration: 0.5 });
        hiddenImageRef.current.style.visibility = 'hidden';
      }
    }

    function handleMouseMove(event) {
      if (!isMobile && hiddenImageRef.current) {
        const imageElement = hiddenImageRef.current;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const { left, width } = imageElement.getBoundingClientRect();
        const centerX = left + width / 2;
        const rotationX = ((mouseX - centerX) / width) * 30;
        setRotate(rotationX);

        animate(imageElement, {
          x: mouseX - imageElement.clientWidth / 2,
          y: mouseY - imageElement.clientHeight / 2,
        }, { duration: 0.1, ease: [0.16, 1, 0.3, 1] });
      }
    }
    if (parentRef.current && !isMobile) {
      const items = parentRef.current.querySelectorAll("li");
      items.forEach((item) => {
        item.addEventListener("mouseenter", hoverCommand);
        item.addEventListener("mouseleave", hideImage);
      });
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        items.forEach((item) => {
          item.removeEventListener("mouseenter", hoverCommand);
          item.removeEventListener("mouseleave", hideImage);
        });
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMobile]);

  return (
    <div className="w-[100%] mt-[10px] flex justify-center flex-col">
      <div>
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto relative top-[13dvh]"
          >
            We craft custom websites, focusing on{" "}
            <Highlight className="text-white">three key</Highlight> elements.
          </motion.h1>
        </HeroHighlight>
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="relative flex justify-center md:justify-center items-start w-full h-auto">
          <ul
            className="flex w-[90%] flex-col justify-center items-start p-10"
            ref={parentRef}
          >
            <li
              className="w-full pt-5 pb-7 flex text-5xl sm:text-7xl md:text-9xl cursor-pointer"
              data-item="1"
            >
              <sup className="text-lg">01.</sup>Item 1
            </li>
            <hr className="text-5xl w-[100%] border-zinc-700" />
            <li
              className="w-full pt-5 pb-7 flex text-5xl sm:text-7xl md:text-9xl cursor-pointer"
              data-item="2"
            >
              <sup className="text-lg">02.</sup> Item 2
            </li>
            <hr className="text-5xl w-[100%] border-zinc-700" />
            <li
              className="w-full pt-5 pb-7 text-5xl sm:text-7xl md:text-9xl flex cursor-pointer"
              data-item="3"
            >
              <sup className="text-lg">03.</sup> Item 3
            </li>
            <hr className="text-5xl w-[100%] border-zinc-700" />
          </ul>
          <img
            ref={hiddenImageRef}
            src={currentImage}
            alt="Hidden"
            className="hidden-image"
          />
        </div>
      </div>
    </div>
  );
}