"use client"
import Lenis from '@studio-freight/lenis';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Card from './Card';
import GreenFloatingAnimation from './GreenFloatingAnimation';


export default function Services() {
    const actual_data = [
        {
            id: 1,
            image: "/project.mp4",
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
            id: 2,
            image: "/project3.mp4",
            title: "Digital Marketing",
            description: `Boost your brand's online visibility with marketing strategies that work for you. Whether it's through SEO, social media, or ads, we help you reach the right people and grow your business.`,
            tags: [
                "SEO Optimization",
                "Content Marketing",
                "Social Media",
                "PPC Advertising",
                "Analytics",
            ],
        },
        {
            id: 3,
            image: "/project1.mp4",
            title: "Branding",
            description: `Create a lasting impression with a strong, authentic brand. We help you define your identity, tell your story, and connect with your audience in a way that stands out and builds trust.`,
            tags: [
                "Logo Design",
                "Brand Strategy",
                "Visual Identity",
                "Brand Guidelines",
                "Brand Messaging",
            ],
        },
        {
            id: 4,
            image: "/project2.mp4",
            title: "3D Interactive Experiences",
            description: `Engage your audience with immersive 3D web experiences that captivate and inspire. Our Three.js expertise brings your vision to life with cutting-edge technology and creative design.`,
            tags: [
                "Three.js Development",
                "WebGL Animations",
                "3D Product Showcases",
                "Interactive Experiences",
                "Virtual Tours",
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
        <div className='mb-[300px] md:mb-[100px] relative'>
            {/* Background animated elements */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <GreenFloatingAnimation height="100%" />
            </div>
            
            <div className="relative z-10">
                <div className="flex flex-col gap-[50px]">
                    <motion.div 
                        className="flex mt-10 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-5xl md:text-7xl text-center">
                            <span className="text-[var(--green-accent)]">What</span> we <span className="text-[var(--green-secondary)]">Deliver</span>
                        </h1>
                    </motion.div>
                    
                    <motion.p 
                        className="text-center text-white/80 max-w-2xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Our specialized services blend cutting-edge technology with creative expertise to deliver exceptional digital solutions for your business.
                    </motion.p>
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
            
            {/* Green accent elements */}
            <motion.div 
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[var(--green-primary)] filter blur-3xl opacity-20 z-0"
                animate={{ 
                    x: [0, 50, 0],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            
            <motion.div 
                className="absolute top-20 right-20 w-60 h-60 rounded-full bg-[var(--green-accent)] filter blur-3xl opacity-10 z-0"
                animate={{ 
                    x: [0, -30, 0],
                    y: [0, 30, 0],
                    opacity: [0.05, 0.15, 0.05]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </div>
    )
}
