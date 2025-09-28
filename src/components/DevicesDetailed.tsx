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
  deviceType: string;
  location?: string;
}

interface DevicesDetailedProps {
  devices: Device[];
}

export const DevicesDetailed: React.FC<DevicesDetailedProps> = ({ devices }) => {
  const onlineDevices = devices.filter(d => d.isOnline);
  const offlineDevices = devices.filter(d => !d.isOnline);
  const highUsageDevices = devices.filter(d => d.percentage > 80);

  const getStatusColor = (device: Device) => {
    if (!device.isOnline) return 'text-red-400';
    if (device.percentage > 90) return 'text-red-400';
    if (device.percentage > 80) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStatusText = (device: Device) => {
    if (!device.isOnline) return 'Offline';
    if (device.percentage > 90) return 'Critical';
    if (device.percentage > 80) return 'High Usage';
    return 'Normal';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#161617] rounded-xl p-4 border border-[#161617]">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">{onlineDevices.length}</div>
            <div className="text-gray-400 text-sm">Online</div>
          </div>
        </div>
        
        <div className="bg-[#161617] rounded-xl p-4 border border-[#161617]">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-2">{offlineDevices.length}</div>
            <div className="text-gray-400 text-sm">Offline</div>
          </div>
        </div>
        
        <div className="bg-[#161617] rounded-xl p-4 border border-[#161617]">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">{highUsageDevices.length}</div>
            <div className="text-gray-400 text-sm">High Usage</div>
          </div>
        </div>
        
        <div className="bg-[#161617] rounded-xl p-4 border border-[#161617]">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">{devices.length}</div>
            <div className="text-gray-400 text-sm">Total</div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="bg-[#161617] rounded-xl p-1 border border-[#161617]">
        <h3 className="text-xl font-semibold text-white mb-4">Device Status</h3>
        
        <div className="space-y-3">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 bg-gray-600/30 rounded-lg border border-[#161617]">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: device.color }}
                />
                <div>
                  <div className="text-white font-medium">{device.name}</div>
                  <div className="text-gray-400 text-sm">
                    {device.deviceType} {device.location && `• ${device.location}`}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-white font-semibold">{device.powerValue.toFixed(1)} kW</div>
                  <div className="text-gray-400 text-sm">{device.percentage}% usage</div>
                </div>
                
                <div className="text-right">
                  {/* <div className={`text-font-semibold ${getStatusColor(device)}`}>
                    {getStatusText(device)}
                  </div> */}
                  <div className={`w-2 h-2 rounded-full ${
                    device.isOnline ? 'bg-green-500' : 'bg-red-500'
                  } ${device.isOnline && device.percentage > 80 ? 'animate-pulse' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Distribution */}
      <div className="bg-[#161617] rounded-xl p-2 border border-[#161617]">
        <h3 className="text-xl font-semibold text-white mb-4">Power Distribution</h3>
        
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{device.name}</span>
                <span className="text-white font-medium">{device.powerValue.toFixed(1)} kW</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    backgroundColor: device.color,
                    width: `${device.percentage}%`,
                    opacity: device.isOnline ? 1 : 0.3
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Types Summary */}
      <div className="bg-[#161617] rounded-xl p-2 border border-[#161617]">
        <h3 className="text-xl font-semibold text-white mb-4">Device Categories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['appliance', 'electronics', 'hvac', 'lighting'].map((type) => {
            const typeDevices = devices.filter(d => d.deviceType === type);
            const totalPower = typeDevices.reduce((sum, d) => sum + d.powerValue, 0);
            
            return (
              <div key={type} className="p-4 bg-gray-600/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium capitalize">{type}</span>
                  <span className="text-gray-400">{typeDevices.length} devices</span>
                </div>
                <div className="text-lg font-bold text-white">{totalPower.toFixed(1)} kW</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
