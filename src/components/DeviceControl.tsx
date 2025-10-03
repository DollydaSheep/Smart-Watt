"use client"

import { useState } from "react";


export default function DeviceControl(){
  const [devices, setDevices] = useState([
    {device: "Oven", on: false, color: "#10b981"},
    {device: "Refrigerator", on: false, color: "#9333ea"},
    {device: "PC", on: false, color: "#3b82f6"},
    {device: "TV", on: false, color: "#fff"}
  ])
  
  return(
    <>
      {devices.map((device, i) => (
        <div key={i} className="flex justify-between w-full p-4 bg-[#161617] rounded-3xl items-center">
          <div className="flex items-center gap-2">
            <span className={`bg-[${device.color}] h-4 w-4 rounded-full`}></span>
            <div className="ml-2">
              <h1 className="font-medium">{device.device}</h1>
              <p className="text-gray-400 text-sm">Kitchen</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDevices(prev =>
                  prev.map((dev, idx) =>
                    idx === i ? { ...dev, on: !dev.on } : dev
                  )
                )}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  device.on ? 'bg-green-400' : 'bg-black'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    device.on ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="ml-2">
              <h1 className="text-lg font-medium">5.2 kW</h1>
              <p className="text-right text-sm text-gray-400">20%</p>
            </div>
            <span className={`${device.on ? "bg-[#10b981]" : "bg-red-400"} h-2 w-2 rounded-full`}></span>
          </div>
        </div>
      ))}
      
    </>
  )
}