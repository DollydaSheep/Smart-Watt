"use client"

import React from 'react';

interface StatsProps {
  totalUsage: number;
  powerLimit: number;
  totalDevices: number;
  onClick?: () => void;
}

export const Stats: React.FC<StatsProps> = ({ totalUsage, powerLimit, totalDevices, onClick }) => {
  const usagePercentage = (totalUsage / powerLimit) * 100;
  const efficiency = Math.max(0, 100 - (usagePercentage - 80));

  return (
    <div 
      onClick={onClick}
      className="bg-[#161617] rounded-3xl p-3 border border-[#161617] dark:hover:border-gray-600/50 transition-all duration-300 aspect-square flex flex-col justify-between cursor-pointer hover:scale-105"
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div className="mb-2">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">Stats</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">Click to view details</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              usagePercentage > 100 ? 'text-red-400' : 
              usagePercentage > 80 ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {usagePercentage.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Usage</div>
          </div>
        </div>
      </div>
    </div>
  );
};
