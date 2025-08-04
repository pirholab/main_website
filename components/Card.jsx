"use client";

import { motion, useTransform } from "framer-motion";
import { Montserrat, Roboto } from "next/font/google";
import { useRef } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });
const roboto = Roboto({ weight: "700", subsets: ["latin"] });

export default function Card({
    title,
    style,
    targetScale,
    progress,
    description,
    image,
    tags,
    resTags,
    i,
    range,
}) {
    const container = useRef(null);

    // Scale from 1 → 0.95
    const scale = useTransform(progress, range, [1, 0.9]);

    // Y offset: 0px → 50px as card scrolls out
    const translateY = useTransform(progress, range, [80, 0]);

    const getTopStyle = (itemNumber) => {
        let index = parseInt(itemNumber);
        if (typeof window !== "undefined" && window.innerWidth < 584) {
            if (index === 0) return `25px`;
            if (index === 3)
                return `clamp(${index * 40}px, calc(-5vh + ${
                    index * 45
                }px), 100px)`;
        }
        return `clamp(${index * 30}px, calc(-5vh + ${index * 45}px), 100px)`;
    };

    return (
        <div
            ref={container}
            className="h-screen sticky top-0 flex flex-col justify-center items-center overflow-visible"
        >
            <motion.div
                className="flex flex-col semi:flex-row-reverse bg-[url(/services/card-bg.svg)] bg-cover w-[90%] sm:h-[80%] rounded-[30px] h-[70%] ss:rounded-[50px] items-center justify-between pl-[10px] semi:pr-[30px] pr-[10px] relative shadow-xl"
                style={{
                    top: getTopStyle(i),
                    willChange: "transform",
                }}
            >
                {getTopStyle(i)}
                <img src={image} alt="" className={`absolute ${style}`} />

                <div className="absolute top-20 md:right-16 md:top-14 right-10 w-[65%]">
                    <h5
                        className={`${roboto.className} mb-2 flex-row sm:flex-col tracking-tight text-right pl-8 text-white`}
                        style={{ fontSize: "clamp(1.5rem,4.1vw,4.5rem)" }}
                    >
                        {title}
                    </h5>

                    <p className="text-[#B2A1FD] font-light font-sans md:text-2xl sm:text-xl text-lg lg:text-4xl text-justify">
                        {description}
                    </p>
                </div>

                <div className="absolute bottom-10 w-full md:pl-16 pl-6 pr-6">
                    <img className="hidden lg:block w-full" src={tags} alt="" />
                    <img
                        className="block lg:hidden w-full"
                        src={resTags}
                        alt=""
                    />
                </div>
            </motion.div>
        </div>
    );
}
