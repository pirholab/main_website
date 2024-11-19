import React from "react";
import { motion } from "framer-motion";

export function SplitText({ children, ...rest }) {
  let words = children.split(" ");
  return words.map((word, i) => {
    return (
      <div
        key={children + i}
        style={{ display: "inline-block", overflow: "hidden" }}
      >
        <motion.div
          {...rest}
          style={{ display: "inline-block", willChange: "transform" }}
          custom={i}
          whileInView={{ y: 0, opacity: 1 }} // Animation starts when in view
          initial={{ y: "50%", opacity: 0 }} // Initial state before the element comes into view
          transition={{
            delay: i * 0.1,
          }}
        >
          {word + (i !== words.length - 1 ? "\u00A0" : "")}
        </motion.div>
      </div>
    );
  });
}

// Add this line to export SplitText as default
export default SplitText;
