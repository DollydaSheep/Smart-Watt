"use client"

import React from 'react';

interface StatsDetailedProps {
  totalUsage: number;
  powerLimit: number;
  totalDevices: number;
}

export const StatsDetailed: React.FC<StatsDetailedProps> = ({ totalUsage, powerLimit, totalDevices }) => {
  const usagePercentage = (totalUsage / powerLimit) * 100;
  const efficiency = Math.max(0, 100 - (usagePercentage - 80));
  const remainingCapacity = Math.max(0, powerLimit - totalUsage);

  return (
    <div className="space-y-6 -mt-4">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161617]  rounded-xl p-4 border border-[#161617] ">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{totalUsage.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">Current Usage (kW)</div>
          </div>
        </div>
        
        <div className="bg-[#161617] rounded-xl p-4 border border-[#161617]">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{powerLimit.toFixed(1)}</div>
            <div className="text-gray-400 text-sm">Power Limit (kW)</div>
          </div>
        </div>
        
        <div className="bg-[#161617] rounded-xl p-4 border border-[#161617]">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{remainingCapacity.toFixed(1)}</div>
            <div className="text-gray-400 text-sm">Available (kW)</div>
          </div>
        </div>
      </div>

      {/* Usage Progress */}
      <div className="bg-[#161617] rounded-xl p-6 border border-gray-600/50">
        <h3 className="text-xl font-semibold text-white mb-4">Power Usage Overview</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Usage Percentage</span>
            <span className={`font-bold text-lg ${
              usagePercentage > 100 ? 'text-red-400' : 
              usagePercentage > 80 ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {usagePercentage.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-600 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                usagePercentage > 100 ? 'bg-red-500' : 
                usagePercentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          
          {usagePercentage > 100 && (
            <div className="text-red-400 text-sm font-medium">
              ⚠️ Power limit exceeded by {(usagePercentage - 100).toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#161617] rounded-xl p-6 border border-gray-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">Device Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Devices</span>
              <span className="text-white font-semibold">{totalDevices}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Average per Device</span>
              <span className="text-white font-semibold">{(totalUsage / totalDevices).toFixed(2)} kW</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Efficiency Rating</span>
              <span className={`font-semibold ${
                efficiency > 80 ? 'text-green-400' :
                efficiency > 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {efficiency.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#161617] rounded-xl p-6 border border-[#161617]">
          <h3 className="text-lg font-semibold text-white mb-4">Usage Trends</h3>
          <div className="space-y-4">
            {/* Simulated hourly usage chart */}
            <div className="flex items-end space-x-1 h-24">
              {[...Array(24)].map((_, i) => {
                const height = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 20;
                return (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-blue-500/60 to-blue-400/80 rounded-t flex-1"
                    style={{ height: `${height}%` }}
                    title={`Hour ${i}: ${(totalUsage * (0.7 + Math.random() * 0.6)).toFixed(1)} kW`}
                  />
                );
              })}
            </div>
            <div className="text-xs text-gray-400 text-center">24-Hour Usage Pattern</div>
          </div>
        </div>
      </div>
    </div>
  );
};
