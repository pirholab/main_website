"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Montserrat, Roboto } from "next/font/google";
import { useEffect, useRef, useState } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });

const roboto = Roboto({ weight: "700", subsets: ["latin"] });
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
  style,
  targetScale,
  progress,
  totalCards,
  description,
  image,
  tags,
  resTags,
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

  console.log(range);
  const scale = useTransform(progress, range, [1, targetScale]);

  // console.log(scale)
  const size = useWindowSize();

  const getTopStyle = (index) => {
    console.log(i);
    if (size.width < 584) {
      // For mobile, set the first card's position at 25px and adjust the others based on the index
      if (index === 0) {
        return `25px`; // Position the first card at 25px
      }
      console.log(index === 3 && "if the index is 4");

      if (index === 3) {
        return `clamp(${index * 40}px, calc(-5vh + ${index * 45}px), 100px)`;
      }
    }

    // For desktop or larger screens, use a more flexible approach with `clamp`
    return `clamp(${index * 30}px, calc(-5vh + ${index * 45}px), 100px)`;
  };

  return (
    <div
      ref={container}
      className="h-screen sticky top-0 flex flex-col justify-center items-center"
    >
      <motion.div
        className="flex flex-col semi:flex-row-reverse bg-[url(/services/card-bg.svg)] bg-cover w-[90%] sm:h-[80%] rounded-[30px] h-[70%] ss:rounded-[50px] items-center justify-between pl-[10px] semi:pr-[30px] pr-[10px] relative"
        style={{
          top: getTopStyle(i),
          scale: scale,
         
        }}
      >
        <img
          src={image}
          alt=""
          className={`absolute ${style}`}
        />

        <div className="absolute top-20 md:right-16 md:top-14 right-10 w-[65%]">
          <h5
            className={`${roboto.className}  mb-2 flex-row sm:flex-col tracking-tight text-right pl-8  text-white`}
            style={{ fontSize: "clamp(1.5rem,4.1vw,4.5rem)" }}
          >
            {title}
          </h5>

          <p className="text-[#B2A1FD] font-light font-sans  md:text-2xl sm:text-xl text-lg  lg:text-4xl text-justify ">{description}</p>
        </div>
        
        {/* Responsive image - show different image based on screen size */}
        <div className="absolute bottom-10 w-full md:pl-16 pl-6 pr-6  ">
          <img className="hidden lg:block w-full" src={tags} alt="" />
          <img className="block lg:hidden w-full" src={resTags} alt="" />
        </div>
      </motion.div>
    </div>
  );
}
