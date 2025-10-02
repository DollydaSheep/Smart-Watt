"use client"

import Image from "next/image";
import { useState } from "react";

export default function DevicesPage(){

  const [turnOn, setTurnOn] = useState([false,false,false,false]);

  const toggleDevice = (index: number) => {
    setTurnOn(prev => {
      const updated = [...prev];      // copy the array
      updated[index] = !updated[index]; // toggle only the clicked device
      return updated;
    });
  };

  return (
    <>
      <div className="font-sans min-h-screen w-full">
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
        </header>
        <div className="pt-25 min-h-screen flex flex-col p-4 gap-2">

          <div className="p-4 w-full flex flex-col bg-[#161617] rounded-3xl gap-1">
            <div className="w-full flex justify-between">
              <h1>Total Devices</h1>
              <h1 className="mr-2">Total Usage</h1>
            </div>
            <div className="w-full flex justify-between">
              <h1 className="text-4xl font-bold ml-2">4</h1>
              <h1 className="text-4xl font-bold">14.4 kW</h1>
            </div>
            <div className="relative w-full flex bg-gray-200 mt-2 h-2 rounded-full overflow-hidden">
              <div className="w-[25%] h-2 bg-[#10b981]"></div>
              <div className="w-[35%] h-2 bg-[#9333ea]"></div>
              <div className="w-[15%] h-2 bg-[#3b82f6]"></div>
              <div className="w-[25%] h-2 bg-[#fff]"></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#161617] w-fit">
            <h1 className="text-sm">Sort by Size</h1>
          </div>

          {/* Oven */}
          <div className="flex justify-between w-full p-4 bg-[#161617] rounded-3xl items-center">
            <div className="flex items-center gap-2">
              <span className="bg-[#10b981] h-4 w-4 rounded-full"></span>
              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-medium">Oven</h1>
                  <p className={`px-2 ${turnOn[0] ? "bg-green-600" : "bg-red-600"} rounded-full text-sm ${turnOn[0] ? "text-green-100" : "tex-red-100"}`}>{turnOn[0] ? "active" : "inactive"}</p>
                </div>
                <p className="text-gray-400 text-sm">Kitchen</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDevice(0)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    turnOn[0] ? 'bg-green-400' : 'bg-black'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      turnOn[0] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="ml-2">
                <h1 className="text-lg font-medium">5.2 kW</h1>
                <p className="text-right text-sm text-gray-400">20%</p>
              </div>
              <span className={`${turnOn[0] ? "bg-[#10b981]" : "bg-red-400"} h-2 w-2 rounded-full`}></span>
            </div>
          </div>

          {/* Refrigerator */}
          <div className="flex justify-between w-full p-4 bg-[#161617] rounded-3xl items-center">
            <div className="flex items-center gap-2">
              <span className="bg-[#9333ea] h-4 w-4 rounded-full"></span>
              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-medium">Refrigerator</h1>
                  <p className={`px-2 ${turnOn[1] ? "bg-green-600" : "bg-red-600"} rounded-full text-sm ${turnOn[1] ? "text-green-100" : "tex-red-100"}`}>{turnOn[1] ? "active" : "inactive"}</p>
                </div>
                <p className="text-gray-400 text-sm">Kitchen</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDevice(1)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    turnOn[1] ? 'bg-green-400' : 'bg-black'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      turnOn[1] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="ml-2">
                <h1 className="text-lg font-medium">5.2 kW</h1>
                <p className="text-right text-sm text-gray-400">20%</p>
              </div>
              <span className={`${turnOn[1] ? "bg-[#10b981]" : "bg-red-400"} h-2 w-2 rounded-full`}></span>
            </div>
          </div>
          
          {/* PC */}
          <div className="flex justify-between w-full p-4 bg-[#161617] rounded-3xl items-center">
            <div className="flex items-center gap-2">
              <span className="bg-[#3b82f6] h-4 w-4 rounded-full"></span>
              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-medium">PC</h1>
                  <p className={`px-2 ${turnOn[2] ? "bg-green-600" : "bg-red-600"} rounded-full text-sm ${turnOn[2] ? "text-green-100" : "tex-red-100"}`}>{turnOn[2] ? "active" : "inactive"}</p>
                </div>
                <p className="text-gray-400 text-sm">Office</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDevice(2)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    turnOn[2] ? 'bg-green-400' : 'bg-black'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      turnOn[2] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="ml-2">
                <h1 className="text-lg font-medium">5.2 kW</h1>
                <p className="text-right text-sm text-gray-400">20%</p>
              </div>
              <span className={`${turnOn[2] ? "bg-[#10b981]" : "bg-red-400"} h-2 w-2 rounded-full`}></span>
            </div>
          </div>

          {/* TV */}
          <div className="flex justify-between w-full p-4 bg-[#161617] rounded-3xl items-center">
            <div className="flex items-center gap-2">
              <span className="bg-[#fff] h-4 w-4 rounded-full"></span>
              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-medium">TV</h1>
                  <p className={`px-2 ${turnOn[3] ? "bg-green-600" : "bg-red-600"} rounded-full text-sm ${turnOn[3] ? "text-green-100" : "tex-red-100"}`}>{turnOn[3] ? "active" : "inactive"}</p>
                </div>
                <p className="text-gray-400 text-sm">Living Room</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDevice(3)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    turnOn[3] ? 'bg-green-400' : 'bg-black'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      turnOn[3] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="ml-2">
                <h1 className="text-lg font-medium">5.2 kW</h1>
                <p className="text-right text-sm text-gray-400">20%</p>
              </div>
              <span className={`${turnOn[3] ? "bg-[#10b981]" : "bg-red-400"} h-2 w-2 rounded-full`}></span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}