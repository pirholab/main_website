import { animated, useSpring } from "@react-spring/three";
import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
    Sky
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Function to check if two bounding boxes overlap
function isOverlap(pos1, size1, pos2, size2) {
  return (
    Math.abs(pos1[0] - pos2[0]) < (size1[0] + size2[0]) / 2 &&
    Math.abs(pos1[2] - pos2[2]) < (size1[2] + size2[2]) / 2
  );
}

// Green color palette
const GREEN_COLORS = [
  "#1a5d1a", // primary
  "#39b54a", // secondary
  "#8eff8e", // accent
  "#0a3a0a", // dark
  "#74c365", // green medium
];

function GreenParticles({ count = 300 }) {
  const points = useRef();
  
  // Generate initial positions for particles
  const positions = useRef(
    Array.from({ length: count }, () => [
      THREE.MathUtils.randFloatSpread(60),
      THREE.MathUtils.randFloatSpread(60),
      THREE.MathUtils.randFloatSpread(60),
    ]).flat()
  );
  
  // Generate velocities for particle animation
  const velocities = useRef(
    Array.from({ length: count }, () => [
      THREE.MathUtils.randFloatSpread(0.05),
      THREE.MathUtils.randFloatSpread(0.05),
      THREE.MathUtils.randFloatSpread(0.05),
    ])
  );

  useFrame(() => {
    const positionArray = points.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions based on velocities
      positionArray[i3] += velocities.current[i][0];
      positionArray[i3 + 1] += velocities.current[i][1];
      positionArray[i3 + 2] += velocities.current[i][2];
      
      // Reset particles that go out of bounds
      if (Math.abs(positionArray[i3]) > 30) velocities.current[i][0] *= -1;
      if (Math.abs(positionArray[i3 + 1]) > 30) velocities.current[i][1] *= -1;
      if (Math.abs(positionArray[i3 + 2]) > 30) velocities.current[i][2] *= -1;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.current.length / 3}
          array={new Float32Array(positions.current)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#8eff8e"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Building({ position, scale }) {
  // Generate a random green color for each building
  const color = GREEN_COLORS[Math.floor(Math.random() * GREEN_COLORS.length)];
  
  // Create a pulsing animation
  const [spring, api] = useSpring(() => ({ 
    scale: [scale[0], scale[1], scale[2]],
    config: { mass: 1, tension: 20, friction: 10 }
  }));
  
  useEffect(() => {
    // Random interval for the pulse animation
    const interval = 5000 + Math.random() * 5000;
    
    const timer = setInterval(() => {
      // Pulse the building height slightly
      api.start({ 
        scale: [
          scale[0], 
          scale[1] * (1 + Math.random() * 0.15), 
          scale[2]
        ] 
      });
      
      // Then return to original size
      setTimeout(() => {
        api.start({ scale: [scale[0], scale[1], scale[2]] });
      }, 1000);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <animated.mesh 
      position={position} 
      scale={spring.scale}
      castShadow 
      receiveShadow
    >
      <boxGeometry />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </animated.mesh>
  );
}

function Buildings({ count = 100 }) {
  const [buildings, setBuildings] = useState([]);
  const GRID_SIZE = 15;
  const BUILDING_SIZE = 1;

  useEffect(() => {
    const placedBuildings = [];
    const occupiedPositions = [];

    function placeBuilding() {
      let x, z;
      let height = 0.5 + Math.random() * 6; // Varying heights
      let width = 0.5 + Math.random() * 1.5; // Varying widths
      let depth = 0.5 + Math.random() * 1.5; // Varying depths
      let tries = 0;

      do {
        x = (Math.random() * GRID_SIZE - GRID_SIZE / 2) * BUILDING_SIZE;
        z = (Math.random() * GRID_SIZE - GRID_SIZE / 2) * BUILDING_SIZE;

        const newPos = [x, height / 2, z];
        const size = [width, height, depth];

        // Check for overlaps
        const overlap = occupiedPositions.some(({ pos, size: existingSize }) =>
          isOverlap(newPos, size, pos, existingSize)
        );

        if (!overlap) {
          occupiedPositions.push({ pos: newPos, size });
          return { position: newPos, scale: [width, height, depth] };
        }

        tries++;
      } while (tries < 10);

      return null; // Return null if no valid position found after tries
    }

    for (let i = 0; i < count; i++) {
      const building = placeBuilding();
      if (building) {
        placedBuildings.push(building);
      }
    }

    setBuildings(placedBuildings);
  }, []);

  return (
    <>
      {buildings.map((building, index) => (
        <Building
          key={index}
          position={building.position}
          scale={building.scale}
        />
      ))}
    </>
  );
}

function Floor() {
  return (
    <mesh
      receiveShadow
      position={[0, -0.01, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[100, 100, 100, 100]} />
      <meshStandardMaterial
        color="#0a3a0a"
        metalness={0.2}
        roughness={0.8}
        envMapIntensity={0.5}
      >
        <gridHelper
          args={[100, 100, "#39b54a", "#0a3a0a"]}
          position={[0, 0.02, 0]}
        />
      </meshStandardMaterial>
    </mesh>
  );
}

function GreenLines() {
  const linesRef = useRef([]);
  const groupRef = useRef();
  
  useEffect(() => {
    // Create a set of moving lines
    const createLines = () => {
      const material = new THREE.LineBasicMaterial({ color: "#8eff8e" });
      
      for (let i = 0; i < 100; i++) {
        const points = [];
        const x = Math.random() * 40 - 20;
        const z = Math.random() * 40 - 20;
        const height = Math.random() * 5 + 1;
        
        points.push(new THREE.Vector3(x, 0, z));
        points.push(new THREE.Vector3(x, height, z));
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        
        linesRef.current.push({
          line,
          maxHeight: height,
          speed: 0.01 + Math.random() * 0.05,
          direction: 1,
        });
        
        groupRef.current.add(line);
      }
    };
    
    if (groupRef.current) {
      createLines();
    }
    
    return () => {
      linesRef.current.forEach(({ line }) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      linesRef.current = [];
    };
  }, []);
  
  useFrame(() => {
    linesRef.current.forEach(({ line, maxHeight, speed, direction }, index) => {
      const points = line.geometry.attributes.position.array;
      
      // Animate the height of the line
      points[4] += speed * direction;
      
      // Change direction when reaching bounds
      if (points[4] >= maxHeight || points[4] <= 0) {
        linesRef.current[index].direction *= -1;
      }
      
      line.geometry.attributes.position.needsUpdate = true;
    });
  });
  
  return <group ref={groupRef} />;
}

function Scene({ mouse }) {
  const groupRef = useRef();
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate scene based on mouse position
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsedTime * 0.05 + mouse.current.x * 0.1;
      groupRef.current.rotation.x = mouse.current.y * 0.05;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#8eff8e" />
      
      <group ref={groupRef}>
        <Buildings count={150} />
        <GreenParticles count={500} />
        <GreenLines />
        <Floor />
      </group>
      
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
        mieCoefficient={0.001}
        mieDirectionalG={0.99}
        rayleigh={0.5}
        turbidity={10}
      />
      <fog attach="fog" args={["#0a3a0a", 10, 50]} />
      <Environment preset="night" />
    </>
  );
}

function CameraAnimation({ mouse }) {
  const camRef = useRef();
  
  useFrame(() => {
    if (camRef.current) {
      // Smooth camera movement based on mouse position
      camRef.current.position.y = 10 + mouse.current.y * 2;
      camRef.current.lookAt(0, 0, 0);
    }
  });
  
  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      position={[15, 10, 15]}
      fov={35}
      near={0.1}
      far={1000}
    />
  );
}

export default function GreenCity() {
  const mouse = useRef({ x: 0, y: 0 });
  const canvasRef = useRef();
  
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas
        ref={canvasRef}
        shadows
        onMouseMove={(e) => {
          mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }}
        className="w-full h-full"
      >
        <CameraAnimation mouse={mouse} />
        <Scene mouse={mouse} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
} 