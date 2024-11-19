import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const MotionText = ({
  children,
  upperClass,
  className,
  elementType = "h1",
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = new SplitType(textRef.current, {
      types: "lines",
    });

    gsap.from(text.lines, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      delay: 1,
      duration: 1.5,
      ease: "power3.out",
    });

    return () => {
      text.revert();
    };
  }, []);



  return (
    <div className={upperClass}>
      <elementType id="splitText" ref={textRef} className={className}>
        {children}
      </elementType>
    </div>
  );
};

export default MotionText;
