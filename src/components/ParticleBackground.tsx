import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingParticles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particleCount = 60;

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [positions, velocities];
  }, []);

  const colors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    const goldColor = new THREE.Color('#C9A86A');
    for (let i = 0; i < particleCount; i++) {
      colors[i * 3] = goldColor.r;
      colors[i * 3 + 1] = goldColor.g;
      colors[i * 3 + 2] = goldColor.b;
    }
    return colors;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];
      positionArray[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      positionArray[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.002;
      const dx = mouseRef.current.x * 5 - positionArray[i * 3];
      const dy = mouseRef.current.y * 5 - positionArray[i * 3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) {
        positionArray[i * 3] += dx * 0.0005;
        positionArray[i * 3 + 1] += dy * 0.0005;
      }
      if (positionArray[i * 3] > 10) positionArray[i * 3] = -10;
      if (positionArray[i * 3] < -10) positionArray[i * 3] = 10;
      if (positionArray[i * 3 + 1] > 10) positionArray[i * 3 + 1] = -10;
      if (positionArray[i * 3 + 1] < -10) positionArray[i * 3 + 1] = 10;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
};

const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  const orbs = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5] as [number, number, number],
      scale: 0.15 + Math.random() * 0.25,
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y = orb.position[1] + Math.sin(state.clock.elapsedTime * orb.speed) * 0.5;
      child.rotation.x = state.clock.elapsedTime * 0.1;
      child.rotation.y = state.clock.elapsedTime * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb) => (
        <mesh key={orb.id} position={orb.position}>
          <sphereGeometry args={[orb.scale, 32, 32]} />
          <meshBasicMaterial color="#C9A86A" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <FloatingParticles />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
