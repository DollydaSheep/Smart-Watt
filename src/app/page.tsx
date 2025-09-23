"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Visualization3D } from "@/components/Visualization3D";
import { HomeUsage } from "@/components/homeusage";
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
            totalDevices={totalDevices}
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
