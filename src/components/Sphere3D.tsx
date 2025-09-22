'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Types
export type DeviceData = {
  id: number;
  name: string;
  color: string;
  percentage: number;
  power: string;
};

export type Sphere3DProps = {
  devices: DeviceData[];
  totalUsage: number;
  powerLimit?: number;
};

// Base size for spheres with dramatic scaling
const getSphereSize = (percentage: number) => {
  // Exponential scaling for more dramatic size differences
  const normalizedPercentage = percentage / 100;
  return 0.1 + Math.pow(normalizedPercentage, 0.7) * 0.8; // Size between 0.1 and 0.9 with exponential curve
};

// Generate positions on the surface of the power limiter sphere with good spacing
const generateRandomPositions = (deviceCount: number) => {
  const positions: Array<{x: number, y: number, z: number}> = [];
  const minDistance = 1.2; // Minimum angular distance between devices (in radians)
  const maxAttempts = 200; // Increased maximum attempts for better positioning
  const radius = 1.0; // Place spheres on the surface of the limiter
  
  // Golden ratio based distribution for uniform spacing
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
  
  for (let i = 0; i < deviceCount; i++) {
    let validPosition = false;
    let attempts = 0;
    let newPosition = { x: 0, y: 0, z: 0 };
    
    while (!validPosition && attempts < maxAttempts) {
      // Use Fibonacci sphere algorithm for initial placement
      const y = 1 - (i / (deviceCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      
      // Golden angle increment
      const theta = phi * i;
      
      // Convert spherical to cartesian coordinates
      newPosition = {
        x: radiusAtY * Math.cos(theta) * radius,
        y: y * radius,
        z: radiusAtY * Math.sin(theta) * radius
      };
      
      // Add some random jitter to break perfect symmetry
      if (deviceCount > 4) {
        const jitter = 0.3;
        newPosition.x += (Math.random() - 0.5) * jitter;
        newPosition.y += (Math.random() - 0.5) * jitter;
        newPosition.z += (Math.random() - 0.5) * jitter;
        
        // Re-normalize to sphere surface
        const length = Math.sqrt(
          newPosition.x * newPosition.x + 
          newPosition.y * newPosition.y + 
          newPosition.z * newPosition.z
        );
        newPosition.x = (newPosition.x / length) * radius;
        newPosition.y = (newPosition.y / length) * radius;
        newPosition.z = (newPosition.z / length) * radius;
      }
      
      // Check collision with existing positions
      validPosition = true;
      for (const existingPos of positions) {
        // Calculate angular distance between points on sphere
        const dot = (
          newPosition.x * existingPos.x + 
          newPosition.y * existingPos.y + 
          newPosition.z * existingPos.z
        );
        const angle = Math.acos(Math.min(Math.max(dot, -1), 1)); // Clamp for floating point errors
        
        if (angle < minDistance) {
          validPosition = false;
          break;
        }
      }
      
      attempts++;
      
      // If we're stuck, try a completely random position
      if (attempts > maxAttempts / 2) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        newPosition = {
          x: Math.sin(phi) * Math.cos(theta) * radius,
          y: Math.sin(phi) * Math.sin(theta) * radius,
          z: Math.cos(phi) * radius
        };
      }
    }
    
    positions.push(newPosition);
  }
  
  return positions;
};

function SmallSphere({ size, color, position, onHover, onClick }: { 
  size: number; 
  color: string; 
  position: [number, number, number];
  onHover: (isHovered: boolean) => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Add subtle pulsing animation
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(size * pulse);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onClick={onClick}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial 
        color={color}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function PowerLimiter({ totalUsage, powerLimit }: { totalUsage: number; powerLimit: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Calculate usage percentage and determine color
  const usagePercentage = (totalUsage / powerLimit) * 100;
  const isOverLimit = usagePercentage > 100;
  const isNearLimit = usagePercentage >= 80;
  
  // Color logic: green (0-79%) -> yellow (80-99%) -> red (100%+)
  let color = '#10b981'; // Green
  if (isOverLimit) {
    color = '#ef4444'; // Red
  } else if (isNearLimit) {
    color = '#f59e0b'; // Yellow/Orange
  }
  
  // Pulsing animation when over limit
  useFrame((state) => {
    if (meshRef.current && isOverLimit) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 4) * 0.2 + 1;
      meshRef.current.scale.setScalar(pulse);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color={color}
          wireframe
          transparent
          opacity={0.8}
          wireframeLinewidth={2}
        />
      </mesh>
      <Html
        as='div'
        wrapperClass="label"
        position={[0, -1.3, 0]}
        center
      >
        <div className={`text-center text-xs ${isOverLimit ? 'text-red-400' : isNearLimit ? 'text-yellow-400' : 'text-emerald-500'}`}>
          <div>Power Limiter</div>
          <div className="text-xs opacity-75">{totalUsage.toFixed(1)}/{powerLimit} kW</div>
          <div className="text-xs opacity-75">({usagePercentage.toFixed(0)}%)</div>
        </div>
      </Html>
    </group>
  );
}

function Sphere({ devices, totalUsage, powerLimit }: { devices: DeviceData[]; totalUsage: number; powerLimit: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const introStartTime = useRef<number | null>(null);
  const rotationStartTime = useRef<number | null>(null);
  const [hoveredDeviceId, setHoveredDeviceId] = useState<number | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Generate positions with collision avoidance
  const devicePositions = useMemo(() => {
    return generateRandomPositions(devices.length);
  }, [devices.length]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const currentTime = state.clock.elapsedTime;
      
      // Initialize intro start time
      if (introStartTime.current === null) {
        introStartTime.current = currentTime;
      }
      
      const elapsed = currentTime - introStartTime.current;
      const introDuration = 2.5; // 2.5 seconds for intro
      
      if (elapsed < introDuration) {
        // Intro animation phase
        const progress = Math.min(elapsed / introDuration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        // Scale animation: from 0.05 to 1.0
        const scale = 0.05 + (0.95 * easeOut);
        groupRef.current.scale.setScalar(scale);
        
        // Opacity animation: from 0 to 0.9
        const opacity = 0.9 * Math.pow(easeOut, 0.5);
        groupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.Material & { opacity?: number };
            if (material.opacity !== undefined) {
              material.opacity = opacity;
            }
          }
        });
        
        // Position animation: from z = -3 to z = 0
        groupRef.current.position.z = -3 + (3 * easeOut);
      } else {
        // Post-intro phase - ensure final values are set
        groupRef.current.scale.setScalar(1);
        groupRef.current.position.z = 0;
        groupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.Material & { opacity?: number };
            if (material.opacity !== undefined) {
              material.opacity = 0.9;
            }
          }
        });
        
        // Initialize rotation start time when intro completes
        if (rotationStartTime.current === null) {
          rotationStartTime.current = currentTime;
        }
        
        // Normal rotation starting from when intro completes
        const rotationElapsed = currentTime - rotationStartTime.current;
        groupRef.current.rotation.x = rotationElapsed * 0.1;
        groupRef.current.rotation.y = rotationElapsed * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Power Limiter - Center sphere */}
      <PowerLimiter totalUsage={totalUsage} powerLimit={powerLimit} />
      
      {/* Device spheres positioned organically around the center */}
      {devices.map((device, index) => {
        const position = devicePositions[index];
        const size = getSphereSize(device.percentage);
        const isHovered = hoveredDeviceId === device.id;
        const isSelected = selectedDeviceId === device.id;
        const shouldShowLabel = isMobile ? isSelected : isHovered;
        
        return (
          <group key={device.id}>
            <SmallSphere 
              size={size}
              color={device.color} 
              position={[position.x, position.y, position.z]}
              onHover={(hovered) => !isMobile && setHoveredDeviceId(hovered ? device.id : null)}
              onClick={() => {
                if (isMobile) {
                  setSelectedDeviceId(selectedDeviceId === device.id ? null : device.id);
                }
              }}
            />
            {shouldShowLabel && (
              <Html
                as='div'
                wrapperClass="label"
                position={[position.x, position.y - 0.6, position.z]}
                center
              >
                <div className="text-center text-xs" style={{ color: device.color }}>
                  <div>{device.name}</div>
                  <div className="text-xs opacity-75">{device.power}</div>
                  <div className="text-xs opacity-75">({device.percentage}%)</div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function Sphere3D({ devices = [], totalUsage = 10.3, powerLimit = 12 }: Sphere3DProps) {
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
          args={[0, 0, '#1a1a1a', 'white']} 
          position={[0, -1, 0]}
          rotation={[0, 0, 0]}
        />
        <Sphere devices={devices} totalUsage={totalUsage} powerLimit={powerLimit} />
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
