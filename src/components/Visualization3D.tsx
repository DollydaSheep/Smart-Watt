'use client';

import dynamic from 'next/dynamic';
import type { SphereData } from './Sphere3D';
import { TrendingUp } from 'lucide-react';

// Dynamically import the 3D sphere with SSR disabled
const Sphere3D = dynamic(
  () => import('@/components/Sphere3D'),
  { 
    ssr: false, 
    loading: () => <div className="w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg animate-pulse" /> 
  }
);

// Sphere sizes with different scales for visual hierarchy
const SPHERE_CONSTANTS = {
  white: 0.5,      // Medium size
  purple: 0.7,     // Large size
  blue: 0.3,       // Small size
  wireframe: 0.9   // Largest size (background sphere)
};

// Calculate total for percentage (including wireframe in percentage calculation)
const totalSize = Object.values(SPHERE_CONSTANTS).reduce((sum, val) => sum + val, 0);

// Data for all spheres
const sphereData: SphereData[] = [
  { 
    id: 0, 
    name: 'Oven', 
    color: '#10b981', 
    size: SPHERE_CONSTANTS.wireframe,
    constantKey: 'wireframe'
  },
  { 
    id: 1, 
    name: 'PC', 
    color: 'white', 
    size: SPHERE_CONSTANTS.white,
    constantKey: 'white'
  },
  { 
    id: 2, 
    name: 'Refrigerator', 
    color: '#9333ea', 
    size: SPHERE_CONSTANTS.purple,
    constantKey: 'purple'
  },
  { 
    id: 3, 
    name: 'TV', 
    color: '#3b82f6', 
    size: SPHERE_CONSTANTS.blue,
    constantKey: 'blue'
  },
];

// Calculate percentage for each sphere (including wireframe in percentage calculation)
const sphereDataWithPercentage = sphereData.map(sphere => ({
  ...sphere,
  percentage: Math.round((SPHERE_CONSTANTS[sphere.constantKey as keyof typeof SPHERE_CONSTANTS] / totalSize) * 100)
}));

export function Visualization3D() {
  return (
    <div className="w-full max-w-2xl mx-auto md:mx-0 md:w-1/2 lg:w-2/5 xl:w-1/3 -mt-3 md:mt-0 flex flex-col items-center ">
      {/* Label showing sphere data */}
      <div className="w-full bg-gray-100 dark:bg-[#161617] rounded-lg p-4 mb-2">
        <div className='flex justify-between items-center mb-2'>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connected Devices</h3>
          <div className='flex items-center'>
            <div 
              className="w-1.5 h-1.5 rounded-full mr-2 bg-green-300"
            />
            <span className='text-xs text-green-300'>4 Devices</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sphereDataWithPercentage.map((device) => (
            <div key={device.id} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: device.color }}
              />
              <div className='flex justify-between items-center w-full'>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                  {device.name}
                </span>
                <div className='flex items-center gap-1'>
                  <TrendingUp className='text-green-300 size-4'/>
                  <div className='flex flex-col'>
                    <span className='text-sm text-gray-700 dark:text-gray-300 font-semibold'>
                      ({device.percentage}%)
                    </span>
                    <span className='text-xs text-gray-800 dark:text-gray-400 font-light'>
                      0.3kW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 3D Sphere */}
      <div className="w-full aspect-square mb-10">
        <Sphere3D/>
      </div>
    </div>
  );
}
