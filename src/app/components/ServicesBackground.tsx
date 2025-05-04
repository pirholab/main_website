"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const ServicesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!containerRef.current || !inView) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Generate gradient blobs
    const createBlob = () => {
      const blob = document.createElement("div");

      // Random properties for the blob
      const size = Math.random() * 300 + 100; // 100-400px
      const posX = Math.random() * (width - size);
      const posY = Math.random() * (height - size);
      const hue = Math.random() > 0.5 ? "170" : "240"; // Teal or blue
      const opacity = Math.random() * 0.15 + 0.05; // 0.05-0.2 opacity

      // Styling the blob
      blob.style.position = "absolute";
      blob.style.width = `${size}px`;
      blob.style.height = `${size}px`;
      blob.style.borderRadius = "50%";
      blob.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 50%, ${opacity}) 0%, transparent 70%)`;
      blob.style.filter = "blur(70px)";
      blob.style.left = `${posX}px`;
      blob.style.top = `${posY}px`;
      blob.style.transform = "translate3d(0,0,0)";
      blob.style.zIndex = "0";

      // Start position and animation properties
      const startX = posX;
      const startY = posY;
      const speedX = Math.random() * 0.5 - 0.25; // -0.25 to 0.25 px per frame
      const speedY = Math.random() * 0.5 - 0.25;
      const maxDistance = 50; // max 50px in any direction

      // Animate the blob
      let frame = 0;
      const animate = () => {
        frame++;

        // Create a subtle floating effect
        const x = startX + Math.sin(frame * speedX) * maxDistance;
        const y = startY + Math.cos(frame * speedY) * maxDistance;

        blob.style.left = `${x}px`;
        blob.style.top = `${y}px`;

        if (container.contains(blob)) {
          requestAnimationFrame(animate);
        }
      };

      // Append and start animation
      container.appendChild(blob);
      animate();

      // Clean up after some time to prevent too many blobs
      setTimeout(() => {
        if (container.contains(blob)) {
          container.removeChild(blob);
        }
      }, 15000); // Remove after 15 seconds
    };

    // Create initial blobs
    for (let i = 0; i < 8; i++) {
      createBlob();
    }

    // Create new blobs at intervals
    const interval = setInterval(() => {
      if (container.childElementCount < 10) {
        // Limit to 10 blobs max
        createBlob();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      // Clean up existing blobs
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-1000"
        style={{ opacity: inView ? 1 : 0 }}
      ></div>
    </div>
  );
};

export default ServicesBackground;
