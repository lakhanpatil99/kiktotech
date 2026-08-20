"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import type { QualitySettings } from "@/config/quality";

function TechCore() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <Icosahedron ref={mesh} args={[1.5, 1]}>
        <meshStandardMaterial
          color="#0a2a3a"
          emissive="#22e3d6"
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.25}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
}

/** Interactive hero scene. Props come from the quality tier. */
export default function HeroScene({ quality }: { quality: QualitySettings }) {
  return (
    <Canvas
      dpr={quality.dpr}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: quality.antialias, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#22e3d6" />
      <pointLight position={[-6, -4, 2]} intensity={0.8} color="#3b82f6" />
      <TechCore />
      <ParticleField count={quality.particleCount} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}
