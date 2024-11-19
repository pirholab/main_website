import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function MovingLines() {
  const groupRef = useRef();
  const numLines = 20; // Increased number of lines
  const linesRef = useRef([]);

  useEffect(() => {
    // Create a line mesh
    const createLine = (x, z, direction) => {
      const lineGeometry = new THREE.PlaneGeometry(1, 0.1);
      const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);

      lineMesh.position.set(x, 5, z);
      if (direction === "north-south" || direction === "south-north") {
        lineMesh.rotation.y = Math.PI / 2;
      }

      return lineMesh;
    };

    // Add lines in four directions
    for (let i = 0; i < numLines; i++) {
      const eastWestLine = createLine(
        -30 + i * 5,
        Math.random() * 40 - 20,
        "east-west"
      );
      const westEastLine = createLine(
        30 - i * 5,
        Math.random() * 40 - 20,
        "west-east"
      );
      const northSouthLine = createLine(
        Math.random() * 100 - 30,
        -30 + i * 5,
        "north-south"
      );
      const southNorthLine = createLine(
        Math.random() * 100 - 30,
        30 - i * 5,
        "south-north"
      );

      linesRef.current.push({ mesh: eastWestLine, direction: "east-west" });
      linesRef.current.push({ mesh: westEastLine, direction: "west-east" });
      linesRef.current.push({ mesh: northSouthLine, direction: "north-south" });
      linesRef.current.push({ mesh: southNorthLine, direction: "south-north" });

      groupRef.current.add(eastWestLine);
      groupRef.current.add(westEastLine);
      groupRef.current.add(northSouthLine);
      groupRef.current.add(southNorthLine);
    }
  }, []);

  // Animate the lines to move in their respective directions
  useFrame(() => {
    linesRef.current.forEach(({ mesh, direction }) => {
      const speed = 0.5;
      if (direction === "east-west") {
        mesh.position.x += speed;
        if (mesh.position.x > 40) mesh.position.x = -40;
      } else if (direction === "west-east") {
        mesh.position.x -= speed;
        if (mesh.position.x < -40) mesh.position.x = 40;
      } else if (direction === "north-south") {
        mesh.position.z += speed;
        if (mesh.position.z > 50) mesh.position.z = -50;
      } else if (direction === "south-north") {
        mesh.position.z -= speed;
        if (mesh.position.z < -50) mesh.position.z = 50;
      }
    });
  });

  return <group ref={groupRef}></group>;
}

export default function Car() {
  return (
    <mesh>
      <ambientLight />
      <MovingLines />
      {/* <OrbitControls /> */}
    </mesh>
  );
}
