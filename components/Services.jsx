"use client";
import React, { useEffect, useRef, useMemo } from "react";
import Lenis from "@studio-freight/lenis";
import { useScroll, useSpring } from "framer-motion";
import Card from "./Card";
import localFont from "next/font/local";
const firacode = localFont({
    src: "../fonts/firacode/FiraCode-Regular.ttf",
});
import { Wrench } from "lucide-react";
import { motion } from "framer-motion";
import SplitText from "@/ui/SplitText";

export default function Services() {
    // 1️⃣ compute per‐card constants once
    const RAW_DATA = [
        {
            id: 1,
            image: "/services/card-design.svg",
            title: "Web Design & Development ",
            style: "md:top-14 md:left-16 top-20 left-8 md:w-[220px] sm:w-[160px] w-[120px]",
            description: `Crafting stunning, high-performance websites that captivate and convert.`,
            tags: "/services/service-tag.svg",
            resTags: "/services/res-service-tag.svg",
        },
        {
            id: 2,
            image: "/services/digital-card-design.svg",
            title: "Digital Marketing",
            style: "md:top-14 md:left-16 top-20 left-8 md:w-[220px] sm:w-[160px] w-[120px]",
            description: `Driving your brand forward with data-powered digital strategies.`,
            tags: "/services/digital-service-tag.svg",
            resTags: "/services/res-digital-service-tag.svg",
        },
        {
            id: 3,
            image: "/services/branding-card-design.svg ",
            title: "Automation",
            style: "md:top-36 md:left-0 top-36 left-0 md:w-[160px] sm:w-[120px] w-[100px]",
            description: `Streamlining your workflows so you can focus on what matters most.`,
            tags: "/services/automation-service-tag.svg",
            resTags: "/services/res-automation-service-tag.svg",
        },
        {
            id: 4,
            image: "/services/android-card-design.svg",
            title: "Mobile App Development",
            style: "md:top-28 md:left-16 top-28 left-8 md:w-[120px] sm:w-[100px] w-[80px]",
            description: `Building intuitive mobile experiences that engage users everywhere.`,
            tags: "/services/mobile-service-tag.svg",
            resTags: "/services/res-mobile-service-tag.svg",
        },
    ];

    const cards = useMemo(() => {
        const length = RAW_DATA.length;
        return RAW_DATA.map((item, i) => ({
            ...item,
            targetScale: 1 - (length - i) * 0.03,
            topOffset: `clamp(${i * 30}px, calc(-5vh + ${i * 45}px), 100px)`,
            start: i / length,
        }));
    }, []);

    // 2️⃣ container + refs
    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    // 3️⃣ single scroll listener
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const smooth = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // 4️⃣ Lenis smooth‐scroll
    useEffect(() => {
        const lenis = new Lenis({ smooth: true, duration: 1.2 });
        let rafId;
        function raf(t) {
            lenis.raf(t);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    // 5️⃣ drive all cards per‐frame
    useEffect(() => {
        let frame;
        const unsub = smooth.onChange((v) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                cards.forEach((c, i) => {
                    const el = cardRefs.current[i];
                    if (!el) return;
                    const t = Math.min(
                        Math.max((v - c.start) / (1 - c.start), 0),
                        1
                    );
                    const scale = 1 + (c.targetScale - 1) * t;
                    el.style.transform = `translateY(${c.topOffset}) scale(${scale})`;
                });
            });
        });
        return () => {
            unsub();
            cancelAnimationFrame(frame);
        };
    }, [smooth, cards]);

    return (
        <div className="mb-[300px] md:mb-[100px] sm:mb-[50px]">
            {/* Header */}
            <div className="flex flex-col items-center justify-center mt-10">
                <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-medium mb-4 ${firacode.className}`}
                >
                    <Wrench className="w-3 h-3" />
                    Our Services
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-7xl text-center"
                >
                    <SplitText>What we deliver</SplitText>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-lg text-center text-gray-400 max-w-2xl mt-4"
                >
                    We provide a comprehensive range of services to help you
                    succeed in the digital world, from web design to digital
                    marketing and automation.
                </motion.p>
            </div>

            {/* Scroll‐driven cards */}
            {/* <main ref={containerRef} className="mt-[10vh]"> */}
            <main ref={containerRef}>
                {cards.map((c, i) => (
                    <Card
                        key={c.id}
                        cardRef={(el) => (cardRefs.current[i] = el)}
                        image={c.image}
                        title={c.title}
                        description={c.description}
                        tags={c.tags}
                        resTags={c.resTags}
                        range={[
                            i * (1 / cards.length),
                            (i + 1) * (1 / cards.length),
                        ]}
                        progress={scrollYProgress}
                        style={c.style}
                        i={i}
                    />
                ))}
            </main>
        </div>
    );
}
