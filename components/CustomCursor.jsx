import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a clickable element
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.onclick ||
        target.closest('a') ||
        target.closest('button')
      );
    };

    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[99999] transition-transform duration-100 ${
          isPointer ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <div className="absolute w-3 h-3 bg-gradient-to-r from-[#FFB266] to-[#D96263] rounded-full" />
          <div className="absolute w-3 h-3 bg-gradient-to-r from-[#FFB266] to-[#D96263] rounded-full blur-sm opacity-50" />
        </div>
      </div>
      
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[99998] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`relative transition-transform duration-300 ${isPointer ? 'scale-150' : 'scale-100'}`}>
          <div className="w-7 h-7 rounded-full border border-white opacity-25" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;