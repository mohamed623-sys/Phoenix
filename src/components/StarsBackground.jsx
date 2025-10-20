import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

export default function StarsBackground() {
  const canvasRef = useRef();
  return (
    <Canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0">
      <Stars radius={150} depth={100} count={10000} factor={7} fade />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.15}
      />
    </Canvas>
  );
}
