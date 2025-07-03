"use client";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useInView,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
})
// Array of image URLs
const imageArray = ["/deliver/design.png", "/deliver/impact.png", "/deliver/security.png"];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
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
      const listItem = event.target.closest("li"); // Ensure the target is a <li> element
      if (listItem && listItem.dataset.item) {
        const itemId = parseInt(listItem.dataset.item, 10); // Parse data-item as a number
        console.log(itemId);
        const imageSrc = imageArray[itemId - 1]; // Get the corresponding image
        document.querySelector("#imageContainer").src = imageSrc;
        console.log(imageSrc);
        // setCurrentImage(imageSrc);

        if (!isMobile && hiddenImageRef.current) {
          animate(
            hiddenImageRef.current,
            { scale: 1, opacity: 1 },
            { duration: 0.5 }
          );
          hiddenImageRef.current.style.visibility = "visible";
        }
      }
    }

    function hideImage() {
      if (!isMobile && hiddenImageRef.current) {
        animate(
          hiddenImageRef.current,
          { scale: 0, opacity: 0 },
          { duration: 0.5 }
        );
        hiddenImageRef.current.style.visibility = "hidden";
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

        animate(
          imageElement,
          {
            x: mouseX - imageElement.clientWidth / 2,
            y: mouseY - imageElement.clientHeight / 2,
          },
          { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
        );
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
              className={`${roboto.className} text-bold w-full pt-5 pb-7 flex text-[2rem] smll:text-5xl sm:text-7xl md:text-8xl lg:text-9xl cursor-pointer  sm:h-[300px] items-center`}
              data-item="1"
              style={{
                
                fontWeight:300,
                textShadow: "2px 3px 20px rgb(0 0 0 / 32%) ",
              }}
            >
              <sup className="text-lg">01.</sup>Design
            </li>
            <hr className="text-5xl w-[100%] border-zinc-700" />
            <li
              className={`${roboto.className} text-bold w-full pt-5 pb-7 flex text-[2rem] smll:text-5xl sm:text-7xl md:text-8xl lg:text-9xl cursor-pointer  sm:h-[300px] items-center`}
              data-item="2"
              style={{
                
                fontWeight:300,
                textShadow: "2px 3px 20px rgb(0 0 0 / 32%) ",
              }}
            >
              <sup className="text-lg">02.</sup> Impact
            </li>
            <hr className="text-5xl w-[100%] border-zinc-700" />
            <li
              className={`${roboto.className} text-bold w-full pt-5 pb-7 text-[2rem] smll:text-5xl sm:text-7xl md:text-8xl flex lg:text-9xl cursor-pointer  sm:h-[300px] items-center`}
              data-item="3"
              style={{
                
                fontWeight:300,
                textShadow: "2px 3px 20px rgb(0 0 0 / 32%) ",
              }}
            >
              <sup className="text-lg">03.</sup> Security
            </li>
            <hr className="text-5xl w-[100%] border-zinc-700" />
          </ul>
          <img
            ref={hiddenImageRef}
            id="imageContainer"
            src={currentImage}
            alt="Hidden"
            width={300}
            height={300}
            className="hidden-image"
          />
        </div>
      </div>
    </div>
  );
}
