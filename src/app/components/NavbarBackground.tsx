"use client";

import {
  MeshDistortMaterial,
  OrbitControls,
  Preload,
  useCursor,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color, MathUtils, Mesh, Vector3 } from "three";

interface ParticleProps {
  position: number[];
  color: string;
  speed?: number;
  size?: number;
  mouseRef: React.RefObject<[number, number, number]>;
}

interface WavePlaneProps {
  color: string;
  speed?: number;
}

interface SceneProps {
  scrollY: number;
}

// Particle component that responds to mouse movement
const FloatingParticle = ({
  position,
  color,
  speed = 1,
  size = 0.2,
  mouseRef,
}: ParticleProps) => {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const initialPosition = useRef(position.slice());
  const [sparkle, setSparkle] = useState(false);

  // Enable cursor pointer when hovering
  useCursor(hovered);

  // Trigger sparkle effect every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setSparkle(true);
        setTimeout(() => setSparkle(false), 300);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;

    // Calculate base oscillation movement
    const t = state.clock.getElapsedTime() * speed;

    // Add some randomness to movement
    const noise = Math.sin(t * 0.5) * 0.05;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.1 + noise;
    mesh.current.position.x = position[0] + Math.cos(t * 0.7) * 0.05;

    // If mouse position exists, particles are attracted to it slightly
    if (mouseRef.current) {
      const mouseDistance = new Vector3(
        mouseRef.current[0] - mesh.current.position.x,
        mouseRef.current[1] - mesh.current.position.y,
        0
      );

      // Apply force if close enough to mouse
      if (mouseDistance.length() < 3) {
        const forceStrength = hovered ? 0.04 : 0.02;
        const force = mouseDistance.normalize().multiplyScalar(forceStrength);
        mesh.current.position.x += force.x;
        mesh.current.position.y += force.y;
      } else {
        // Return to original position if far from mouse
        mesh.current.position.x = MathUtils.lerp(
          mesh.current.position.x,
          initialPosition.current[0] + Math.cos(t * 0.7) * 0.05,
          0.02
        );
      }
    }

    // Rotate particle
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.z = t * 0.1;
    mesh.current.rotation.y = Math.sin(t * 0.3) * 0.2;

    // Scale up when hovered or sparkling
    const targetScale = hovered ? size * 1.6 : sparkle ? size * 1.3 : size;
    mesh.current.scale.x =
      mesh.current.scale.y =
      mesh.current.scale.z =
        MathUtils.lerp(mesh.current.scale.x, targetScale, 0.1);
  });

  return (
    <>
      {/* Create a light inside the particle for glow effect */}
      <pointLight
        distance={2}
        intensity={hovered ? 1 : sparkle ? 0.8 : 0.4}
        color={color}
      />

      <mesh
        ref={mesh}
        position={[position[0], position[1], position[2]]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, hovered ? 2 : 1]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={hovered ? 0.5 : sparkle ? 0.4 : 0.2}
          roughness={0.4}
          metalness={0.8}
          emissive={new Color(color).multiplyScalar(0.8)}
          emissiveIntensity={hovered ? 2.5 : sparkle ? 2 : 1}
          toneMapped={false}
        />
      </mesh>
    </>
  );
};

// Wave effect component
const WaveEffect = ({ scrollY }: { scrollY: number }) => {
  const mesh = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const t = clock.getElapsedTime();

    // Animate wave effect based on time
    for (let i = 0; i < mesh.current.geometry.attributes.position.count; i++) {
      const x = mesh.current.geometry.attributes.position.getX(i);
      const y = mesh.current.geometry.attributes.position.getY(i);

      // Create wave pattern
      const waveZ =
        Math.sin(x * 1.5 + t * 0.5) * 0.15 + Math.sin(y * 2 + t * 0.5) * 0.15;

      mesh.current.geometry.attributes.position.setZ(i, waveZ);
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  // Wave color changes with scroll
  const color =
    scrollY > 100 ? "#4f46e5" : scrollY > 50 ? "#6366f1" : "#818cf8";

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 4, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[15, 15, 48, 48]} />
      <meshPhongMaterial
        color={color}
        wireframe={true}
        shininess={100}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

// Scene component containing all 3D elements
const Scene = ({ scrollY }: { scrollY: number }) => {
  const mouseRef = useRef<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to Three.js coordinates
      mouseRef.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0,
      ];
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate opacity based on scroll (fade out as user scrolls down)
  const opacity = Math.max(0, 1 - scrollY / 600);
  const lightIntensity = Math.max(0.2, 1 - scrollY / 700);

  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        opacity,
        transition: "opacity 0.3s ease-out",
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]} // Responsive pixel ratio
    >
      {/* Base lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.2} />

      {/* Breathing point light that changes with scroll */}
      <pointLight
        position={[0, 0, 3]}
        intensity={lightIntensity}
        color="#6366f1"
        distance={10}
      />

      {/* 3D wave effect background */}
      <WaveEffect scrollY={scrollY} />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4,
            (Math.random() - 2) * 3,
          ]}
          color={
            i % 5 === 0
              ? "#6366f1" // Primary accent
              : i % 5 === 1
              ? "#8b5cf6" // Tertiary accent
              : i % 5 === 2
              ? "#06b6d4" // Secondary accent
              : i % 5 === 3
              ? "#4f46e5" // Accent dark
              : "#a78bfa" // Tertiary light
          }
          speed={0.3 + Math.random() * 0.7}
          size={0.05 + Math.random() * 0.15}
          mouseRef={mouseRef}
        />
      ))}

      {/* Controls for orbit (disabled in production) */}
      {process.env.NODE_ENV === "development" && <OrbitControls />}

      {/* Performance optimizations */}
      <Preload all />
    </Canvas>
  );
};

// Main exported component
interface NavbarBackgroundProps {
  scrollY: number;
}

const NavbarBackground = ({ scrollY }: NavbarBackgroundProps) => {
  return (
    <div className="absolute inset-0 h-28 overflow-hidden pointer-events-none">
      <Scene scrollY={scrollY} />
    </div>
  );
};

export default NavbarBackground;
