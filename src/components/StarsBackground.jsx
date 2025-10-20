import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Stars() {
  const mesh = useRef();
  const stars = Array.from({ length: 600 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 120
    ],
    scale: Math.random() * 0.5 + 0.1
  }));

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() / 20;
      mesh.current.rotation.y = clock.getElapsedTime() / 20;
    }
  });

  return (
    <group ref={mesh}>
      {stars.map((s, i) => (
        <mesh key={i} position={s.position} scale={[s.scale, s.scale, s.scale]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="#0ff" />
        </mesh>
      ))}
    </group>
  );
}

export default function StarsBackground() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <Stars />
    </Canvas>
  );
}
