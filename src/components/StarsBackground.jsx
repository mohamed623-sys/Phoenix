import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function InteractiveStars() {
  const ref = useRef();
  useFrame(({ mouse }) => {
    // subtle parallax with mouse
    if (ref.current) {
      ref.current.rotation.y = mouse.x * 0.8;
      ref.current.rotation.x = -mouse.y * 0.2;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={60} count={4000} factor={4} fade speed={1} />
    </group>
  );
}

export default function StarsBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.6} />
        <InteractiveStars />
      </Canvas>
    </div>
  );
}
