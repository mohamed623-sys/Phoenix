import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function Stars() {
  const ref = useRef();
  const count = 6000;
  const positions = new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 200);

  useFrame(() => {
    ref.current.rotation.y += 0.0006;
    ref.current.rotation.x += 0.0003;
  });

  return (
    <group ref={ref}>
      <Points positions={positions}>
        <PointMaterial color="#ffffff" size={0.5} sizeAttenuation />
      </Points>
    </group>
  );
}

export default function StarsBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75 }}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
    >
      <Stars />
    </Canvas>
  );
}
