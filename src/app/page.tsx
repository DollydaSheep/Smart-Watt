"use client"

import { useState } from "react";
import Image from "next/image";
import { Visualization3D } from "@/components/Visualization3D";
import { HomeUsage } from "@/components/homeusage";

// Shared device data for consistency
export const deviceData = [
  { 
    id: 1, 
    name: 'Oven', 
    color: '#10b981',
    percentage: 35,
    power: '0.3 kW'
  },
  { 
    id: 2, 
    name: 'PC', 
    color: 'white',
    percentage: 20,
    power: '0.3 kW'
  },
  { 
    id: 3, 
    name: 'Refrigerator', 
    color: '#9333ea',
    percentage: 30,
    power: '0.3 kW'
  },
  { 
    id: 4, 
    name: 'TV', 
    color: '#3b82f6',
    percentage: 15,
    power: '0.3 kW'
  },
];

export default function Home() {
  const [powerLimit, setPowerLimit] = useState(15.0);
  
  // Calculate total usage from device data
  const totalUsage = deviceData.reduce((sum, device) => {
    return sum + parseFloat(device.power.replace(' kW', ''));
  }, 0);

  return (
    <div className="font-sans min-h-screen w-full p-4 sm:p-6 md:p-10 pt-15 md:pt-16 flex items-center justify-center">
      <main className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 w-full max-w-7xl mx-auto md:mt-12">
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <div className="w-full max-w-[500px] mx-auto md:mx-0">
            <Image
              className="w-full h-auto"
              src="/SVG/smartwattWhite.svg"
              alt="SmartWatt Logo"
              width={620}
              height={124}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <HomeUsage 
            devices={deviceData}
            totalUsage={totalUsage}
            powerLimit={powerLimit}
            onPowerLimitChange={setPowerLimit}
          />
        </div>
        <Visualization3D 
          devices={deviceData}
          totalUsage={totalUsage}
          powerLimit={powerLimit}
        />
      </main>
    </div>
  );
}
