"use client"
import React, { useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const CustomGrid = ({ size = 60, divisions = 120 }) => {
  const { scene } = useThree();

  // Create the grid lines
  const gridLines = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: 0xaaaaaa });

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = -size; i <= size; i += size / divisions) {
      // Horizontal lines
      vertices.push(-size, 0, i);
      vertices.push(size, 0, i);
      // Vertical lines
      vertices.push(i, 0, -size);
      vertices.push(i, 0, size);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    return new THREE.LineSegments(geometry, material);
  }, [size, divisions]);

  useFrame(() => {
    // Optionally, you can animate the grid or add effects here
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[size * 2, size * 2]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>
      <primitive object={gridLines} />
    </group>
  );
};

export default CustomGrid;
