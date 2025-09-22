"use client"

import { useState } from "react";
import Image from "next/image";
import { Visualization3D } from "@/components/Visualization3D";
import { HomeUsage } from "@/components/homeusage";


// All available devices - easily expandable
const allDevices = [
  { name: 'Oven', percentage: 35, power: '0.42 kW' },
  { name: 'PC', percentage: 20, power: '0.24 kW' },
  { name: 'Refrigerator', percentage: 30, power: '0.36 kW' },
  { name: 'TV', percentage: 15, power: '0.18 kW' },
  { name: 'Washing Machine', percentage: 25, power: '0.30 kW' },
  { name: 'Air Conditioner', percentage: 40, power: '0.48 kW' },
  { name: 'Microwave', percentage: 12, power: '0.14 kW' },
  { name: 'Dishwasher', percentage: 28, power: '0.34 kW' },
  { name: 'Water Heater', percentage: 45, power: '0.54 kW' },
  { name: 'Gaming Console', percentage: 18, power: '0.22 kW' },
];


// Fixed color assignments for consistent device colors
const deviceColors: { [key: string]: string } = {
  'Oven': '#10b981',
  'PC': '#3b82f6',
  'Refrigerator': '#f59e0b',
  'TV': '#ef4444',
  'Washing Machine': '#8b5cf6',
  'Air Conditioner': '#06b6d4',
  'Microwave': '#84cc16',
  'Dishwasher': '#f97316',
  'Water Heater': '#ec4899',
  'Gaming Console': '#6366f1'
};

// Generate device data with consistent colors for top 4 power consumers
const generateDeviceData = () => {
  // Sort devices by power consumption (highest first) and take top 4
  const sortedDevices = [...allDevices]
    .sort((a, b) => parseFloat(b.power) - parseFloat(a.power))
    .slice(0, 4);
  
  // Assign consistent colors based on device name
  return sortedDevices.map((device, index) => ({
    id: index + 1,
    name: device.name,
    color: deviceColors[device.name] || '#000000', // Fallback to black if device not found
    percentage: device.percentage,
    power: device.power
  }));
};

// Shared device data for consistency
export const deviceData = generateDeviceData();

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
            totalDevices={allDevices.length}
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
