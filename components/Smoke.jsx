import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Smoke = () => {
  const smokeGroup = useRef();

  useEffect(() => {
    const geometry = new THREE.CircleGeometry(0.01, 3);
    const material = new THREE.MeshToonMaterial({ color: 0xFFFF00, side: THREE.DoubleSide });
    const particles = [];

    for (let i = 0; i < 300; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(mathRandom(5), mathRandom(5), mathRandom(5));
      particle.rotation.set(mathRandom(), mathRandom(), mathRandom());
      smokeGroup.current.add(particle);
      particles.push(particle);
    }
  }, []);

  useFrame(() => {
    if (smokeGroup.current) {
      smokeGroup.current.rotation.y += 0.01;
      smokeGroup.current.rotation.x += 0.01;
    }
  });

  const mathRandom = (num = 8) => -Math.random() * num + Math.random() * num;

  return <group ref={smokeGroup} position={[0, 2, 0]} />;
};

export default Smoke;
