import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicShoe({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const holographicMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#8b5cf6') },
      color2: { value: new THREE.Color('#ec4899') },
      color3: { value: new THREE.Color('#06b6d4') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec3 color = mix(color1, color2, sin(vPosition.y * 3.0 + time * 2.0) * 0.5 + 0.5);
        color = mix(color, color3, sin(vPosition.x * 3.0 + time * 1.5) * 0.5 + 0.5);
        
        float alpha = 0.8 + sin(time * 3.0 + vPosition.y * 5.0) * 0.2;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        {/* Simplified shoe shape using combined geometries */}
        <group>
          {/* Sole */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2.2, 0.3, 0.8]} />
            <primitive object={holographicMaterial} ref={materialRef} />
          </mesh>
          
          {/* Upper */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 1, 0.6]} />
            <primitive object={holographicMaterial.clone()} />
          </mesh>
          
          {/* Toe cap */}
          <mesh position={[0.8, 0, 0]}>
            <sphereGeometry args={[0.4, 16, 8]} />
            <primitive object={holographicMaterial.clone()} />
          </mesh>
        </group>
      </mesh>
    </group>
  );
}
