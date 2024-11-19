"use client"
import { useEffect, useRef } from 'react';
import Card from './Card';
import { motion, useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis'
import { SplitText } from '../ui/SplitText';


export default function Services() {
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
            title: "Digital Marketing",
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
            title: "Branding",
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
            title: "Android App Development",
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
