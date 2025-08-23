import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";

const ARVRPreview = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      <h2 className="text-4xl font-bold mb-10 neon-text">AR/VR Project Preview</h2>
      <Canvas className="w-full h-96 bg-black rounded-xl shadow-2xl">
        <PerspectiveCamera makeDefault position={[3, 3, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh rotation={[0.4, 0.2, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#ff00ff" metalness={0.7} roughness={0.1} />
        </mesh>
        <OrbitControls enableZoom={true} />
        <Html position={[0, -1.5, 0]}>
          <div className="text-white font-bold text-center neon-text">
            YOLOv12 Building Detection Demo
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default ARVRPreview;
