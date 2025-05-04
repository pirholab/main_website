"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const AboutBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<any[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      // Recreate particles on resize
      initParticles();
    };

    // Initialize context
    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    // Create particles
    const initParticles = () => {
      particles.current = [];
      const nParticles = Math.floor((canvas.width * canvas.height) / 18000);

      for (let i = 0; i < nParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          color: `rgba(78, 204, 163, ${Math.random() * 0.5 + 0.2})`,
          speedX: Math.random() * 0.6 - 0.3,
          speedY: Math.random() * 0.6 - 0.3,
          dirX: Math.random() > 0.5 ? 1 : -1,
          dirY: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!contextRef.current || !canvas) return;

      // Slightly fade background to create trails
      contextRef.current.fillStyle = "rgba(13, 13, 13, 0.05)";
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((particle) => {
        // Move particles
        particle.x += particle.speedX * particle.dirX;
        particle.y += particle.speedY * particle.dirY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.dirX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dirY *= -1;

        // Draw particle
        contextRef.current!.beginPath();
        contextRef.current!.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );
        contextRef.current!.fillStyle = particle.color;
        contextRef.current!.fill();
      });

      // Connect particles that are close to each other
      connectParticles();

      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Connect nearby particles with lines
    const connectParticles = () => {
      const maxDistance = 150;

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            contextRef.current!.beginPath();
            contextRef.current!.moveTo(
              particles.current[i].x,
              particles.current[i].y
            );
            contextRef.current!.lineTo(
              particles.current[j].x,
              particles.current[j].y
            );
            contextRef.current!.strokeStyle = `rgba(78, 204, 163, ${
              opacity * 0.3
            })`;
            contextRef.current!.lineWidth = 0.6;
            contextRef.current!.stroke();
          }
        }
      }
    };

    // Setup and start animation
    handleResize();
    window.addEventListener("resize", handleResize);

    if (inView) {
      animate();
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-70 transition-opacity duration-1000"
        style={{ opacity: inView ? 0.7 : 0 }}
      />
    </div>
  );
};

export default AboutBackground;
