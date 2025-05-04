"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Montserrat, Roboto } from "next/font/google";
import { useEffect, useRef, useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
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

  // Green theme gradients for cards
  const cardGradients = [
    "from-[var(--green-primary)] to-[var(--green-dark)]",
    "from-[var(--green-secondary)] to-[var(--green-dark)]",
    "from-[var(--green-primary)] to-[var(--green-secondary)]",
    "from-[var(--green-dark)] to-[var(--green-secondary)]"
  ];

  return (
    <div
      ref={container}
      className="h-screen sticky top-0 flex flex-col justify-center items-center"
    >
      <motion.div
        className={`flex flex-col semi:flex-row-reverse bg-gradient-to-br ${cardGradients[i % cardGradients.length]} 
          w-[90%] sm:h-[80%] rounded-[30px] ss:rounded-[50px] items-center justify-between 
          pl-[10px] semi:pr-[30px] pr-[10px] relative overflow-hidden`}
        style={{
          top: getTopStyle(i),
          scale: scale,
          boxShadow: "0px 0px 15px 0px rgba(26, 93, 26, 0.3)",
        }}
        whileHover={{
          boxShadow: "0px 0px 25px 0px rgba(142, 255, 142, 0.4)"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Animated background particles */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-[var(--green-accent)] opacity-30"
                style={{
                  width: Math.random() * 10 + 4,
                  height: Math.random() * 10 + 4,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
        
        <div className="flex justify-center items-center w-full relative top-[10px] ss:top-[0px] semi:w-[50%] h-[45%] semi:h-[90%] ss:mt-[10px] rounded-3xl overflow-hidden">
          <motion.div
            className="w-[100%] h-[100%] flex justify-center items-center mt-[20px] ss:mt-0"
            style={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              width="320"
              height="240"
              className="w-full h-full object-cover rounded-xl transition-all"
              autoPlay
              loop
              playsInline
              muted
            >
              <source src={`${image}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
        
        <div className="p-5 w-full semi:w-[50%] transition-all">
          <motion.h5
            className={`${roboto.className} mb-2 flex-row sm:flex-col tracking-tight text-white`}
            style={{ fontSize: "clamp(2.5rem,6.1vw,6.5rem)" }}
            animate={{ 
              textShadow: isHovered ? "0 0 8px rgba(142, 255, 142, 0.5)" : "none"
            }}
          >
            {title}
          </motion.h5>
          
          <motion.p 
            className="text-white/90"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {description}
          </motion.p>
          
          <div className="flex gap-[10px] flex-wrap mt-7">
            {tags?.map((e, i) => (
              <motion.p
                key={i}
                className="rounded-full p-[5px] px-[10px] border border-[var(--green-accent)] text-white bg-[var(--green-dark)]/30"
                whileHover={{ 
                  backgroundColor: "rgba(142, 255, 142, 0.2)",
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                {e}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
