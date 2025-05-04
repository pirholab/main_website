"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const ProjectsBackground = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!svgRef.current || !inView) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Remove existing lines if any
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Create random line patterns
    const lineCount = Math.floor(width / 100); // Adjust line density

    for (let i = 0; i < lineCount; i++) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      // Generate random starting points
      const startX = Math.random() * width;
      const startY = Math.random() * height;

      // Create path data - a cubic bezier curve
      const endX = Math.random() * width;
      const endY = Math.random() * height;
      const controlX1 = startX + (Math.random() * 100 - 50);
      const controlY1 = startY + (Math.random() * 200 - 100);
      const controlX2 = endX + (Math.random() * 100 - 50);
      const controlY2 = endY + (Math.random() * 200 - 100);

      const pathData = `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;

      // Set attributes
      line.setAttribute("d", pathData);
      line.setAttribute("fill", "none");
      line.setAttribute(
        "stroke",
        `rgba(78, 204, 163, ${Math.random() * 0.1 + 0.05})`
      );
      line.setAttribute("stroke-width", `${Math.random() * 1 + 0.5}`);

      // Dash array for dotted/dashed line effect
      if (Math.random() > 0.5) {
        const dashLength = Math.random() * 5 + 1;
        const dashGap = Math.random() * 10 + 5;
        line.setAttribute("stroke-dasharray", `${dashLength} ${dashGap}`);
      }

      // Add animation
      const animate = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animate"
      );
      animate.setAttribute("attributeName", "stroke-dashoffset");
      animate.setAttribute("from", "0");
      animate.setAttribute("to", "1000");
      animate.setAttribute("dur", `${Math.random() * 30 + 20}s`);
      animate.setAttribute("repeatCount", "indefinite");

      line.appendChild(animate);
      svg.appendChild(line);
    }

    // Create grid dots
    const gridSpacing = 40;
    const rows = Math.ceil(height / gridSpacing);
    const cols = Math.ceil(width / gridSpacing);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() > 0.7) {
          // Only create some dots, not all
          const x = col * gridSpacing;
          const y = row * gridSpacing;

          const dot = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          dot.setAttribute("cx", x.toString());
          dot.setAttribute("cy", y.toString());
          dot.setAttribute("r", `${Math.random() * 1 + 0.5}`);
          dot.setAttribute(
            "fill",
            `rgba(78, 204, 163, ${Math.random() * 0.2 + 0.1})`
          );

          // Add pulse animation
          if (Math.random() > 0.7) {
            const animate = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "animate"
            );
            animate.setAttribute("attributeName", "r");
            animate.setAttribute(
              "values",
              `${Math.random() * 0.5 + 0.5};${Math.random() * 1.5 + 1};${
                Math.random() * 0.5 + 0.5
              }`
            );
            animate.setAttribute("dur", `${Math.random() * 5 + 2}s`);
            animate.setAttribute("repeatCount", "indefinite");

            dot.appendChild(animate);
          }

          svg.appendChild(dot);
        }
      }
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000"
        style={{ opacity: inView ? 0.5 : 0 }}
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </div>
  );
};

export default ProjectsBackground;
