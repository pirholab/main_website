"use client";

import React, { useRef, useState, useEffect } from "react";
import { Montserrat, Roboto } from "next/font/google";
import Image from "next/image";
import { useTransform, motion, useScroll } from "framer-motion";
const montserrat = Montserrat({ subsets: ["latin"] });

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
export default function Card({
  title,
  targetScale,
  progress,
  totalCards,
  description,
  image,
  tags,
  i,
  range,
}) {
  const container = useRef(null);
  console.log(i);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  // console.log("not working", progress.current, range, targetScale)

  console.log(range)
  const scale = useTransform(progress, range, [1, targetScale]);

  // console.log(scale)
  const size = useWindowSize();

  const getTopStyle = (index) => {
    console.log(i)
    if (size.width < 584) {
      // For mobile, set the first card's position at 25px and adjust the others based on the index
      if (index === 0) {
        return `25px`; // Position the first card at 25px
      }
      console.log(index === 3 && "if the index is 4")
      
      if (index === 3){
        return `clamp(${index * 40}px, calc(-5vh + ${index * 45}px), 100px)`;
      }
    }

    // For desktop or larger screens, use a more flexible approach with `clamp`
    return `clamp(${index * (30)}px, calc(-5vh + ${index * 45}px), 100px)`;
  };

  return (
    <div
      ref={container}
      className="h-screen sticky top-0 flex flex-col justify-center items-center"
    >
      <motion.div
        className="flex flex-col semi:flex-row-reverse bg-zinc-700 w-[90%] sm:h-[80%] rounded-[30px] ss:rounded-[50px] items-center justify-between pl-[10px] semi:pr-[30px] pr-[10px] relative"
        style={{
          top: getTopStyle(i),
          scale: scale,
          boxShadow: "0px 0px 9px 0px #18181b",
        }}
      >
        <div className="flex justify-center items-center w-full relative top-[10px] ss:top-[0px] semi:w-[50%] h-[45%] semi:h-[90%] ss:mt-[10px] rounded-3xl overflow-hidden">
          <motion.div
            // initial={{ opacity: 0, }}
            // animate={{ opacity: 1, }}
            className="w-[100%] h-[100%] flex justify-center items-center mt-[20px] ss:mt-0 "
            style={{ scale: imageScale }}
          >
            <Image
              src={`${image}`}
              alt={title}
              className="w-[100%] h-full object-cover md:h-[90%] pb-[10px] rounded-[30px] ss:rounded-[0px] sm:pb-0"
              style={{ height: "100%" }}
              width={500}
              height={500}
              priority={true}
            />
          </motion.div>
        </div>
        <div className="p-5 w-full semi:w-[50%] transition-all">
          <h5
            className={`${roboto.className} mb-2 flex-row sm:flex-col tracking-tight text-gray-900 dark:text-white`}
            style={{ fontSize: "clamp(2.5rem,6.1vw,6.5rem)" }}
          >
            {title}
          </h5>
          <p>{description}</p>
          <div className="flex gap-[10px] flex-wrap mt-7">
            {tags?.map((e, i) => (
              <p
                key={i}
                className="rounded-full p-[5px] px-[7px] border border-zinc-500"
              >
                {e}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
