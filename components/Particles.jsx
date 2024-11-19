import React, { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, Point, PointMaterial } from "@react-three/drei";
import { MathUtils } from "three";

export default function Part() {
  const positions = useMemo(() => {
    const posArray = Array.from({ length: 300 }, () => [
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50),
      MathUtils.randFloatSpread(50),
    ]);

    // Validate positions to ensure they are correctly formatted
    posArray.forEach((pos, i) => {
      if (pos.length !== 3 || pos.some(isNaN)) {
        console.error(`Invalid position at index ${i}:`, pos);
      }
    });

    return posArray;
  }, []);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.001, 0]}
      receiveShadow
    >
      {/* Points (Particles) */}
      <Points limit={positions.length}>
        <PointMaterial
          size={3}
          vertexColors
          color={"yellow"}
          sizeAttenuation={false}
          depthTest={true}
          toneMapped={false}
        />
        {positions.map((position, i) => (
          <PointEvent key={i} position={position} />
        ))}
      </Points>
    </mesh>
  );
}

function PointEvent({ position }) {
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  const ref = useRef();

  const direction = useRef([
    MathUtils.randFloatSpread(60),
    MathUtils.randFloatSpread(60),
    MathUtils.randFloatSpread(60),
  ]);
  const speed = useRef(MathUtils.randFloat(0.01, 0.05));

  useFrame(() => {
    ref.current.position.x += direction.current[0] * speed.current;
    ref.current.position.y += direction.current[1] * speed.current;
    ref.current.position.z += direction.current[2] * speed.current;

    if (Math.random() < 0.01) {
      direction.current = [
        MathUtils.randFloatSpread(10),
        MathUtils.randFloatSpread(10),
        MathUtils.randFloatSpread(10),
      ];
      speed.current = MathUtils.randFloat(0.01, 0.05);
    }

    const boundary = 30;
    if (Math.abs(ref.current.position.x) > boundary)
      ref.current.position.x = MathUtils.randFloatSpread(boundary);
    if (Math.abs(ref.current.position.y) > boundary)
      ref.current.position.y = MathUtils.randFloatSpread(boundary);
    if (Math.abs(ref.current.position.z) > boundary)
      ref.current.position.z = MathUtils.randFloatSpread(boundary);
  });

  return (
    <Point
      ref={ref}
      position={position}
      color={"yellow"}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      onClick={(e) => (e.stopPropagation(), setClick((state) => !state))}
    />
  );
}
