"use client"
import Lenis from '@studio-freight/lenis';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SplitText } from '../ui/SplitText';
import Card from './Card';


export default function Services() {
    const actual_data = [
        {
            id: 1,
            image: "/services/card-design.svg",
            title: "Web Design & Development ",
            style: "md:top-14 md:left-16 top-20 left-8 md:w-[220px] sm:w-[160px] w-[120px]",
            description: `Transform your ideas into dynamic, high-performing websites
        with our expert team, ensuring seamless delivery and
        exceptional results that drive your business forward.`,
            tags:"/services/service-tag.svg",
            resTags:"/services/res-service-tag.svg",
        },
        {
            id: 1,
            image: "/services/digital-card-design.svg",
            title: "Digital Marketing",
            style: "md:top-36 md:left-0 top-36 left-0 md:w-[160px] sm:w-[120px] w-[100px]",
            description: `Boost your brand's online visibility with marketing strategies that work for you. Whether it’s through SEO, social media, or ads, we help you reach the right people and grow your business.`,
            tags: "/services/digital-service-tag.svg",
            resTags:"/services/res-digital-service-tag.svg",
        },
        {
            id: 1,
            image: "/services/branding-card-design.svg ",
            title: "Automation",
            style: "md:top-36 md:left-0 top-36 left-0 md:w-[160px] sm:w-[120px] w-[100px]",
            description: `Create a lasting impression with a strong, authentic brand. We help you define your identity, tell your story, and connect with your audience in a way that stands out and builds trust.`,
            tags: "/services/automation-service-tag.svg",
            resTags:"/services/res-automation-service-tag.svg",
        },
        {
            id: 1,
            image: "/services/android-card-design.svg",
            title: "Mobile App Development",
            style: "md:top-28 md:left-16 top-28 left-8 md:w-[120px] sm:w-[100px] w-[80px]",
            description: `Turn your app ideas into reality with custom Android solutions. Our team builds intuitive, high-performance apps that provide seamless user experiences and drive engagement.`,
            tags: "/services/mobile-service-tag.svg",
            resTags:"/services/res-mobile-service-tag.svg",
        },
        
        

    ];


    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    useEffect(() => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    })

    // console.log(scrollYProgress.current)



    return (
        <div className='mb-[300px] md:mb-[100px]'>
            <div className="flex flex-col gap-[50px]">
                <motion.div className="flex mt-10 justify-center items-center">
                    <h1 className="text-7xl text-center">
                        <SplitText>What we Deliver</SplitText>
                    </h1>
                </motion.div>
            </div>
            <main ref={container} className="mt-[10vh]">
                {actual_data?.map((e, i) => {
                    const targetScale = 1 - ((actual_data.length - i) * 0.03);
                    console.log(actual_data.length," ",targetScale," i=",i)
                    return (
                        <Card key={`p_${i}`} i={i} {...e} range={[i * (1/actual_data.length), 1]} progress={scrollYProgress} targetScale={targetScale}  totalCards={actual_data.length} />
                    )
                })}
            </main>
        </div>
    )
}
