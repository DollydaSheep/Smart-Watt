"use client"

import React from 'react';

interface OptimizeProps {
  totalUsage: number;
  powerLimit: number;
  devices: any[];
  onClick?: () => void;
}

export const Optimize: React.FC<OptimizeProps> = ({ totalUsage, powerLimit, devices, onClick }) => {
  // Calculate potential savings
  const overLimit = Math.max(0, totalUsage - powerLimit);
  const potentialSavings = overLimit > 0 ? overLimit : (totalUsage * 0.15); // 15% optimization potential
  const savingsPercentage = (potentialSavings / totalUsage) * 100;
  
  // Get optimization suggestions
  const getOptimizationSuggestions = () => {
    const suggestions = [];
    
    const highUsageDevices = devices.filter(d => d.percentage > 80);
    if (highUsageDevices.length > 0) {
      suggestions.push({
        type: 'reduce',
        device: highUsageDevices[0].name,
        saving: highUsageDevices[0].powerValue * 0.3,
        priority: 'high'
      });
    }
    
    if (totalUsage > powerLimit) {
      suggestions.push({
        type: 'schedule',
        device: 'Non-essential devices',
        saving: overLimit,
        priority: 'critical'
      });
    }
    
    suggestions.push({
      type: 'efficiency',
      device: 'All devices',
      saving: totalUsage * 0.1,
      priority: 'medium'
    });
    
    return suggestions.slice(0, 2);
  };

  const suggestions = getOptimizationSuggestions();

  return (
    <div 
      onClick={onClick}
      className="bg-[#161617] rounded-3xl p-3 border border-[#161617] dark:hover:border-gray-600/50 transition-all duration-300 aspect-square flex flex-col justify-between cursor-pointer hover:scale-105"
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div className="mb-2">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">Optimize</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">Click to view details</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{potentialSavings.toFixed(1)}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">kW Savings</div>
          </div>
          
          <div className="text-center">
            <div className="text-base font-semibold text-green-400">{savingsPercentage.toFixed(1)}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Potential</div>
          </div>
        </div>
      </div>
    </div>
  );
};
