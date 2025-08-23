import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

const MorphShapes = () => {
  return (
    <Canvas className="fixed top-0 left-0 w-full h-full z-0">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[2, 64, 64]} scale={2}>
        <MeshDistortMaterial color="#ff00ff" attach="material" distort={0.5} speed={2} />
      </Sphere>
      <Sphere args={[1.5, 64, 64]} scale={1.5} position={[3, -2, -1]}>
        <MeshDistortMaterial color="#00ffff" attach="material" distort={0.7} speed={3} />
      </Sphere>
    </Canvas>
  );
};

export default MorphShapes;
