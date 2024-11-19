"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const Button = ({ button1Ref, children, width, height, className, color }) => {
  const svgRef = useRef(null);
  const polylineRef = useRef(null);
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleMouseLeave() {
      const tl = gsap.timeline();
      tl.fromTo(
        buttonRef.current,
        {
          y: "0px",
        },
        {
          y: "-27px",
          duration: 0.2,
        }
      );
      tl.fromTo(
        arrowRef.current,
        {
          rotateZ: "0deg",
        },
        {
          rotateZ: "-45deg",
          duration: 0.2,
        }
      );
    }
    // Handle animation logic
    function handleMouseEnter() {
      // console.log("entering");

      const tl = gsap.timeline();
      tl.fromTo(
        buttonRef.current,
        {
          y: "0px",
        },
        {
          y: "-27px",
          duration: 0.2,
        }
      );
      tl.fromTo(
        arrowRef.current,
        {
          rotateZ: "-45deg",
        },
        {
          rotateZ: "0deg",
          duration: 0.2,
        }
      );
    }
    const buttonElement = buttonRef.current;
    buttonElement.addEventListener("mouseenter", handleMouseEnter);
    buttonElement.addEventListener("mouseleave", handleMouseLeave);
    // Cleanup event listener
    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener("mouseenter", handleMouseEnter);
        buttonElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
    s;
  }, []);

  return (
    <button
      ref={button1Ref}
      className={`${className} relative bg-black outline-none border-none rounded-xl pr-3 pl-6 py-3 bg-transparent overflow-visible text-white`}
      style={{ background: "black" }}
    >
      <div className="flex gap-[10px] relative h-[1.3em] overflow-hidden ">
        <div className="flex flex-col relative z-[9]" ref={buttonRef}>
          <span className="relative z-[9] ">{children}</span>
          <span className="relative z-[9] ">{children}</span>
        </div>
        <svg
          width="25px"
          height="100%"
          viewBox="0 0 55 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-[9] -rotate-45"
          ref={arrowRef}
        >
          <path
            d="M3 16.5C1.61929 16.5 0.5 17.6193 0.5 19C0.5 20.3807 1.61929 21.5 3 21.5L3 16.5ZM53.7678 20.7678C54.7441 19.7915 54.7441 18.2085 53.7678 17.2322L37.8579 1.32233C36.8816 0.34602 35.2986 0.34602 34.3223 1.32233C33.346 2.29864 33.346 3.88155 34.3223 4.85786L48.4645 19L34.3223 33.1421C33.346 34.1184 33.346 35.7014 34.3223 36.6777C35.2986 37.654 36.8816 37.654 37.8579 36.6777L53.7678 20.7678ZM3 21.5L52 21.5L52 16.5L3 16.5L3 21.5Z"
            fill="white"
          />
        </svg>
      </div>
    </button>
  );
};

export default Button;
