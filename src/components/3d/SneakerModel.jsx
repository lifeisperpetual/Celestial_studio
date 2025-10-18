import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function SneakerModel({ color, material, ...props }) {
  const groupRef = useRef();
  
  // Load the GLB file
  const { scene } = useGLTF('/assets/Untitled.glb');
  
  // Create materials for all colors with material variations
  const materials = useMemo(() => {
    const getMaterialProps = (baseColor) => {
      switch (material) {
        case 'leather': // Cotton
          return {
            color: baseColor,
            metalness: 0.0,
            roughness: 0.95,
          };
        case 'canvas': // Nylon
          return {
            color: baseColor,
            metalness: 0.2,
            roughness: 0.3,
          };
        case 'mesh': // Leather
          return {
            color: baseColor,
            metalness: 0.15,
            roughness: 0.5,
            envMapIntensity: 0.8,
          };
        case 'suede': // Synthetic
          return {
            color: baseColor,
            metalness: 0.4,
            roughness: 0.2,
          };
        default:
          return {
            color: baseColor,
            metalness: 0.1,
            roughness: 0.8,
          };
      }
    };

    return {
      violet: new THREE.MeshStandardMaterial(getMaterialProps('#8b5cf6')),
      fuchsia: new THREE.MeshStandardMaterial(getMaterialProps('#ec4899')),
      cyan: new THREE.MeshStandardMaterial(getMaterialProps('#06b6d4')),
      emerald: new THREE.MeshStandardMaterial(getMaterialProps('#10b981')),
      orange: new THREE.MeshStandardMaterial(getMaterialProps('#f97316')),
      red: new THREE.MeshStandardMaterial(getMaterialProps('#ef4444')),
      white: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        metalness: 0.1,
        roughness: 0.8,
      })
    };
  }, [material]);

  // Clone the scene and apply materials
  const clonedScene = useMemo(() => {
    if (scene) {
      const cloned = scene.clone();
      
      // Apply materials based on mesh names
      cloned.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          const meshName = child.name.toLowerCase();
          
          // Material assignment based on selected color
          switch (color) {
            case '#8b5cf6': // Violet
              if (meshName.includes('sole') || meshName.includes('laces')) {
                child.material = materials.white;
              } else if (meshName.includes('lacesloha') || meshName.includes('main')) {
                child.material = materials.violet;
              } else {
                child.material = materials.white;
              }
              break;

            case '#ec4899': // Fuchsia
              if (meshName.includes('sole') || meshName.includes('laces')) {
                child.material = materials.white;
              } else if (meshName.includes('lacesloha') || meshName.includes('main')) {
                child.material = materials.fuchsia;
              } else {
                child.material = materials.white;
              }
              break;

            case '#06b6d4': // Cyan
              if (meshName.includes('sole') || meshName.includes('laces')) {
                child.material = materials.white;
              } else if (meshName.includes('lacesloha') || meshName.includes('main')) {
                child.material = materials.cyan;
              } else {
                child.material = materials.white;
              }
              break;

            case '#10b981': // Emerald
              if (meshName.includes('sole') || meshName.includes('laces')) {
                child.material = materials.white;
              } else if (meshName.includes('lacesloha') || meshName.includes('main')) {
                child.material = materials.emerald;
              } else {
                child.material = materials.white;
              }
              break;

            case '#f97316': // Orange
              if (meshName.includes('sole') || meshName.includes('laces')) {
                child.material = materials.white;
              } else if (meshName.includes('lacesloha') || meshName.includes('main')) {
                child.material = materials.orange;
              } else {
                child.material = materials.white;
              }
              break;

            case '#ef4444': // Red
              if (meshName.includes('sole') || meshName.includes('laces')) {
                child.material = materials.white;
              } else if (meshName.includes('lacesloha') || meshName.includes('main')) {
                child.material = materials.red;
              } else {
                child.material = materials.white;
              }
              break;

            default:
              child.material = materials.white;
              break;
          }
          
          if (child.geometry) {
            child.geometry.computeBoundingSphere();
            child.geometry.computeBoundingBox();
          }
        }
      });
      
      return cloned;
    }
    return null;
  }, [scene, color, materials]);

  return (
    <group {...props} ref={groupRef}>
      {clonedScene && <primitive object={clonedScene} scale={[1, 1, 1]} />}
    </group>
  );
}

// Preload the GLB file
useGLTF.preload('/assets/Untitled.glb');
