import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

// Individual floating object
function FloatingObject({ position, scale, rotationSpeed, color }) {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Floating movement
    mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.5;
    
    // Rotation
    mesh.current.rotation.x += rotationSpeed[0];
    mesh.current.rotation.y += rotationSpeed[1];
    mesh.current.rotation.z += rotationSpeed[2];
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1} 
      />
    </mesh>
  );
}

// Different object types
function FloatingCube({ position, scale, rotationSpeed, color }) {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.5;
    mesh.current.rotation.x += rotationSpeed[0];
    mesh.current.rotation.y += rotationSpeed[1];
    mesh.current.rotation.z += rotationSpeed[2];
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.7}
        roughness={0.3}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function FloatingSphere({ position, scale, rotationSpeed, color }) {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.5;
    mesh.current.rotation.x += rotationSpeed[0];
    mesh.current.rotation.y += rotationSpeed[1];
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.5}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function GlowingParticles() {
  const particles = useRef();
  const count = 50;
  
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    sizes[i] = Math.random() * 0.5 + 0.1;
  }
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (particles.current) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Make particles float up slowly
        particles.current.geometry.attributes.position.array[i3 + 1] += Math.sin(time + i) * 0.01;
        
        // Reset particles that go too high
        if (particles.current.geometry.attributes.position.array[i3 + 1] > 5) {
          particles.current.geometry.attributes.position.array[i3 + 1] = -5;
        }
      }
      
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        sizeAttenuation
        transparent
        color="#8eff8e"
        opacity={0.8}
      />
    </points>
  );
}

function Scene() {
  // Green-themed colors
  const colors = [
    "#1a5d1a", // primary
    "#39b54a", // secondary
    "#8eff8e", // accent
    "#74c365", // medium green
  ];
  
  const getRandomGreenColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8eff8e" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Create multiple floating objects */}
      {Array.from({ length: 5 }).map((_, i) => (
        <FloatingObject
          key={`ico-${i}`}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}
          scale={[Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5]}
          rotationSpeed={[
            Math.random() * 0.01 - 0.005,
            Math.random() * 0.01 - 0.005,
            Math.random() * 0.01 - 0.005
          ]}
          color={getRandomGreenColor()}
        />
      ))}
      
      {Array.from({ length: 5 }).map((_, i) => (
        <FloatingCube
          key={`cube-${i}`}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}
          scale={[Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.3]}
          rotationSpeed={[
            Math.random() * 0.01 - 0.005,
            Math.random() * 0.01 - 0.005,
            Math.random() * 0.01 - 0.005
          ]}
          color={getRandomGreenColor()}
        />
      ))}
      
      {Array.from({ length: 5 }).map((_, i) => (
        <FloatingSphere
          key={`sphere-${i}`}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}
          scale={[Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2, Math.random() * 0.4 + 0.2]}
          rotationSpeed={[
            Math.random() * 0.01 - 0.005,
            Math.random() * 0.01 - 0.005,
            0
          ]}
          color={getRandomGreenColor()}
        />
      ))}
      
      <GlowingParticles />
      <Environment preset="sunset" />
    </>
  );
}

const GreenFloatingAnimation = ({ height = "400px", className = "" }) => {
  return (
    <div style={{ height, width: "100%" }} className={className}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default GreenFloatingAnimation; 