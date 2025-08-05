"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "./../../ui/SplitText";
import { Award, Wrench } from "lucide-react";
import localFont from "next/font/local";
const firacode = localFont({
    src: "./../../fonts/firacode/FiraCode-Regular.ttf",
});

export const Timeline = ({ data }) => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="w-full bg-transparent md:px-10" ref={containerRef}>
            {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <h2 className="text-lg md:text-4xl mb-4 text-white max-w-4xl">
                    Vision to Reality
                </h2>
                <p className="text-neutral-300 text-sm md:text-base max-w-sm">
                    A step-by-step view of how we turned our ideas into a
                    working product.
                </p>
            </div> */}
            {/* Title section */}
            <div className="text-center mb-6">
                <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-medium mb-4 ${firacode.className}`}
                >
                    <Award className="w-3 h-3" />
                    Workflow
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                    Vision to{" "}
                    <span className="text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-orange-400 bg-clip-text relative">
                        Reality
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full opacity-30"></div>
                    </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    A step-by-step view of how we turned your ideas into life.
                    From early planning to designing, development and production
                    launch <br />— here’s how Pirhotech came to life.
                </p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#1d1d3b] flex items-center justify-center">
                                {/* <div className="h-4 w-4 rounded-full bg-black border border-neutral-700 p-2" /> */}
                                <img src="./project-point.svg" alt="" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-orange-400 bg-clip-text opacity-70">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-orange-400 bg-clip-text opacity-70">
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#DE854A] via-[#7F53F6] to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
