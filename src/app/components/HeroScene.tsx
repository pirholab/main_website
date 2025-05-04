"use client";

import { Environment, Float, Sphere, Torus } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

// Animated 3D elements
const AnimatedSphere = ({ position, color, speed = 1, size = 1 }) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.25;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.z = t * 0.1;
  });

  return (
    <Sphere ref={ref} args={[size, 32, 32]} position={position}>
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
    </Sphere>
  );
};

const AnimatedTorus = ({ position, color, speed = 1, size = 1 }) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.1;
  });

  return (
    <Torus ref={ref} args={[size, size / 4, 16, 32]} position={position}>
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
    </Torus>
  );
};

// Main scene
const Scene = () => {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.1} />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <AnimatedSphere
          position={[-3, 0, 0]}
          color="#00FF84"
          size={1.2}
          speed={0.8}
        />
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.2}>
        <AnimatedTorus
          position={[3, 1, -2]}
          color="#00CC6A"
          size={1.5}
          speed={0.5}
        />
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.4}>
        <AnimatedSphere
          position={[2, -2, -1]}
          color="#33FFA0"
          size={0.8}
          speed={1.2}
        />
      </Float>

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <AnimatedTorus
          position={[-2, -1, -3]}
          color="#00FF84"
          size={1}
          speed={1}
        />
      </Float>
    </>
  );
};

// Main Hero Scene Component
const HeroScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroScene;
