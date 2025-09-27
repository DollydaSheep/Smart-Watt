"use client"

import React from 'react';

interface Device {
  id: number;
  name: string;
  powerValue: number;
  percentage: number;
  isOnline: boolean;
  color: string;
  power: string;
}

interface DevicesProps {
  devices: Device[];
  onClick?: () => void;
}

export const Devices: React.FC<DevicesProps> = ({ devices, onClick }) => {
  // Find the device with highest power consumption
  const highestConsumptionDevice = devices.reduce((max, device) => 
    device.powerValue > max.powerValue ? device : max, 
    devices[0] || { name: 'None', powerValue: 0, power: '0 kW', percentage: 0 }
  );
  

  // Use the highest consuming device's color for the container with transparency
  const getBackgroundColor = () => {
    const color = highestConsumptionDevice.color || '#161617';
    // Convert hex to rgba with 50% opacity
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  const getBorderColor = () => {
    const color = highestConsumptionDevice.color || '#161617';
    // Convert hex to rgba with transparency
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  };

  return (
    <div 
      onClick={onClick}
      className="rounded-full p-3 hover:border-gray-600/50 transition-all duration-300 aspect-square flex flex-col justify-between cursor-pointer hover:scale-105 relative overflow-hidden"
      style={{
        borderColor: getBorderColor(),
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      {/* Pulsing background layer */}
      <div 
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          backgroundColor: getBackgroundColor()
        }}
      />
      
      {/* Content layer - not affected by pulse */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
        <div className="mb-2">
          <h3 className="text-white text-lg font-bold">Devices</h3>
          <p className="text-white/80 text-xs">Highest Usage</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-xl font-bold truncate px-1" style={{ color: highestConsumptionDevice.color || '#10b981' }}>
              {highestConsumptionDevice.name}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-white">
              {highestConsumptionDevice.power}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
