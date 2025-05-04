"use client";

import {
  MeshDistortMaterial,
  OrbitControls,
  Preload,
  useCursor,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Color, Group, MathUtils, Mesh, Vector3 } from "three";

interface ParticleProps {
  position: number[];
  color: string;
  speed?: number;
  size?: number;
  mouseRef: React.RefObject<[number, number, number]>;
  scrollY: number;
}

// Particle component that responds to mouse movement
const FloatingParticle = ({
  position,
  color,
  speed = 1,
  size = 0.2,
  mouseRef,
  scrollY,
}: ParticleProps) => {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const initialPosition = useRef(position.slice());
  const [sparkle, setSparkle] = useState(false);
  const particleLife = useRef(Math.random() * 100); // Used for varied behavior

  // Enable cursor pointer when hovering
  useCursor(hovered);

  // Trigger sparkle effect every few seconds and based on scroll events
  useEffect(() => {
    // Regular random sparkling
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setSparkle(true);
        setTimeout(() => setSparkle(false), 300);
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  // Additional sparkle on scroll change
  useEffect(() => {
    // Occasionally sparkle when scrolling - more often with faster scrolling
    const scrollChange = Math.abs(scrollY - previousScrollY.current);
    previousScrollY.current = scrollY;

    if (scrollChange > 10 && Math.random() > 0.7) {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 200 + Math.random() * 300);
    }
  }, [scrollY]);

  // Store previous scroll position for velocity calculation
  const previousScrollY = useRef(0);

  useFrame((state) => {
    if (!mesh.current) return;

    // Calculate base oscillation movement
    const t = state.clock.getElapsedTime() * speed;
    particleLife.current += 0.01;

    // Base movement pattern varies based on particle "life"
    const movementPattern = Math.sin(particleLife.current * 0.1);

    // Add some randomness to movement
    const noise = Math.sin(t * 0.5) * 0.05;

    // Calculate scroll-influenced movement - particles move more when scrolling
    const scrollInfluence = Math.min(
      0.1,
      Math.abs(scrollY - previousScrollY.current) * 0.001
    );
    const scrollDirection = Math.sign(scrollY - previousScrollY.current);

    // Apply vertical movement with scroll influence
    mesh.current.position.y =
      position[1] +
      Math.sin(t) * 0.1 +
      noise +
      scrollDirection * scrollInfluence * (1 + movementPattern);

    // Apply horizontal movement with oscillation
    mesh.current.position.x =
      position[0] + Math.cos(t * 0.7) * 0.05 * (1 + scrollInfluence * 5);

    // If mouse position exists, particles are attracted to it slightly
    if (mouseRef.current) {
      const mouseDistance = new Vector3(
        mouseRef.current[0] - mesh.current.position.x,
        mouseRef.current[1] - mesh.current.position.y,
        0
      );

      // Mouse attraction increases with scroll (more responsive as you scroll more)
      const scrollFactor = 1 + Math.min(1, scrollY / 500) * 0.5;

      // Apply force if close enough to mouse - range increases with scroll
      const mouseAttractionRadius = 3 + Math.min(2, scrollY / 300);

      if (mouseDistance.length() < mouseAttractionRadius) {
        const forceStrength = hovered
          ? 0.04 * scrollFactor
          : 0.02 * scrollFactor;
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

    // Dynamic rotation based on movement and scroll
    mesh.current.rotation.x = t * 0.2 + scrollInfluence * 2;
    mesh.current.rotation.z = t * 0.1;
    mesh.current.rotation.y = Math.sin(t * 0.3) * 0.2 + scrollInfluence;

    // Scale up when hovered or sparkling or scrolling significantly
    const scrollScale = Math.min(
      0.3,
      Math.abs(scrollY - previousScrollY.current) * 0.005
    );
    const targetScale = hovered
      ? size * 1.6
      : sparkle
      ? size * 1.3
      : size * (1 + scrollScale);

    mesh.current.scale.x =
      mesh.current.scale.y =
      mesh.current.scale.z =
        MathUtils.lerp(mesh.current.scale.x, targetScale, 0.1);
  });

  // Color intensifies with scroll
  const scrollColorIntensity = Math.min(1.5, 1 + scrollY / 1000);
  const particleColor = new Color(color).multiplyScalar(scrollColorIntensity);

  return (
    <>
      {/* Create a light inside the particle for glow effect */}
      <pointLight
        distance={2 + Math.min(3, scrollY / 300)}
        intensity={
          hovered ? 1 : sparkle ? 0.8 : 0.4 + Math.min(0.4, scrollY / 1000)
        }
        color={particleColor}
      />

      <mesh
        ref={mesh}
        position={[position[0], position[1], position[2]]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, hovered ? 2 : 1]} />
        <MeshDistortMaterial
          color={particleColor}
          speed={3 + Math.min(2, scrollY / 500)}
          distort={
            hovered ? 0.5 : sparkle ? 0.4 : 0.2 + Math.min(0.3, scrollY / 1000)
          }
          roughness={0.4}
          metalness={0.8}
          emissive={particleColor.clone().multiplyScalar(0.8)}
          emissiveIntensity={
            hovered ? 2.5 : sparkle ? 2 : 1 + Math.min(1, scrollY / 500)
          }
          toneMapped={false}
        />
      </mesh>
    </>
  );
};

// Wave effect component
const WaveEffect = ({ scrollY }: { scrollY: number }) => {
  const mesh = useRef<Mesh>(null);
  const mousePosition = useRef<[number, number]>([0, 0]);

  // Add mouse movement effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = [
        event.clientX / window.innerWidth,
        event.clientY / window.innerHeight,
      ];
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const t = clock.getElapsedTime();

    // Calculate wave intensity based on scroll - more intense as we scroll
    const scrollIntensity = Math.min(1, scrollY / 500) * 0.1 + 0.15;

    // Factor in mouse position for directional waves
    const mouseXInfluence = (mousePosition.current[0] - 0.5) * 0.3;
    const mouseYInfluence = (mousePosition.current[1] - 0.5) * 0.3;

    // Animate wave effect based on time
    for (let i = 0; i < mesh.current.geometry.attributes.position.count; i++) {
      const x = mesh.current.geometry.attributes.position.getX(i);
      const y = mesh.current.geometry.attributes.position.getY(i);

      // Create dynamic wave pattern influenced by mouse and scroll
      const waveX =
        Math.sin(x * 1.5 + t * 0.5 + mouseXInfluence) * scrollIntensity;
      const waveY =
        Math.sin(y * 2 + t * 0.5 + mouseYInfluence) * scrollIntensity;
      const waveZ = waveX + waveY;

      mesh.current.geometry.attributes.position.setZ(i, waveZ);
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Subtly rotate based on mouse position
    mesh.current.rotation.x = -Math.PI / 4 + mouseYInfluence * 0.1;
    mesh.current.rotation.y = mouseXInfluence * 0.1;
  });

  // Wave color changes with scroll - more vibrant colors to start, deeper as we scroll
  const color =
    scrollY > 500
      ? "#4338ca" // Deep indigo at further scroll
      : scrollY > 300
      ? "#4f46e5" // Indigo at medium scroll
      : scrollY > 150
      ? "#6366f1" // Primary accent at light scroll
      : "#818cf8"; // Light accent at top

  // Increase detail with scroll
  const resolution = 64 + Math.min(32, Math.floor(scrollY / 50));

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 4, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, resolution, resolution]} />
      <meshPhongMaterial
        color={color}
        wireframe={true}
        shininess={100 + scrollY * 0.1}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

// Scene component containing all 3D elements
const Scene = ({ scrollY }: { scrollY: number }) => {
  const mouseRef = useRef<[number, number, number]>([0, 0, 0]);
  const previousY = useRef(0);
  const scrollVelocity = useRef(0);
  const targetRotation = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<Group>(null);

  // Generate random particle positions only once and store in a ref to prevent recreation on re-renders
  const particleProps = useRef<
    Array<{
      position: number[];
      color: string;
      speed: number;
      size: number;
    }>
  >([]);

  // Initialize particle properties only once
  useEffect(() => {
    if (particleProps.current.length === 0) {
      const colors = [
        "#6366f1", // Primary accent
        "#8b5cf6", // Tertiary accent
        "#06b6d4", // Secondary accent
        "#4f46e5", // Accent dark
        "#a78bfa", // Tertiary light
      ];

      // Create a stable set of particles with good distribution
      particleProps.current = Array.from({ length: 40 }).map((_, i) => {
        // Use a more deterministic approach for better distribution
        const angle = (i / 40) * Math.PI * 2; // Distribute around a circle
        const radiusVariation = 0.7 + Math.random() * 0.3; // Some randomness but not too much
        const radius = 7 * radiusVariation;

        return {
          position: [
            Math.cos(angle) * radius * (1 + Math.random() * 0.5),
            Math.sin(angle) * radius * (1 + Math.random() * 0.5),
            -5 + Math.random() * 10,
          ],
          color: colors[i % 5],
          speed: 0.15 + Math.random() * 0.4, // Slower speed for more stability
          size: 0.05 + Math.random() * 0.15,
        };
      });
    }
  }, []);

  // Calculate scroll velocity with damping for smoother transitions
  useEffect(() => {
    const scrollDiff = scrollY - previousY.current;
    scrollVelocity.current = scrollDiff * 0.005; // Reduced multiplier for stability
    previousY.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to Three.js coordinates with reduced sensitivity
      mouseRef.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0,
      ];

      // Calculate target rotation based on mouse position with reduced sensitivity
      targetRotation.current = {
        x: (event.clientY / window.innerHeight - 0.5) * 0.05,
        y: (event.clientX / window.innerWidth - 0.5) * 0.05,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotate entire scene based on mouse position with smoother transitions
  useFrame((state) => {
    if (sceneRef.current) {
      // Smoother rotation with lower lerp factor
      sceneRef.current.rotation.x = MathUtils.lerp(
        sceneRef.current.rotation.x,
        targetRotation.current.x,
        0.01
      );
      sceneRef.current.rotation.y = MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetRotation.current.y,
        0.01
      );

      // Add subtle movement from scroll velocity
      sceneRef.current.position.y = MathUtils.lerp(
        sceneRef.current.position.y,
        scrollVelocity.current,
        0.05
      );

      // Gradually reset scroll velocity
      scrollVelocity.current = MathUtils.lerp(scrollVelocity.current, 0, 0.05);
    }
  });

  // Calculate lighting intensity based on scroll
  const lightIntensity = Math.max(0.3, 1 - scrollY / 1000);

  // Inverse scale based on scroll - start small, grow as user scrolls
  // Start at 0.7 scale and grow up to 1.3 at maximum scroll
  const maxScaleFactor = 1.3;
  const minScaleFactor = 0.7;
  const scrollProgress = Math.min(1, scrollY / 1500);
  const backgroundScale =
    minScaleFactor + (maxScaleFactor - minScaleFactor) * scrollProgress;

  // Move scene closer as we scroll
  const zPositionBase = -2;
  const zOffset = scrollProgress * 3; // Reduced from 7 to 3 units for subtler effect

  return (
    <>
      {/* Base lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />

      {/* Breathing point light that changes with scroll */}
      <pointLight
        position={[0, 2, 5]}
        intensity={lightIntensity}
        color="#6366f1"
        distance={15}
      />

      {/* Main scene group with zoom-in effect */}
      <group
        ref={sceneRef}
        scale={backgroundScale}
        position={[0, 0, zPositionBase + zOffset]} // Move closer when scrolling
      >
        {/* 3D wave effect background */}
        <WaveEffect scrollY={scrollY} />

        {/* Floating particles */}
        {particleProps.current.map((props, i) => (
          <FloatingParticle
            key={i}
            position={props.position}
            color={props.color}
            speed={props.speed}
            size={props.size}
            mouseRef={mouseRef}
            scrollY={scrollY}
          />
        ))}
      </group>

      {/* Controls for orbit (disabled in production) */}
      {process.env.NODE_ENV === "development" && <OrbitControls />}

      {/* Performance optimizations */}
      <Preload all />
    </>
  );
};

// Main exported component
interface HeroBackgroundProps {
  scrollY: number;
}

// Main scene wrapper with parallax applied as a CSS transform
const HeroBackground = ({ scrollY }: HeroBackgroundProps) => {
  // Use a subtle parallax effect with easing
  const parallaxY = -scrollY * 0.03; // Reduced intensity for smoother effect

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{
        transform: `translate3d(0,${parallaxY}px,0)`,
        WebkitTransform: `translate3d(0,${parallaxY}px,0)`,
        transition: "transform 0.01s linear", // Extremely short transition for smooth movement
      }}
    >
      {/* Using a simple div wrapper rather than hooks outside Canvas */}
      <div className="w-full h-full absolute inset-0">
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            opacity: Math.max(0.2, 1 - scrollY / 900),
            transform: "translate3d(0,0,0)",
            WebkitTransform: "translate3d(0,0,0)",
          }}
          camera={{ position: [0, 0, 8], fov: 75 }}
          dpr={[0.6, 1.5]} // Further reduced DPR for performance
          frameloop="demand"
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.3 }} // Reduced minimum performance threshold
        >
          <Scene scrollY={scrollY} />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroBackground;
