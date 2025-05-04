"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

// Define a type for our quote symbol
interface QuoteSymbol {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
  type: "open" | "close";
  angle: number;
  phase: number;
}

const TestimonialsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Number of quote symbols in the background
    const quoteSymbolCount = Math.floor((canvas.width * canvas.height) / 50000);

    // Create quote symbols
    const quoteSymbols: QuoteSymbol[] = [];
    for (let i = 0; i < quoteSymbolCount; i++) {
      quoteSymbols.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 8, // 8-20px
        opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2 opacity
        speed: Math.random() * 0.3 + 0.1, // float speed
        direction: Math.random() > 0.5 ? 1 : -1, // up or down
        type: Math.random() > 0.5 ? "open" : "close", // open or close quote
        angle: Math.random() * 20 - 10, // slight tilt
        phase: Math.random() * Math.PI * 2, // starting phase for animation
      });
    }

    let animationFrameId: number;
    let lastTime = 0;

    const render = (time: number) => {
      // Time-based animation
      const deltaTime = time - lastTime;
      lastTime = time;

      // Clear canvas with very subtle fade effect for trails
      ctx.fillStyle = "rgba(10, 10, 15, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw quote symbols
      quoteSymbols.forEach((symbol) => {
        // Move the symbol (floating effect)
        symbol.y +=
          Math.sin(time * 0.001 + symbol.phase) *
          symbol.speed *
          symbol.direction;

        // Wrap around if off-screen
        if (symbol.y < -symbol.size * 2) symbol.y = canvas.height + symbol.size;
        if (symbol.y > canvas.height + symbol.size * 2) symbol.y = -symbol.size;

        // Draw the symbol
        ctx.save();
        ctx.translate(symbol.x, symbol.y);
        ctx.rotate((symbol.angle * Math.PI) / 180);

        ctx.font = `${symbol.size}px Georgia, serif`;
        ctx.fillStyle = `rgba(78, 204, 163, ${symbol.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (symbol.type === "open") {
          ctx.fillText('"', 0, 0);
        } else {
          ctx.fillText('"', 0, 0);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000"
        style={{ opacity: inView ? 0.6 : 0 }}
      />
    </div>
  );
};

export default TestimonialsBackground;
