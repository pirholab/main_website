import Link from 'next/link';
import React, { useState, useRef } from 'react';
import gsap from 'gsap'

const AnimatedButton = ({ children, href = "#", className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const arrowRef = useRef(null);
    const tl = gsap.timeline();

    // const handleMouseEnter = () => {
    //     setIsHovered(true);
    //     tl.fromTo(
    //         arrowRef.current,
    //         {
    //             rotateZ: "-45deg",
    //         },
    //         {
    //             rotateZ: "0deg",
    //             duration: 0.2,
    //         }
    //     );
    // };

    // const handleAnimationEnd = () => {
    //     setIsHovered(false);
    //     tl.fromTo(
    //         arrowRef.current,
    //         {
    //             rotateZ: "0deg",
    //         },
    //         {
    //             rotateZ: "-45deg",
    //             duration: 0.2,
    //         }
    //     );
    // };

    return (
        <>
            {/* <style>{`
        @keyframes buttonText {
          0% { transform: translateY(0); }
          25% { transform: translateY(-150%); }
          50% { transform: translateY(150%); }
          100% { transform: translateY(0); }
        }

        .animate-buttonText {
          animation: buttonText 0.4s ease-in-out;
        }
      `}</style> */}

            <Link href={href} className={`${className}`}>
                <div className="linkWrap">
                    <div className="link style-2">
                        <span className="mask">
                            <div className="link-container">
                                <span className="link-title1 title text-white" style={{ fontSize: "clamp(13px,4.1vw,1.2rem)" }}> {children}</span>
                                <span className="link-title2 title text-white" style={{ fontSize: "clamp(13px,4.1vw,1.2rem)" }}> {children}</span>
                            </div>
                        </span>
                        <div className="link-icon">
                            <svg
                                className="icon"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                            </svg>
                            <svg
                                className="icon"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default AnimatedButton;
