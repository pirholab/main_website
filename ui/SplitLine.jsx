import React from "react";
import { motion } from "framer-motion";

export default function SplitLine({ children, className, ...rest }) {
  // Ensure children is treated as a string
  const text = typeof children === "string" ? children : children?.toString();
  const lines = text.split(/\r?\n/); // Handles both \n and \r\n

  lines.forEach((element) => {
    // console.log(element.trim());
  });
  return (
    <div style={{ display: "block" }} className={className}>
      {" "}
      {/* Use display block to stack lines without extra spacing */}
      {lines.map((line, i) => (
        <motion.div
          key={i}
          {...rest}
          style={{
            display: "block", // Ensure each line is a block element
            willChange: "transform",
            margin: 0, // Remove any extra margins
            padding: 0, // Remove any extra padding
          }}
          custom={i}
          whileInView={{ y: 0, opacity: 1 }} // Animation starts when in view
          initial={{ y: "100%", opacity: 0 }} // Initial state before the element comes into view
          transition={{
            delay: i * 0.1,
          }}
        >
          {line.trim()}
        </motion.div>
      ))}
    </div>
  );
}
