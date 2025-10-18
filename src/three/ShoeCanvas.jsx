import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import Shoe from './Shoe.jsx';

// Reusable Canvas with sensible lighting and controls
export default function ShoeCanvas({ modelUrl, color, small = false, priority = false }) {
  return (
    <Canvas
      camera={{ position: [0.5, 0.6, 1.2], fov: small ? 45 : 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      {/* Ambient + directional for clarity */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 2]} intensity={1.2} />
      <Suspense fallback={null}>
        <Shoe modelUrl={modelUrl} color={color} small={small} priority={priority} />
        <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={5} blur={2.5} far={1.2} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={!small}
        maxPolarAngle={Math.PI / 2}
        autoRotate={!!small}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}
