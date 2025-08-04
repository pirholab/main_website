"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Timeline data for software engineering stages
const timelineData = [
    {
        id: 1,
        stage: "Planning & Analysis",
        title: "Requirements Gathering",
        description: "Understanding client needs, defining project scope, and creating detailed specifications for the software solution. We conduct thorough research and stakeholder interviews to ensure project success.",
        icon: "📋",
        accent: "#0066CC",
        gradient: "from-blue-500 to-cyan-500",
        features: ["Stakeholder interviews", "Feasibility analysis", "Project roadmap", "Risk assessment"]
    },
    {
        id: 2,
        stage: "System Design",
        title: "Architecture & Design",
        description: "Creating comprehensive system architecture, intuitive UI/UX mockups, and robust database design. Our design phase ensures scalability and exceptional user experience.",
        icon: "🎨",
        accent: "#7C3AED",
        gradient: "from-purple-500 to-pink-500",
        features: ["System architecture", "UI/UX mockups", "Database design", "API specifications"]
    },
    {
        id: 3,
        stage: "Development",
        title: "Coding & Implementation",
        description: "Writing clean, efficient, and maintainable code following industry best practices and agile methodologies. We implement features iteratively with continuous integration.",
        icon: "⚡",
        accent: "#059669",
        gradient: "from-green-500 to-emerald-500",
        features: ["Clean code practices", "Code reviews", "Iterative development", "Version control"]
    },
    {
        id: 4,
        stage: "Testing & QA",
        title: "Quality Assurance",
        description: "Comprehensive testing strategies including automated tests, performance optimization, and security audits. We ensure your software meets the highest quality standards.",
        icon: "🔍",
        accent: "#DC2626",
        gradient: "from-red-500 to-orange-500",
        features: ["Automated testing", "Performance optimization", "Security audits", "Load testing"]
    },
    {
        id: 5,
        stage: "Deployment",
        title: "Launch & Maintenance",
        description: "Seamless production deployment with continuous monitoring, user training, and ongoing maintenance support. We ensure your software performs optimally in production.",
        icon: "🚀",
        accent: "#7C2D12",
        gradient: "from-orange-500 to-red-500",
        features: ["CI/CD deployment", "Monitoring & alerts", "Ongoing support", "Performance analytics"]
    }
];

const TimelineCard = ({ item, index, cardRef }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isLeft = index % 2 === 0;
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-24 group`}
        >
            {/* Timeline connector dot with glow */}
            <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className={`absolute ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} top-12 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 z-30 shadow-lg`}
                style={{ backgroundColor: item.accent }}
            >
                <div 
                    className="absolute inset-0 rounded-full animate-pulse opacity-60"
                    style={{ backgroundColor: item.accent, filter: 'blur(8px)' }}
                />
            </motion.div>

            {/* Card Container - Now takes 75% width */}
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`w-[75%] ${isLeft ? 'pr-12' : 'pl-12'} relative`}
            >
                {/* Glassmorphism background with gradient border */}
                <div className="relative group">
                    {/* Gradient border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className={`absolute inset-[1px] bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Main card */}
                    <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                        {/* Header with icon and stage */}
                        <div className={`bg-gradient-to-r ${item.gradient} p-6 text-white relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-4">
                                        <motion.div 
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={isInView ? { scale: 1, rotate: 0 } : {}}
                                            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/30"
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <div>
                                            <span className="block text-sm font-medium text-white/80 uppercase tracking-wider">
                                                {item.stage}
                                            </span>
                                            <h3 className="text-2xl font-bold">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg border border-white/30"
                                    >
                                        {item.id}
                                    </motion.div>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6"
                            >
                                {item.description}
                            </motion.p>
                            
                            {/* Features grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                {item.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.2 + idx * 0.1 + 0.7 }}
                                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                                    >
                                        <div 
                                            className="w-2 h-2 rounded-full shadow-sm"
                                            style={{ backgroundColor: item.accent }}
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {feature}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Action button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                                whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${item.accent}40` }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 bg-gradient-to-r ${item.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2`}
                            >
                                Explore details
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


const AnimatedTimelinePath = ({ scrollProgress, containerRef }) => {
    const [pathData, setPathData] = useState('');
    const [totalLength, setTotalLength] = useState(0);
    const svgRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const containerHeight = container.scrollHeight;
        const centerX = container.offsetWidth / 2;
        const startY = 100;
        const endY = containerHeight - 200;
        const xOffset = container.offsetWidth * 0.35; // horizontal distance from center for left/right
        const yStep = (endY - startY) / (timelineData.length - 1);

        // Alternate left/right x positions for each step
        const positions = [];
        for (let i = 0; i < timelineData.length; i++) {
            const x = i % 2 === 0 ? centerX - xOffset : centerX + xOffset;
            const y = startY + i * yStep;
            positions.push({ x, y });
        }

        // Start at the center bottom of the first box
        let path = `M ${positions[0].x} ${positions[0].y}`;
        for (let i = 1; i < positions.length; i++) {
            // Control points for a smooth C/S curve
            const prev = positions[i - 1];
            const curr = positions[i];
            // Control points horizontally between prev and curr, vertically at 1/2 and 1/2 between y's
            const c1x = prev.x;
            const c1y = prev.y + yStep / 2;
            const c2x = curr.x;
            const c2y = curr.y - yStep / 2;
            path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${curr.x} ${curr.y}`;
        }

        setPathData(path);

        setTimeout(() => {
            if (svgRef.current) {
                const pathElement = svgRef.current.querySelector('#animated-path');
                if (pathElement) {
                    const length = pathElement.getTotalLength();
                    setTotalLength(length);
                }
            }
        }, 100);
    }, [containerRef]);

    const strokeDashoffset = useTransform(scrollProgress, [0, 1], [totalLength, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
            >
                <defs>
                    <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0066CC" stopOpacity="0.8" />
                        <stop offset="25%" stopColor="#7C3AED" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#059669" stopOpacity="0.8" />
                        <stop offset="75%" stopColor="#DC2626" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#7C2D12" stopOpacity="0.8" />
                    </linearGradient>

                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                <path
                    d={pathData}
                    stroke="rgba(156, 163, 175, 0.2)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8,4"
                    className="animate-pulse"
                />

                <motion.path
                    id="animated-path"
                    d={pathData}
                    stroke="url(#path-gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={totalLength}
                    style={{ strokeDashoffset }}
                    filter="url(#glow)"
                />

                <motion.path
                    d={pathData}
                    stroke="url(#path-gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={totalLength}
                    style={{ strokeDashoffset }}
                    filter="url(#strong-glow)"
                    opacity="0.6"
                />
            </svg>
        </div>
    );
};




export default function StylishTimeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-colors duration-500">
            {/* Enhanced Header Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white py-24 px-4 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-blue-200 text-sm font-medium rounded-full border border-white/20">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            Our Development Process
                        </span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
                    >
                        From Vision to
                        <span className="block">Reality</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                    >
                        Experience our systematic approach to building exceptional software solutions that transform your business and delight your users.
                    </motion.p>
                </div>
            </div>

            {/* Timeline Section */}
            <div ref={containerRef} className="relative py-20 px-4" style={{ minHeight: '300vh' }}>
                <AnimatedTimelinePath scrollProgress={scrollYProgress} containerRef={containerRef} />
                
                <div className="max-w-7xl mx-auto relative z-20">
                    {timelineData.map((item, index) => {
                        const cardRef = useRef(null);
                        
                        return (
                            <TimelineCard
                                key={item.id}
                                item={item}
                                index={index}
                                cardRef={cardRef}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Enhanced CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 text-white py-24 px-4 overflow-hidden"
            >
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Ready to Transform Your Ideas?
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join hundreds of successful projects built with our proven methodology. Let's create something extraordinary together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.button
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" 
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300"
                        >
                            Start Your Project
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-transparent border-2 border-gray-400 hover:border-white text-white font-bold text-lg rounded-2xl transition-all duration-300"
                        >
                            View Portfolio
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}