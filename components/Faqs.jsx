import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import { motion } from 'framer-motion'

const data = {

    rows: [
        {
            title: "What services does PiRhoTech offer?",
            content: `At PiRhoTech, we specialize in a wide range of digital services, including Web Design & Development, Digital Marketing, Branding, and Android App Development. Our expert team works with you to create custom solutions that elevate your business and drive results.`,
        },
        {
            title: "How long does it take to complete a project?",
            content:
                "The timeline for a project depends on its complexity and scope. We work closely with you to establish clear goals and deadlines, ensuring we deliver high-quality results within a realistic timeframe. Typically, projects range from a few weeks to a few months.",
        },
        {
            title: "What industries does PiRhoTech work with?",
            content: `We work with businesses across a variety of industries, including e-commerce, healthcare, education, technology, finance, and more. No matter your industry, our team is dedicated to crafting tailored solutions that meet your unique needs.`,
        },
        {
            title: "How do I get started with PiRhoTech?",
            content: <p>Getting started is easy! Simply reach out to us via our contact form, email, or phone. We'll schedule an initial consultation to discuss your goals, challenges, and how we can help your business succeed. From there, we'll guide you through the process step by step.</p>,
        },
    ],
};

const styles = {
    bgColor: 'transparent',
    titleTextColor: "white",
    rowTitleColor: "white",
    rowContentColor: 'white',
    arrowColor: "white",
    rowTitleTextSize: "1.5rem",

};

const config = {
    animate: true,
    arrowIcon: "V",
    openOnload: 0,
    expandIcon: "+",
    collapseIcon: "-",
}



export default function Faqs() {

    return (
        <div className="px-5 py-3 flex justify-center mt-[100px] sm:mt-[50px]">
            <div className="w-full sm:w-[85%]">
                <motion.div
                    whileInView={{ y: 0, opacity: 1 }} // Animation starts when in view
                    initial={{ y: "50%", opacity: 0 }} // Initial state before the element comes into view
                    className="text-7xl">FAQs</motion.div>
                <Faq
                    data={data}
                    styles={styles}
                    config={config}
                />
            </div>
        </div>
    );
}