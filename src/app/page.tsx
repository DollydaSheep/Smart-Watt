"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Visualization3D } from "@/components/Visualization3D";
import { HomeUsage } from "@/components/homeusage";
import { Stats } from "@/components/Stats";
import { Devices } from "@/components/Devices";
import { Anomalies } from "@/components/Anomalies";
import { Optimize } from "@/components/Optimize";
import { Modal } from "@/components/Modal";
import { StatsDetailed } from "@/components/StatsDetailed";
import { DevicesDetailed } from "@/components/DevicesDetailed";
import { AnomaliesDetailed } from "@/components/AnomaliesDetailed";
import { OptimizeDetailed } from "@/components/OptimizeDetailed";
import { 
  getCurrentDeviceData, 
  getTotalDeviceCount, 
  getTotalPowerUsage,
  DeviceDataManager 
} from "@/data/deviceData";

export default function Home() {
  const [powerLimit, setPowerLimit] = useState(15.0);
  const [deviceData, setDeviceData] = useState(getCurrentDeviceData());
  const [totalUsage, setTotalUsage] = useState(getTotalPowerUsage());
  const [totalDevices, setTotalDevices] = useState(getTotalDeviceCount());
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(false);

  // Update data periodically (simulating real-time sensor updates)
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Simulate real-time data updates
      DeviceDataManager.simulateRealTimeUpdates();
      
      // Update state with fresh data
      setDeviceData(getCurrentDeviceData());
      setTotalUsage(getTotalPowerUsage());
      setTotalDevices(getTotalDeviceCount());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="font-sans min-h-screen w-full">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-5 sm:px-6 md:px-10 py-5 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Image
            src="/SVG/swnotitleWhite.svg"
            alt="Smart Watt Logo"
            width={150}
            height={40}
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white text-xs font-medium">Show Labels</span>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              showLabels ? 'bg-gray-600' : 'bg-black'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                showLabels ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </header>
      
      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-20 min-h-screen flex flex-col">
        {/* Mobile: Scrollable Layout */}
        <div className="md:hidden w-full">
          <main className="flex flex-col w-full max-w-7xl mx-auto p-4 pb-24 space-y-3">
            {/* 3D Visualization - now scrollable */}
            <div className="w-full max-w-[400px] mx-auto">
              <Visualization3D 
                devices={deviceData}
                totalUsage={totalUsage}
                powerLimit={powerLimit}
                showLabels={showLabels}
              />
            </div>
            
            {/* Home Usage Component */}
            <HomeUsage 
              devices={deviceData}
              totalDevices={totalDevices}
              totalUsage={totalUsage}
              powerLimit={powerLimit}
              onPowerLimitChange={setPowerLimit}
            />
            
            {/* 2x2 Grid for Stats, Devices, Anomalies, Optimize */}
            <div className="grid grid-cols-2 gap-3">
              <Stats 
                totalUsage={totalUsage}
                powerLimit={powerLimit}
                totalDevices={totalDevices}
                onClick={() => setExpandedComponent('stats')}
              />
              <Devices 
                devices={deviceData}
                onClick={() => setExpandedComponent('devices')}
              />
              <Anomalies 
                totalUsage={totalUsage}
                powerLimit={powerLimit}
                devices={deviceData}
                onClick={() => setExpandedComponent('anomalies')}
              />
              <Optimize 
                totalUsage={totalUsage}
                powerLimit={powerLimit}
                devices={deviceData}
                onClick={() => setExpandedComponent('optimize')}
              />
            </div>
          </main>
        </div>

        {/* Desktop: Original layout */}
        <main className="hidden md:flex flex-row flex-1 gap-2 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-10 overflow-hidden">
          {/* Fixed 3D Visualization and Home Usage */}
          <div className="flex flex-col w-full max-w-2xl md:max-w-lg md:flex-shrink-0 space-y-1">
            <div className="w-full max-w-[500px] mx-auto md:mx-0">
               <Visualization3D 
            devices={deviceData}
            totalUsage={totalUsage}
            powerLimit={powerLimit}
            showLabels={showLabels}
          />
            </div>
            {/* Home Usage Component - Fixed with 3D Visualization */}
            <HomeUsage 
              devices={deviceData}
              totalDevices={totalDevices}
              totalUsage={totalUsage}
              powerLimit={powerLimit}
              onPowerLimitChange={setPowerLimit}
            />
          </div>
          
          {/* Scrollable Grid Content */}
          <div className="w-full md:w-1/2 md:pl-4 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2">
            {/* 2x2 Grid for Stats, Devices, Anomalies, Optimize */}
            <div className="grid grid-cols-2 gap-3 auto-rows-fr h-full">
              <Stats 
                totalUsage={totalUsage}
                powerLimit={powerLimit}
                totalDevices={totalDevices}
                onClick={() => setExpandedComponent('stats')}
              />
              <Devices 
                devices={deviceData}
                onClick={() => setExpandedComponent('devices')}
              />
              <Anomalies 
                totalUsage={totalUsage}
                powerLimit={powerLimit}
                devices={deviceData}
                onClick={() => setExpandedComponent('anomalies')}
              />
              <Optimize 
                totalUsage={totalUsage}
                powerLimit={powerLimit}
                devices={deviceData}
                onClick={() => setExpandedComponent('optimize')}
              />
            </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for expanded views */}
      <Modal
        isOpen={expandedComponent !== null}
        onClose={() => setExpandedComponent(null)}
        title={
          expandedComponent === 'stats' ? 'Power Statistics' :
          expandedComponent === 'devices' ? 'Device Management' :
          expandedComponent === 'anomalies' ? 'Anomaly Detection' :
          expandedComponent === 'optimize' ? 'Power Optimization' : ''
        }
      >
        {expandedComponent === 'stats' && (
          <StatsDetailed
            totalUsage={totalUsage}
            powerLimit={powerLimit}
            totalDevices={totalDevices}
          />
        )}
        {expandedComponent === 'devices' && (
          <DevicesDetailed devices={deviceData} />
        )}
        {expandedComponent === 'anomalies' && (
          <AnomaliesDetailed
            totalUsage={totalUsage}
            powerLimit={powerLimit}
            devices={deviceData}
          />
        )}
        {expandedComponent === 'optimize' && (
          <OptimizeDetailed
            totalUsage={totalUsage}
            powerLimit={powerLimit}
            devices={deviceData}
          />
        )}
      </Modal>
    </div>
  );
}
