"use client"
import gsap from "gsap";
import React, { useLayoutEffect, useState } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { SplitText } from "../ui/SplitText";

import { motion } from "framer-motion";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Another() {
  const actual_data = [
    {
      id: 1,
      image: "/web.png",
      title: "Web Design & Development ",
      description: `Transform your ideas into dynamic, high-performing websites
    with our expert team, ensuring seamless delivery and
    exceptional results that drive your business forward.`,
      tags: [
        " Creative web design",
        "Web development",
        "CopyWriting",
        "E-commerce",
        "Wordpress",
      ],
    },
    {
      id: 1,
      image: "/web.png",
      title: "Web Design & Development ",
      description: `Transform your ideas into dynamic, high-performing websites
    with our expert team, ensuring seamless delivery and
    exceptional results that drive your business forward.`,
      tags: [
        " Creative web design",
        "Web development",
        "CopyWriting",
        "E-commerce",
        "Wordpress",
      ],
    },
    {
      id: 1,
      image: "/web.png",
      title: "Web Design & Development ",
      description: `Transform your ideas into dynamic, high-performing websites
    with our expert team, ensuring seamless delivery and
    exceptional results that drive your business forward.`,
      tags: [
        " Creative web design",
        "Web development",
        "CopyWriting",
        "E-commerce",
        "Wordpress",
      ],
    },
    
  ];

  const [data, setData] = useState(actual_data);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards",
        pin: ".cards-row",
        pinSpacing: true,
        markers: true,
        start: "top top",
        end: "+=300%",
        scrub: 2, // Slower scrub for smoother scrolling
        snap: {
          snapTo: "labels",
          duration: { min: 1.5, max: 3 }, // Slower snapping
          delay: 1,
          ease: "power1.inOut",
        },
      },
    });

    const cards = document.querySelectorAll(".custom-card");
    ScrollTrigger.refresh();
    cards.forEach((card, index) => {
      const yp = (150 - (index * 10));
      tl.fromTo(
        card,
        {
          yPercent: 150,
          opacity: 1,
        },
        {
          yPercent: index * 3,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          // Removed stagger here to simplify the animation
        }
      ).fromTo(
        card,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 0.98 + (index * 0.01), // Slightly reduced scale animation for smoother effect
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
      if (index < cards.length - 1) {
        tl.to({}, { duration: 0.2 }); // Reduced duration of empty tweens
      }
    });

    const handleResize = () => {
      ScrollTrigger.refresh(); // Recalculate the scroll positions and layout
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to kill ScrollTrigger instances
    return () => {
      tl.scrollTrigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-[50px]">
        <motion.div className="flex mt-10 justify-center items-center">
          <h1 className="text-7xl text-center">
            <SplitText>What we Deliver</SplitText>
          </h1>
        </motion.div>
      </div>
      <div className="row cards-row">
        <div className="col-12">
          <div
            className="flex cards relative justify-center transition-all flex-col items-center"
            style={{ height: "100vh" }}
          >
            {data.map((e, i) => (
              <div
                key={i}
                className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[80vmax] custom-card h-auto sm:h-auto md:h-auto rounded-3xl flex-col-reverse md:flex-row-reverse shadow flex justify-center items-center content-center transition-all bg-zinc-700 absolute"
                style={{ zIndex: `${i + 2}`, transition: "all 0.1s" }}
              >
                <div className="flex h-full justify-center items-center p-0 sm:p-[22px]">
                  <Image
                    src={`${e.image}`}
                    alt="Picture of the author"
                    className="w-[95%] h-[90%] sm:w-[37vmax] md:h-[90%] rounded-3xl pb-[10px] sm:pb-0"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="p-5 w-full md:w-[50%] transition-all">
                  <h5
                    className={`${montserrat.className} mb-2 lg:text-6xl md:text-4xl text-2xl flex-row sm:flex-col tracking-tight text-gray-900 dark:text-white`}
                  >
                    {e.title}
                  </h5>
                  <p>{e.description}</p>
                  <br />
                  <br />
                  <div className="flex gap-[10px] flex-wrap">
                    {e.tags?.map((e, i) => (
                      <p
                        key={i}
                        className="rounded-full p-[5px] px-[7px] border border-zinc-500"
                      >
                        {e}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-12">
          <div className="next_block">
            <h1>End content</h1>
          </div>
        </div>
      // </div> */}
      {/* <div className="spacer"></div> */}
    </div>
  );
}
