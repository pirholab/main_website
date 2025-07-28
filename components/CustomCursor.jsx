import { useEffect, useRef, useState } from "react";

const lerp = (a, b, n) => a + (b - a) * n;
const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });
    const cursor = useRef({ x: 0, y: 0 });
    const direction = useRef({ x: 0, y: 0 });

    const [renderCursor, setRenderCursor] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const dx = e.clientX - mouse.current.x;
            const dy = e.clientY - mouse.current.y;

            direction.current = {
                x: dx > 0 ? 1 : dx < 0 ? -1 : 0,
                y: dy > 0 ? 1 : dy < 0 ? -1 : 0,
            };

            mouse.current = { x: e.clientX, y: e.clientY };

            const target = e.target;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                    target.tagName.toLowerCase() === "a" ||
                    target.tagName.toLowerCase() === "button" ||
                    target.onclick ||
                    target.closest("a") ||
                    target.closest("button")
            );
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            cursor.current.x = lerp(
                cursor.current.x,
                mouse.current.x + direction.current.x * 5,
                0.05
            );
            cursor.current.y = lerp(
                cursor.current.y,
                mouse.current.y + direction.current.y * 5,
                0.05
            );
            setRenderCursor({ x: cursor.current.x, y: cursor.current.y });
            requestAnimationFrame(animate);
        };

        animate();

        // Handle mouse down and up events to change cursor size
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);

            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                className={`fixed pointer-events-none z-[99999] transition-transform duration-100 ${
                    isPointer ? "scale-150" : "scale-100"
                }`}
                style={{
                    left: `${renderCursor.x}px`,
                    top: `${renderCursor.y}px`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div className="relative w-7 h-7">
                    <div
                        className={`absolute w-3 h-3 bg-gradient-to-r from-[#FFB266] to-[#D96263] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                            isClicking ? "scale-150" : "scale-100"
                        }`}
                    />
                    <div
                        className={`absolute w-3 h-3 bg-gradient-to-r from-[#FFB266] to-[#D96263] rounded-full blur-sm opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                            isClicking ? "scale-[2]" : "scale-100"
                        }`}
                    />
                </div>
            </div>

            {/* Outer ring */}
            <div
                className="fixed pointer-events-none z-[99998] mix-blend-difference"
                style={{
                    left: `${mouse.current.x}px`,
                    top: `${mouse.current.y}px`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div
                    className={`relative transition-transform duration-300 ${
                        isPointer ? "scale-150" : "scale-100"
                    }`}
                >
                    <div className="w-7 h-7 rounded-full border border-white opacity-25" />
                </div>
            </div>
        </>
    );
};

export default CustomCursor;
