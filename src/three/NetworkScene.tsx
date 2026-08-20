"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import type { QualitySettings } from "@/config/quality";

/**
 * The Kick To Tech "ecosystem" — a 3D network of nodes (students, mentors,
 * companies, colleges, skills) that connect dynamically. Reacts subtly to the
 * cursor. Node/connection counts scale with the quality tier.
 */
function Network({ nodeCount }: { nodeCount: number }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const { positions, lines } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 5.5,
          (Math.random() - 0.5) * 5,
        ),
      );
    }
    const positions = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });

    // Connect nodes that are near each other.
    const seg: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.1) {
          seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return { positions, lines: new Float32Array(seg) };
  }, [nodeCount]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
    // Subtle parallax toward the cursor.
    group.current.rotation.x += (pointer.y * 0.25 - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (pointer.x * 0.12 - group.current.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.11} color="#5ff0e6" transparent opacity={0.95} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#22e3d6" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function NetworkScene({ quality }: { quality: QualitySettings }) {
  // Node count derived from the quality budget (kept modest for perf).
  const nodeCount = quality.tier === "high" ? 90 : quality.tier === "medium" ? 60 : 36;

  return (
    <Canvas
      dpr={quality.dpr}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: quality.antialias, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <Network nodeCount={nodeCount} />
      <ParticleField count={Math.round(quality.particleCount * 0.5)} />
    </Canvas>
  );
}
