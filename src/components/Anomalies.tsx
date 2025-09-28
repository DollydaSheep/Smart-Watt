"use client"

import React from 'react';

interface Device {
  id: number;
  name: string;
  powerValue: number;
  percentage: number;
  color: string;
}

interface AnomaliesProps {
  totalUsage: number;
  powerLimit: number;
  devices: Device[];
  onClick?: () => void;
}

export const Anomalies: React.FC<AnomaliesProps> = ({ totalUsage, powerLimit, devices, onClick }) => {
  // Calculate usage percentage for proper anomaly detection
  const usagePercentage = (totalUsage / powerLimit) * 100;
  const isOverLimit = usagePercentage > 100;
  const isNearLimit = usagePercentage >= 80;
  
  // Detect high usage devices (over 80%)
  const highUsageDevices = devices.filter(d => d.percentage > 80);
  
  // Calculate anomaly count based on power usage and device issues
  let anomalyCount = 0;
  if (isOverLimit) anomalyCount += 1; // Over limit is always an anomaly
  if (isNearLimit && !isOverLimit) anomalyCount += 1; // Near limit is a warning
  anomalyCount += highUsageDevices.length; // Add high usage devices
  

  const getAnomalyLevel = () => {
    // Prioritize over limit as critical (red)
    if (isOverLimit) return { level: 'critical', color: 'red', text: 'Critical alerts' };
    // Near limit or minor issues as warning (yellow)
    if (isNearLimit || anomalyCount > 0) return { level: 'warning', color: 'yellow', text: 'Minor issues' };
    // No issues (green - but container stays dark)
    return { level: 'normal', color: 'green', text: 'All normal' };
  };

  const anomalyStatus = getAnomalyLevel();

  // Get background color based on anomaly level (exclude green)
  const getBackgroundColor = () => {
    if (anomalyStatus.color === 'red') return 'rgba(239, 68, 68, 0.5)'; // Red with 50% opacity
    if (anomalyStatus.color === 'yellow') return 'rgba(245, 158, 11, 0.5)'; // Yellow with 50% opacity
    return '#161617'; // Default dark for normal/green state
  };

  const getBorderColor = () => {
    if (anomalyStatus.color === 'red') return 'rgba(239, 68, 68, 0.3)'; // Red with 30% opacity
    if (anomalyStatus.color === 'yellow') return 'rgba(245, 158, 11, 0.3)'; // Yellow with 30% opacity
    return '#161617'; // Default dark for normal/green state
  };

  return (
    <div 
      onClick={onClick}
      className="rounded-bl-full rounded-br-full rounded-tr-3xl rounded-tl-3xl p-3 hover:border-gray-600/50 transition-all duration-300 aspect-square flex flex-col justify-between cursor-pointer hover:scale-105"
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div className="mb-2">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">Anomalies</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">Show Details</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{anomalyCount}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Detected</div>
          </div>
          
          <div className="flex items-center justify-center space-x-1">
            <div className={`w-2 h-2 rounded-full bg-${anomalyStatus.color}-500 ${
              anomalyCount > 0 ? 'animate-pulse' : ''
            }`} />
            <span className={`text-${anomalyStatus.color}-400 font-medium text-xs`}>
              {anomalyStatus.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
