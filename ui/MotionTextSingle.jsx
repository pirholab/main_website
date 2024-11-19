import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function MotionTextSingle({
  children,
  className,
  elementType = "h1",
}) {
  return (
    <div>
      <elementType ref={textRef} className={className}>
        {children}
      </elementType>
    </div>
  );
}
