import { motion } from "framer-motion";
import { useState } from "react";

const GreenButton = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md",
  icon = null,
  fullWidth = false,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg"
  };
  
  // Variant styles
  const variantStyles = {
    primary: `bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-secondary)] 
              text-white hover:shadow-lg hover:shadow-[var(--green-primary)]/20`,
    secondary: `bg-transparent border-2 border-[var(--green-secondary)] 
                text-[var(--green-secondary)] hover:bg-[var(--green-secondary)]/10`,
    ghost: `bg-transparent text-[var(--green-secondary)] hover:bg-[var(--green-secondary)]/10`,
    accent: `bg-[var(--green-accent)] text-[var(--green-dark)] 
             hover:shadow-lg hover:shadow-[var(--green-accent)]/20`
  };
  
  return (
    <motion.button
      onClick={disabled ? null : onClick}
      className={`
        relative overflow-hidden rounded-full
        font-medium transition-all duration-300 ease-out
        flex items-center justify-center gap-2
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated glow effect */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-[var(--green-accent)]/20 blur-xl"
          animate={{ 
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Icon (if provided) */}
      {icon && <span className="inline-block">{icon}</span>}
      
      {/* Button text */}
      <span className="relative z-10">{children}</span>
      
      {/* Animated moving particles for primary variant */}
      {variant === "primary" && (
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
    </motion.button>
  );
};

export default GreenButton; 