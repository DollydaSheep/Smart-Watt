"use client"

import React from 'react';

interface Device {
  id: number;
  name: string;
  powerValue: number;
  percentage: number;
  color: string;
}

interface OptimizeDetailedProps {
  totalUsage: number;
  powerLimit: number;
  devices: Device[];
}

export const OptimizeDetailed: React.FC<OptimizeDetailedProps> = ({ totalUsage, powerLimit, devices }) => {
  const overLimit = Math.max(0, totalUsage - powerLimit);
  const potentialSavings = overLimit > 0 ? overLimit : (totalUsage * 0.15);
  const savingsPercentage = (potentialSavings / totalUsage) * 100;

  const getOptimizationSuggestions = () => {
    const suggestions = [];
    
    const highUsageDevices = devices.filter(d => d.percentage > 80);
    if (highUsageDevices.length > 0) {
      highUsageDevices.forEach(device => {
        suggestions.push({
          type: 'reduce',
          device: device.name,
          saving: device.powerValue * 0.3,
          priority: device.percentage > 95 ? 'critical' : 'high',
          description: `Reduce ${device.name} usage by optimizing settings or scheduling`
        });
      });
    }
    
    if (totalUsage > powerLimit) {
      suggestions.push({
        type: 'schedule',
        device: 'Non-essential devices',
        saving: overLimit,
        priority: 'critical',
        description: 'Schedule non-essential devices to run during off-peak hours'
      });
    }
    
    suggestions.push({
      type: 'efficiency',
      device: 'All devices',
      saving: totalUsage * 0.1,
      priority: 'medium',
      description: 'Implement energy-efficient settings across all devices'
    });
    
    return suggestions;
  };

  const suggestions = getOptimizationSuggestions();

  return (
    <div className="space-y-6">
      {/* Savings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">{potentialSavings.toFixed(1)}</div>
            <div className="text-green-300 text-sm">kW Potential Savings</div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">{savingsPercentage.toFixed(1)}%</div>
            <div className="text-blue-300 text-sm">Efficiency Gain</div>
          </div>
        </div>
        
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">${(potentialSavings * 0.12 * 24 * 30).toFixed(0)}</div>
            <div className="text-purple-300 text-sm">Monthly Savings</div>
          </div>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="bg-[#161617] rounded-xl p-1 border border-[#161617]">
        <h3 className="text-xl font-semibold text-white mb-4">Optimization Recommendations</h3>
        
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              suggestion.priority === 'critical' ? 'bg-red-500/10 border-red-500/20' :
              suggestion.priority === 'high' ? 'bg-yellow-500/10 border-yellow-500/20' :
              'bg-green-500/10 border-green-500/20'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    suggestion.priority === 'critical' ? 'bg-red-500' :
                    suggestion.priority === 'high' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <div className="text-white font-semibold">
                      {suggestion.type === 'reduce' ? 'Reduce Usage' :
                       suggestion.type === 'schedule' ? 'Schedule Devices' :
                       'Improve Efficiency'}
                    </div>
                    <div className="text-gray-400 text-sm">{suggestion.device}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">-{suggestion.saving.toFixed(1)} kW</div>
                  <div className={`text-xs font-medium ${
                    suggestion.priority === 'critical' ? 'text-red-400' :
                    suggestion.priority === 'high' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {suggestion.priority.toUpperCase()}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{suggestion.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Device Efficiency Analysis */}
      <div className="bg-[#161617] rounded-xl p-1 border border-[#161617]">
        <h3 className="text-xl font-semibold text-white mb-4">Device Efficiency Analysis</h3>
        
        <div className="space-y-4">
          {devices.map((device) => {
            const efficiency = 100 - device.percentage;
            const potentialDeviceSaving = device.powerValue * 0.2;
            
            return (
              <div key={device.id} className="p-4 bg-gray-600/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="text-white font-medium">{device.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{device.powerValue.toFixed(1)} kW</div>
                    <div className="text-gray-400 text-sm">{device.percentage}% usage</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">Efficiency:</span>
                    <div className={`font-semibold ${
                      efficiency > 80 ? 'text-green-400' :
                      efficiency > 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {efficiency.toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-green-400 text-sm">
                    Potential: -{potentialDeviceSaving.toFixed(1)} kW
                  </div>
                </div>
                
                <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      efficiency > 80 ? 'bg-green-500' :
                      efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${efficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
