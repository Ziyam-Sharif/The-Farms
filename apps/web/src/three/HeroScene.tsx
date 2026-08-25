import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh, DoubleSide, Group } from 'three';
import { Sparkles } from '@react-three/drei';

function CenteredTurmeric3D({ onHoverChange }: { onHoverChange: (hovered: boolean) => void }) {
  const groupRef = useRef<Group>(null!);
  const meshRef = useRef<Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, '/turmeric.png');
  const { viewport } = useThree();

  const [hovered, setHovered] = useState(false);

  // Dynamic X offset so 3D model stays on right half without colliding with hero text
  const targetX = Math.min(3.0, Math.max(1.9, viewport.width * 0.25));

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // ─────────────────────────────────────────────────────────────
    // Ultra-Slow, Smooth & Luxurious Continuous Breathing Animation
    // ─────────────────────────────────────────────────────────────
    const scalePulse = Math.sin(time * 0.45) * 0.035; // Very slow, graceful scale cycle
    const targetScale = (hovered ? 1.22 : 1.15) + scalePulse;
    
    const currentScale = meshRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.04);
    meshRef.current.scale.set(nextScale, nextScale, nextScale);

    // Ultra-slow, peaceful rotation sway & floating levitation
    const rotY = Math.sin(time * 0.25) * 0.12;
    const rotZ = Math.cos(time * 0.2) * 0.025;
    const levitateY = Math.sin(time * 0.4) * 0.06;

    meshRef.current.rotation.y = rotY;
    meshRef.current.rotation.z = rotZ;
    groupRef.current.position.y = levitateY;
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHoverChange(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHoverChange(false);
    document.body.style.cursor = 'default';
  };

  return (
    <group position={[targetX, 0, 0]}>
      {/* Floating 3D Turmeric Model with Cutout Silhouette Shadow */}
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={[1.15, 1.15, 1.15]}
        >
          <planeGeometry args={[3.9, 3.9]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.01}
            side={DoubleSide}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

export const HeroScene: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-10 bg-transparent overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent clear background
        }}
        className={`w-full h-full bg-transparent cursor-pointer transition-all duration-700 ${
          isHovered
            ? 'drop-shadow-[0_32px_55px_rgba(234,161,34,0.6)] drop-shadow-[0_14px_28px_rgba(0,0,0,0.4)]'
            : 'drop-shadow-[0_24px_45px_rgba(234,161,34,0.4)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]'
        }`}
      >
        {/* Warm Golden Directional & Ambient Lighting */}
        <ambientLight intensity={isHovered ? 2.5 : 2.2} />
        <directionalLight position={[6, 8, 6]} intensity={isHovered ? 3.5 : 3.0} color="#FFF3D6" />
        <pointLight position={[2, 2, 4]} intensity={isHovered ? 4.2 : 3.5} color="#F4BA35" distance={12} />
        <pointLight position={[-4, 1, 3]} intensity={2.5} color="#EAA122" distance={12} />

        <CenteredTurmeric3D onHoverChange={setIsHovered} />

        {/* Clean, Subtle Gold Sparkles */}
        <Sparkles
          count={isHovered ? 70 : 45}
          scale={[12, 12, 8]}
          size={isHovered ? 4.5 : 3.5}
          speed={isHovered ? 0.25 : 0.15}
          opacity={0.6}
          color="#F4BA35"
        />
      </Canvas>
    </div>
  );
};
