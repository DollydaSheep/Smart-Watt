'use client';

import dynamic from 'next/dynamic';
import type { DeviceData } from './Sphere3D';

// Dynamically import the 3D sphere with SSR disabled
const Sphere3D = dynamic(
  () => import('@/components/Sphere3D'),
  { 
    ssr: false, 
    loading: () => <div className="w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg animate-pulse" /> 
  }
);

interface Visualization3DProps {
  devices: DeviceData[];
  totalUsage: number;
  powerLimit: number;
}

export function Visualization3D({ devices, totalUsage, powerLimit }: Visualization3DProps) {
  return (
    <div className="w-full max-w-2xl mx-auto md:mx-0 md:w-1/2 lg:w-2/5 xl:w-1/3 -mt-3 md:mt-0 flex flex-col items-center">
      {/* 3D Sphere */}
      <div className="w-full aspect-square mb-10">
        <Sphere3D devices={devices} totalUsage={totalUsage} powerLimit={powerLimit} />
      </div>
    </div>
  );
}
