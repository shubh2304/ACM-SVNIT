"use client";

import { useRef, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";

function ParticleSphere() {
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.2;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Mix between cyan and violet
      const t = Math.random();
      const cyan = new THREE.Color("#00D4FF");
      const violet = new THREE.Color("#7B2FFF");
      const color = cyan.clone().lerp(violet, t);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function Node({ position, label }: { position: THREE.Vector3, label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 3 + position.x) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={hovered ? "#ffffff" : "#00D4FF"} transparent opacity={0.9} />
      {hovered && (
        <Html distanceFactor={10} position={[0, 0.15, 0]} center zIndexRange={[100, 0]}>
          <div className="px-3 py-1.5 bg-[rgba(2,4,8,0.9)] border border-cyan-500/50 text-cyan-400 text-xs font-mono rounded backdrop-blur-md whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Glowing nodes on the sphere
function GlowingNodes() {
  const nodes = useMemo(() => {
    const items = [
      { label: "AI/ML", phi: 0.8, theta: 1.2 },
      { label: "Web Dev", phi: 1.5, theta: 2.5 },
      { label: "Cybersec", phi: 2.0, theta: 0.8 },
      { label: "CP", phi: 0.4, theta: 4.2 },
      { label: "Design", phi: 1.2, theta: 5.0 },
    ];
    return items.map((item) => ({
      ...item,
      position: new THREE.Vector3(
        2.2 * Math.sin(item.phi) * Math.cos(item.theta),
        2.2 * Math.sin(item.phi) * Math.sin(item.theta),
        2.2 * Math.cos(item.phi)
      ),
    }));
  }, []);

  const lines = useMemo(() => {
    const pts = nodes.map(n => n.position);
    pts.push(pts[0]); // close loop
    return pts;
  }, [nodes]);

  return (
    <group>
      <Line points={lines} color="#7B2FFF" lineWidth={1.5} transparent opacity={0.4} />
      <Line points={[nodes[0].position, nodes[2].position]} color="#00D4FF" lineWidth={0.8} transparent opacity={0.2} />
      <Line points={[nodes[1].position, nodes[3].position]} color="#00D4FF" lineWidth={0.8} transparent opacity={0.2} />
      <Line points={[nodes[2].position, nodes[4].position]} color="#00D4FF" lineWidth={0.8} transparent opacity={0.2} />

      {nodes.map((node, i) => (
        <Node key={i} position={node.position} label={node.label} />
      ))}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Auto rotation
      groupRef.current.rotation.y += 0.0015;
      
      // Gentle bobbing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Mouse tracking parallax (subtle)
      const targetX = state.pointer.x * 0.3;
      const targetY = state.pointer.y * 0.3;

      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ParticleSphere />
      <GlowingNodes />
    </group>
  );
}

export default function HeroSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
    </div>
  );
}
