import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Attempts to show a GLTF shoe model if modelUrl exists and loads; otherwise
 * falls back to a performant procedural geometry. Keeps a subtle rotation animation.
 */
export default function Shoe({ modelUrl, color = '#2a9eff', small }) {
  const [available, setAvailable] = useState(false);
  const groupRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    let active = true;
    async function check() {
      if (!modelUrl) return setAvailable(false);
      try {
        const res = await fetch(modelUrl, { method: 'HEAD' });
        if (!active) return;
        setAvailable(res.ok);
      } catch {
        if (!active) return;
        setAvailable(false);
      }
    }
    check();
    return () => { active = false; };
  }, [modelUrl]);

  // Rotation + subtle bobbing
  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      const baseY = small ? -0.1 : -0.3;
      groupRef.current.position.y = baseY + Math.sin(timeRef.current * 1.2) * 0.03;
    }
  });

  const scale = small ? 0.9 : 1.2;

  if (available) {
    // Load and render GLTF shoe
    const { scene } = useGLTF(modelUrl, true, true);
    return (
      <group ref={groupRef} scale={scale}>
        <primitive object={scene} />
      </group>
    );
  }

  // Fallback: a glossy shape resembling a product preview
  return (
    <group ref={groupRef} scale={scale}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.28, 0.1, 220, 32]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} envMapIntensity={1} />
      </mesh>
    </group>
  );
}

// Preload helper if you later add a static model path
useGLTF.preload('/assets/models/shoe.glb');
