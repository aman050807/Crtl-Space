import React, { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

function MovingObj({ a, b, incl=0, days, color='white', size=0.5 }) {
  const ref = React.useRef();
  useFrame(() => {
    const ang = (days / 365) * Math.PI * 2;
    const x = a * Math.cos(ang);
    const z = b * Math.sin(ang);
    ref.current.position.set(x, 0, z);
    ref.current.rotation.y += 0.02;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

export default function SolarSystem({ days = 0 }) {
  const orbitPoints1 = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 360; i++) {
      const t = i * Math.PI * 2 / 360;
      pts.push(new THREE.Vector3(42 * Math.cos(t), 0, 38 * Math.sin(t)));
    }
    return pts;
  }, []);

  return (
    <Canvas camera={{ position: [0, 40, 120], fov: 60 }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
      <Stars radius={300} depth={60} count={15000} factor={4} fade speed={1} />
      <OrbitControls enablePan={true} enableZoom={true} />
      <Line points={orbitPoints1} color="#6fb3ff" lineWidth={1} />
      <mesh position={[0,0,0]}>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshStandardMaterial color={'#ffd27a'} />
      </mesh>

      <MovingObj a={42} b={38} days={days} color="#ffffff" size={0.9} />
      <MovingObj a={22} b={18} days={days*1.9} color="#ff88ff" size={0.5} />
    </Canvas>
  );
}