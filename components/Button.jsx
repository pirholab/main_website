import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const AnimatedButton = ({ children, href = "#", className }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href} className={`${className}`}>
            <motion.div 
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-secondary)] px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Animated glow effect */}
                <motion.div
                    className="absolute inset-0 bg-[var(--green-accent)]/20 blur-xl"
                    animate={{ 
                        opacity: isHovered ? 0.6 : 0,
                        scale: isHovered ? 1.2 : 1
                    }}
                    transition={{ duration: 0.5 }}
                />
                
                <div className="flex items-center justify-center gap-2">
                    <span className="relative z-10 text-white font-medium" style={{ fontSize: "clamp(13px,4.1vw,1.2rem)" }}>
                        {children}
                    </span>
                    
                    <motion.div 
                        className="relative z-10"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="white"
                        >
                            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                        </svg>
                    </motion.div>
                </div>
                
                {/* Animated particles */}
                {isHovered && (
                    <>
                        {[...Array(5)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute rounded-full bg-[var(--green-accent)] opacity-60"
                                style={{
                                    width: Math.random() * 6 + 2,
                                    height: Math.random() * 6 + 2,
                                    x: Math.random() * 100 - 50,
                                    y: Math.random() * 40 - 20,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    x: [0, Math.random() * 10 - 5, 0],
                                    opacity: [0, 0.5, 0],
                                }}
                                transition={{
                                    duration: 1.5 + Math.random(),
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: i * 0.1,
                                }}
                            />
                        ))}
                    </>
                )}
            </motion.div>
        </Link>
    );
};

export default AnimatedButton;
