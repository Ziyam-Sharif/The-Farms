import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Float } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

function FallbackMesh() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh>
        <cylinderGeometry args={[1, 1, 2.2, 32]} />
        <meshStandardMaterial color="#EAA122" roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
}

interface ProductViewerProps {
  modelUrl?: string;
  fallbackImageUrl: string;
  title: string;
}

export const ProductViewer: React.FC<ProductViewerProps> = ({ modelUrl, fallbackImageUrl, title }) => {
  if (!modelUrl) {
    return (
      <div className="w-full h-96 rounded-2xl bg-paperDark/5 dark:bg-charcoal border border-turmeric/20 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={fallbackImageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-2xl bg-slate-900 border border-turmeric/30 relative overflow-hidden shadow-2xl">
      <div className="absolute top-4 left-4 z-10 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
        <span>Interactive 3D Viewer</span>
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
      </div>

      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={<FallbackMesh />}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};
