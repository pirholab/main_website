"use clients"
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { useSpring, animated } from "@react-spring/three";
import Part from "./Particles";
import gsap from "gsap";
import Car from "./Car";

// Function to check if two bounding boxes overlap
function isOverlap(pos1, size1, pos2, size2) {
  return (
    Math.abs(pos1[0] - pos2[0]) < (size1[0] + size2[0]) / 2 &&
    Math.abs(pos1[2] - pos2[2]) < (size1[2] + size2[2]) / 2
  );
}

function Building({ position, scale }) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[BUILDING_SIZE, scale[1], BUILDING_SIZE]} />
      <meshStandardMaterial
        // roughness={0.5}
        // metalness={0.5}
        color={0x00000}
      />
    </mesh>
  );
}

function Buildings() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const placedBuildings = [];
    const occupiedPositions = [];

    function placeBuilding() {
      let x, z;
      let height = Math.random() * 6; // Maintain heights
      let tries = 0;

      do {
        x = (Math.random() * GRID_SIZE - GRID_SIZE / 2) * BUILDING_SIZE;
        z = (Math.random() * GRID_SIZE - GRID_SIZE / 2) * BUILDING_SIZE;

        const newPos = [x, height / 2, z];
        const size = [BUILDING_SIZE, height, BUILDING_SIZE];

        // Check for overlaps
        const overlap = occupiedPositions.some(({ pos, size: existingSize }) =>
          isOverlap(newPos, size, pos, existingSize)
        );

        if (!overlap) {
          occupiedPositions.push({ pos: newPos, size });
          return { position: newPos, scale: [1, height, 1] };
        }

        tries++;
      } while (tries < 10);

      return null; // Return null if no valid position found after tries
    }

    for (let i = 0; i < 100; i++) {
      const building = placeBuilding();
      if (building) {
        placedBuildings.push(building);
      }
    }

    setBuildings(placedBuildings);
  }, []); // Empty dependency array ensures this runs only once after the initial render

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

function Floor({ color }) {
  return (
    <mesh
      receiveShadow
      position={[0, -0.01, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      opacity={0.9}
    >
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial color={0x00000} transparent opacity={0.5} />
    </mesh>
  );
}

const Background = ({ color }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(color);
  }, [color, scene]);

  return null;
};

// Function to add particle effect

// Constants for grid and building sizes
const GRID_SIZE = 10;
const BUILDING_SIZE = 7;

function City({ children, mouse }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    groupRef.current.rotation.y += 0.0001; // Continuous rotation to keep animation going

    // Adjust rotation based on mouse position with noticeable changes
    const rotationSpeed = 0.002; // Slower but noticeable rotation speed
    if (mouse.current.x < 0) {
      groupRef.current.rotation.y -= rotationSpeed;
    } else if (mouse.current.x > 0) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function Scene({ mouse }) {
  return (
    <>
      {/* <ambientLight intensity={7} /> */}
      <directionalLight
        // position={[pA.x, pA.y, pA.z]}
        position={[41, 41, 7.3]}
        // intensity={pA.intensity}
        intensity={5.3}
        castShadow
      />
      <City mouse={mouse}>
        <Buildings />
        <Part />
        <Car />
        <Floor color={"#00000"} />
        <gridHelper
          args={[120, 20, 0x000000, 0x000000]} // Reduced number of divisions from 120 to 20
          position={[0, 0, 0]}
          // transparent={true}
          opacity={0.9} // Blackish transparent effect
        />
      </City>
      <Background color="#228be6" />

      <fog attach="fog" args={["#228be6", 50, 100]} />
      <OrbitControls enableZoom={false} enableRotate={false} />
    </>
  );
}

// -30,56,-60
const CAMERA_MIN = 7;
const CAMERA_MAX = 57;
const DELTA_MIN = -0.1;
const DELTA_MAX = 0.02;
const SMOOTHING_FACTOR = 0.1; // Adjust this value to control smoothness

let currentY = 57; // This should be a variable that persists between frames
function changeVal(num) {
  return num;
}

function CameraAnimation({ mouse }) {
  const camRef = useRef();
  useFrame(() => {
    // Calculate deltaY based on mouse position
    const deltaY = (mouse.current.y - 0.5) * 0.05;

    // Reverse direction: start from 57 and move towards 7
    const targetY = THREE.MathUtils.clamp(
      camRef.current.position.y - deltaY,
      CAMERA_MIN,
      CAMERA_MAX
    );
    // Use currentY to update your camera position
    camRef.current.position.y = targetY;

    // console.log(
    //   camRef.current.position.y,
    //   camRef.current.position.y - deltaY,
    //   deltaY
    // );
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      position={[-30, 67, -67]}
      // rotation={[10, 0, 0]}
      mouse={mouse}
      // position={[pA.x, pA.y, pA.z]}
      // rotation={[pR.x, pR.y, pR.z]}
      fov={30}
      near={0.1}
      far={1000}
    />
  );
}

export default function CityFuture({ canvaRef }) {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      ref={canvaRef}
      shadows
      onMouseMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }}
      className={"w-[100%] rounded-[15px] sm:rounded-[30px] "}
      style={{ height: "100%" }}
    >
      <CameraAnimation mouse={mouse} />
      <Scene mouse={mouse} />
    </Canvas>
  );
}
