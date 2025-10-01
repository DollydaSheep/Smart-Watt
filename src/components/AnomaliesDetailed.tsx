"use client"

import React from 'react';

interface Device {
  id: number;
  name: string;
  powerValue: number;
  percentage: number;
  color: string;
}

interface AnomaliesDetailedProps {
  totalUsage: number;
  powerLimit: number;
  devices: Device[];
}

export const AnomaliesDetailed: React.FC<AnomaliesDetailedProps> = ({ totalUsage, powerLimit, devices }) => {
  const isOverLimit = totalUsage > powerLimit;
  const highUsageDevices = devices.filter(d => d.percentage > 90);
  const anomalyCount = (isOverLimit ? 1 : 0) + highUsageDevices.length;

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-2">{anomalyCount}</div>
            <div className="text-red-300 text-sm">Active Alerts</div>
          </div>
        </div>
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">{highUsageDevices.length}</div>
            <div className="text-yellow-300 text-sm">High Usage</div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-blue-300 text-sm">Monitoring</div>
          </div>
        </div>
      </div>

      {/* Current Alerts */}
      <div className="bg-[#161617] rounded-xl p-2 border border-[#161617]">
        <h3 className="text-xl font-semibold text-white mb-4">Current Alerts</h3>
        
        <div className="space-y-3">
          {isOverLimit && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <div>
                    <div className="text-red-400 font-semibold">Power Limit Exceeded</div>
                    <div className="text-red-300 text-sm">Current usage exceeds the set power limit</div>
                  </div>
                </div>
                <div className="text-red-400 font-bold">
                  +{((totalUsage / powerLimit - 1) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          )}
          
          {highUsageDevices.map((device) => (
            <div key={device.id} className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                  <div>
                    <div className="text-yellow-400 font-semibold">{device.name} High Usage</div>
                    <div className="text-yellow-300 text-sm">Device consuming above normal levels</div>
                  </div>
                </div>
                <div className="text-yellow-400 font-bold">
                  {device.percentage}%
                </div>
              </div>
            </div>
          ))}
          
          {anomalyCount === 0 && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
              <div className="text-green-400 font-semibold">All Systems Normal</div>
              <div className="text-green-300 text-sm">No anomalies detected</div>
            </div>
          )}
        </div>
      </div>

      {/* Detection History */}
      <div className="bg-[#161617] rounded-xl p-2 border border-[#161617]">
        <h3 className="text-xl font-semibold text-white mb-4">24-Hour Detection Pattern</h3>
        
        <div className="flex items-end space-x-1 h-32 mb-4">
          {[...Array(24)].map((_, i) => {
            const hasAnomaly = Math.random() > 0.8;
            const height = hasAnomaly ? 80 + Math.random() * 20 : 20 + Math.random() * 40;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-300 ${
                  hasAnomaly ? 'bg-red-500/60' : 'bg-gray-600/40'
                }`}
                style={{ height: `${height}%` }}
                title={`Hour ${i}: ${hasAnomaly ? 'Anomaly detected' : 'Normal'}`}
              />
            );
          })}
        </div>
        
        <div className="text-xs text-gray-400 text-center">
          Hourly anomaly detection over the past 24 hours
        </div>
      </div>
    </div>
  );
};
