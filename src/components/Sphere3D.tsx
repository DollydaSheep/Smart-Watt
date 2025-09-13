'use client';

import { useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Types
export type SphereData = {
  id: number;
  name: string;
  color: string;
  size: number;
  constantKey: string;
};


// Base size for all spheres
const SPHERE_CONSTANTS = {
  white: 0.3,    // All spheres will use 0.3 as the base size
  purple: 0.4,
  blue: 0.5,
  wireframe: 1
};

function SmallSphere({ size, color, position }: { size: number; color: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Add subtle pulsing animation
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(size * pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial 
        color={color}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function Sphere() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main wireframe sphere */}
      <group>
        <mesh>
          <sphereGeometry args={[SPHERE_CONSTANTS.wireframe, 32, 32]} />
          <meshBasicMaterial 
            color="#10b981"
            wireframe
            transparent
            opacity={0.8}
            wireframeLinewidth={1.5}
          />
        </mesh>
        <Html
          as='div'
          wrapperClass="label"
          position={[0, -0.4, 0]}
          center
        >
          <div className="text-emerald-500 text-center text-xs">Oven</div>
        </Html>
      </group>
      
      {/* Small colored spheres */}
      <group>
        <SmallSphere 
          size={SPHERE_CONSTANTS.white} 
          color="white" 
          position={[1.1, 0, 0]} 
        />
        <Html
          as='div'
          wrapperClass="label"
          position={[1.1, -0.4, 0]}
          center
        >
          <div className="text-white text-center text-xs">PC</div>
        </Html>
      </group>

      <group>
        <SmallSphere 
          size={SPHERE_CONSTANTS.purple} 
          color="#9333ea" 
          position={[Math.cos(Math.PI * 2/3) * 1.1, 0, Math.sin(Math.PI * 2/3) * 1.1]} 
        />
        <Html
          as='div'
          wrapperClass="label"
          position={[Math.cos(Math.PI * 2/3) * 1.1, -0.4, Math.sin(Math.PI * 2/3) * 1.1]}
          center
        >
          <div className="text-[#9333ea] text-center text-xs">Refrigerator</div>
        </Html>
      </group>

      <group>
        <SmallSphere 
          size={SPHERE_CONSTANTS.blue} 
          color="#3b82f6" 
          position={[Math.cos(Math.PI * 4/3) * 1.1, 0, Math.sin(Math.PI * 4/3) * 1.1]} 
        />
        <Html
          as='div'
          wrapperClass="label"
          position={[Math.cos(Math.PI * 4/3) * 1.1, -0.4, Math.sin(Math.PI * 4/3) * 1.1]}
          center
        >
          <div className="text-blue-500 text-center text-xs">TV</div>
        </Html>
      </group>
    </group>
  );
}

export default function Sphere3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{
          width: '100%',
          height: '100%',
          background: '#1a1a1a', // Dark gray background
          borderRadius: '0.5rem', // Optional: Add rounded corners
        }}
        gl={{
          antialias: true,
          alpha: false, // Disable alpha for solid background
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#09090B']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        <gridHelper 
          args={[10, 20, '#1a1a1a', '#0a0a0a']} 
          position={[0, 0, -1.5]}
          rotation={[0, 0, 0]}
        />
        <Sphere />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
