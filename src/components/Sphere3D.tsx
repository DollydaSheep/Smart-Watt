'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Device } from '@/data/deviceData';

// Use Device type from data layer
export type DeviceData = Device;

export type Sphere3DProps = {
  devices: DeviceData[];
  totalUsage: number;
  powerLimit?: number;
  showLabels?: boolean;
};

// Base size for spheres with dramatic scaling
const getSphereSize = (percentage: number) => {
  // Exponential scaling for more dramatic size differences
  const normalizedPercentage = percentage / 100;
  return 0.1 + Math.pow(normalizedPercentage, 0.7) * 0.8; // Size between 0.1 and 0.9 with exponential curve
};

// Calculate radius from center - devices stick to limiter edge with subtle variations
const getRadiusFromCenter = (percentage: number) => {
  const normalizedPercentage = percentage / 100;
  // Base radius at limiter edge (1.0) with subtle proximity effect
  const proximityVariation = normalizedPercentage * 0.15; // Small variation for higher usage
  return 1.0 - proximityVariation; // Radius between 0.85 and 1.0 (staying close to limiter edge)
};

function SmallSphere({ size, color, position, onHover, onClick }: { 
  size: number; 
  color: string; 
  position: [number, number, number];
  onHover: (isHovered: boolean) => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);
  const targetColorRef = useRef(new THREE.Color(color));
  const currentColorRef = useRef(new THREE.Color(color));
  
  // Update target color when prop changes
  useEffect(() => {
    targetColorRef.current.set(color);
  }, [color]);
  
  // Add subtle pulsing animation and smooth color transitions
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Smooth color transition
      currentColorRef.current.lerp(targetColorRef.current, 0.1);
      materialRef.current.color.copy(currentColorRef.current);
      
      // Pulsing animation
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
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        ref={materialRef}
        transparent
      />
    </mesh>
  );
}

function PowerLimiter({ totalUsage, powerLimit, devices }: { totalUsage: number; powerLimit: number; devices: DeviceData[]; showLabels?: boolean }) {
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const gridMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const gridMeshRef = useRef<THREE.Mesh | null>(null);
  const targetColorRef = useRef<THREE.Color>(new THREE.Color('#10b981'));
  const currentColorRef = useRef<THREE.Color>(new THREE.Color('#10b981'));
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const particleCount = 3000; // Number of particles
  
  // Calculate usage percentage and determine color
  const usagePercentage = (totalUsage / powerLimit) * 100;
  const isOverLimit = usagePercentage > 100;
  const isNearLimit = usagePercentage >= 80;
  
  // Find highest usage device for green mode color
  const highestUsageDevice = devices.reduce((highest, current) => {
    const currentPercentage = parseFloat(current.percentage.toString());
    const highestPercentage = parseFloat(highest.percentage.toString());
    return currentPercentage > highestPercentage ? current : highest;
  }, devices[0] || { color: '#10b981' });
  
  // Physics state
  const particleState = useRef<{
    positions: Float32Array;
    velocities: THREE.Vector3[];
    accelerations: THREE.Vector3[];
    phases: Float32Array;
    sizes: Float32Array;
    lastTime: number;
  } | null>(null);

  // Create particle system with physics
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const accelerations: THREE.Vector3[] = [];
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Position particles in a spherical distribution
      const radius = 0.3 + Math.random() * 0.7; // Keep away from center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Initial position
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Initial velocity (random direction, small magnitude)
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ));
      
      // Initial acceleration (zero)
      accelerations.push(new THREE.Vector3(0, 0, 0));
      
      sizes[i] = Math.random() * 1.5 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    // Store physics state
    particleState.current = {
      positions: new Float32Array(positions),
      velocities,
      accelerations,
      sizes,
      phases,
      lastTime: 0
    };
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, [particleCount]);
  
  // Update target color based on usage
  useEffect(() => {
    if (isOverLimit) {
      targetColorRef.current.set('#ef4444'); // Red
    } else if (isNearLimit) {
      targetColorRef.current.set('#f59e0b'); // Yellow/Orange
    } else {
      // Green mode - use highest usage device color
      targetColorRef.current.set(highestUsageDevice.color);
    }
  }, [isOverLimit, isNearLimit, highestUsageDevice.color]);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Physics constants - three-tier system based on power state
  const getPhysicsConstants = (usagePercentage: number) => {
    if (usagePercentage >= 100) {
      // RED MODE - Contained chaos
      return {
        GRAVITY: 0.0001,
        REPULSION: 0.0008,          // Slightly reduced repulsion
        DAMPING: 0.97,              // Increased damping to contain movement
        BOUNDARY_ELASTICITY: 0.6,   // Higher elasticity to bounce back
        MAX_SPEED: 0.1,             // Reduced max speed
        ATTRACTION_TO_CENTER: 0.0001, // Slight attraction to center
        TIME_STEP: 1/60,
        CHAOS_FORCE: 0.0015,        // Maintained chaos but slightly reduced
        BOUNDARY_BREACH: 0.8,       // Keep tight boundary
        MOVEMENT_SCALE: 0.8         // Slightly reduced movement scale
      };
    } else if (usagePercentage >= 80) {
      // YELLOW MODE - Subtle movement
      return {
        GRAVITY: 0.0001,
        REPULSION: 0.0001,          // Minimal repulsion
        DAMPING: 0.99,              // High damping for gentle movement
        BOUNDARY_ELASTICITY: 0.9,   // High elasticity
        MAX_SPEED: 0.02,            // Slow movement
        ATTRACTION_TO_CENTER: 0.0001, // Weak attraction
        TIME_STEP: 1/60,
        CHAOS_FORCE: 0.0003,        // Tiny chaos for subtle variation
        BOUNDARY_BREACH: 0.95,      // Contained
        MOVEMENT_SCALE: 0.3
      };
    } else {
      // GREEN MODE - Very stable
      return {
        GRAVITY: 0.0001,
        REPULSION: 0.00005,         // Minimal repulsion
        DAMPING: 0.995,             // Very high damping for stability
        BOUNDARY_ELASTICITY: 0.95,  // Very high elasticity
        MAX_SPEED: 0.01,            // Very slow
        ATTRACTION_TO_CENTER: 0.0002, // Gentle attraction to center
        TIME_STEP: 1/60,
        CHAOS_FORCE: 0,             // No chaos
        BOUNDARY_BREACH: 0.9,       // Tight containment
        MOVEMENT_SCALE: 0.1
      };
    }
  };

  // Animation loop with physics
  useFrame((state) => {
    if (!particlesRef.current || !materialRef.current || !particleState.current) return;
    
    const currentTime = state.clock.getElapsedTime();
    
    // Smooth color transition for particles and grid
    currentColorRef.current.lerp(targetColorRef.current, 0.05);
    materialRef.current.color.copy(currentColorRef.current);
    
    // Update grid color and pulsing animation
    if (gridMaterialRef.current && gridMeshRef.current) {
      gridMaterialRef.current.color.copy(currentColorRef.current);
      
      // Pulsing effects based on power usage level
      if (isOverLimit) {
        // RED MODE - Intense pulsing
        const opacityPulse = Math.sin(currentTime * 8) * 0.1 + 0.15; // Fast opacity pulsing (0.05-0.25)
        const scalePulse = Math.sin(currentTime * 6) * 0.15 + 1; // Scale pulsing (0.85-1.15)
        const systemPulse = Math.sin(currentTime * 5) * 0.1 + 1; // Particle system pulsing
        
        gridMaterialRef.current.opacity = opacityPulse;
        gridMeshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
        particlesRef.current.scale.set(systemPulse, systemPulse, systemPulse);
        
      } else if (isNearLimit) {
        // YELLOW MODE - Moderate pulsing
        const opacityPulse = Math.sin(currentTime * 3) * 0.04 + 0.08; // Slower pulsing (0.04-0.12)
        const scalePulse = Math.sin(currentTime * 2.5) * 0.05 + 1; // Gentle scale pulsing (0.95-1.05)
        
        gridMaterialRef.current.opacity = opacityPulse;
        gridMeshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
        particlesRef.current.scale.set(1, 1, 1);
        
      } else {
        // GREEN MODE - Very slow breathing
        const opacityPulse = Math.sin(currentTime * 0.5) * 0.015 + 0.06; // Slower breathing (0.045-0.075)
        const scalePulse = Math.sin(currentTime * 0.4) * 0.02 + 1; // Slower gentle scale (0.98-1.02)
        
        gridMaterialRef.current.opacity = opacityPulse;
        gridMeshRef.current.scale.set(scalePulse, scalePulse, scalePulse);
        particlesRef.current.scale.set(1, 1, 1);
      }
    }
    
    const { positions, velocities, accelerations, lastTime } = particleState.current;
    const positionsAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
    const deltaTime = lastTime ? Math.min(0.1, currentTime - lastTime) : 0.016; // Cap delta time for stability
    
    // Get dynamic physics constants based on power usage percentage
    const PHYSICS = getPhysicsConstants(usagePercentage);
    
    // Update physics
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const position = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      const velocity = velocities[i];
      const acceleration = accelerations[i];
      
      // Reset acceleration
      acceleration.set(0, 0, 0);
      
      // Add attraction/repulsion to/from center
      const distanceToCenter = position.length();
      if (distanceToCenter > 0.01) {
        const directionToCenter = position.clone().multiplyScalar(-1 / distanceToCenter);
        const attractionForce = Math.min(distanceToCenter * 0.5, 0.1);
        acceleration.add(directionToCenter.multiplyScalar(attractionForce * PHYSICS.ATTRACTION_TO_CENTER));
      }
      
      // Add chaos force scaled by movement scale
      if (PHYSICS.CHAOS_FORCE > 0) {
        const chaosForce = new THREE.Vector3(
          (Math.random() - 0.5) * PHYSICS.CHAOS_FORCE * PHYSICS.MOVEMENT_SCALE,
          (Math.random() - 0.5) * PHYSICS.CHAOS_FORCE * PHYSICS.MOVEMENT_SCALE,
          (Math.random() - 0.5) * PHYSICS.CHAOS_FORCE * PHYSICS.MOVEMENT_SCALE
        );
        acceleration.add(chaosForce);
      }
      
      // Add repulsion between particles (simplified)
      if (i % 10 === 0) { // Only check some particles for performance
        for (let j = 0; j < Math.min(5, particleCount); j++) {
          if (i === j) continue;
          const j3 = j * 3;
          const otherPos = new THREE.Vector3(positions[j3], positions[j3 + 1], positions[j3 + 2]);
          const diff = new THREE.Vector3().subVectors(position, otherPos);
          const distance = diff.length();
          
          if (distance < 0.3 && distance > 0.01) {
            const repulsionForce = (1 / (distance * distance)) * PHYSICS.REPULSION;
            diff.normalize().multiplyScalar(repulsionForce);
            acceleration.add(diff);
            accelerations[j].sub(diff); // Equal and opposite force
          }
        }
      }
      
      // Update velocity (with damping)
      velocity.add(acceleration);
      velocity.multiplyScalar(PHYSICS.DAMPING);
      
      // Limit maximum speed
      if (velocity.length() > PHYSICS.MAX_SPEED) {
        velocity.normalize().multiplyScalar(PHYSICS.MAX_SPEED);
      }
      
      // Update position
      position.add(velocity.clone().multiplyScalar(deltaTime * 60));
      
      // Boundary collision - dynamic based on power usage
      const radius = position.length();
      const maxRadius = PHYSICS.BOUNDARY_BREACH;
      
      if (radius > maxRadius && usagePercentage < 100) {
        // Normal boundary collision when not in red mode
        const normal = position.clone().normalize();
        
        // Reflect velocity
        const dot = velocity.dot(normal);
        velocity.sub(normal.multiplyScalar(2 * dot * PHYSICS.BOUNDARY_ELASTICITY));
        
        // Reposition to boundary
        position.copy(normal.multiplyScalar(maxRadius * 0.99));
      } else if (radius > 2.0) {
        // Reset particles that go too far out (even in red mode)
        const resetRadius = 0.3 + Math.random() * 0.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        position.set(
          resetRadius * Math.sin(phi) * Math.cos(theta),
          resetRadius * Math.sin(phi) * Math.sin(theta),
          resetRadius * Math.cos(phi)
        );
        
        // Give it some initial velocity scaled by movement
        const velocityScale = PHYSICS.MOVEMENT_SCALE * 0.02;
        velocity.set(
          (Math.random() - 0.5) * velocityScale,
          (Math.random() - 0.5) * velocityScale,
          (Math.random() - 0.5) * velocityScale
        );
      } else if (radius < 0.3 && usagePercentage < 100) {
        // Push away from center if too close (not in red mode)
        position.normalize().multiplyScalar(0.3);
        velocity.add(position.clone().multiplyScalar(0.1 * PHYSICS.MOVEMENT_SCALE));
      }
      
      // Update position in the array
      positions[i3] = position.x;
      positions[i3 + 1] = position.y;
      positions[i3 + 2] = position.z;
    }
    
    // Update the geometry
    (positionsAttr.array as Float32Array).set(positions);
    positionsAttr.needsUpdate = true;
    
    // Update last time
    particleState.current.lastTime = currentTime;
    
    // Rotate the entire particle system slowly
    particlesRef.current.rotation.y = currentTime * 0.05;
  });
  

  return (
    <group>
      {/* Main Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry attach="geometry" {...particleGeometry} />
        <pointsMaterial
          ref={materialRef}
          size={0.03}
          sizeAttenuation={true}
          transparent
          opacity={0.8}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Wireframe sphere for boundary */}
      <mesh ref={gridMeshRef}>
        <sphereGeometry args={[1, 25, 25]} />
        <meshBasicMaterial 
          ref={gridMaterialRef}
          wireframe
          transparent
          opacity={0.02}
          color="#10b981"
          wireframeLinewidth={1}
        />
      </mesh>
    </group>
  );
}

function Sphere({ devices, totalUsage, powerLimit, showLabels = false }: { devices: DeviceData[]; totalUsage: number; powerLimit: number; showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const introStartTime = useRef<number | null>(null);
  const rotationStartTime = useRef<number | null>(null);
  const [hoveredDeviceId, setHoveredDeviceId] = useState<number | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      <PowerLimiter totalUsage={totalUsage} powerLimit={powerLimit} devices={devices} />
      
      {/* Device spheres positioned around the center with proximity effect */}
      {devices.map((device, index) => {
        const angle = (index / devices.length) * Math.PI * 2;
        const radius = getRadiusFromCenter(device.percentage);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const size = getSphereSize(device.percentage);
        const isHovered = hoveredDeviceId === device.id;
        const isSelected = selectedDeviceId === device.id;
        const shouldShowLabel = isMobile ? isSelected : isHovered;
        
        return (
          <group key={device.id}>
            <SmallSphere 
              size={size}
              color={device.color} 
              position={[x, 0, z]}
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
                position={[x, -0.6, z]}
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

export default function Sphere3D({ devices = [], totalUsage = 10.3, powerLimit = 12, showLabels = false }: Sphere3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
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
          precision: 'highp', // High precision for better quality
          logarithmicDepthBuffer: true, // Better depth precision
        }}
        dpr={[1, 3]} // Higher device pixel ratio for HD displays
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
        <Sphere devices={devices} totalUsage={totalUsage} powerLimit={powerLimit} showLabels={showLabels} />
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
