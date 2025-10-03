
import DeviceControl from "@/components/DeviceControl";
import Image from "next/image";
import { useState } from "react";

export default function DevicesPage(){

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

          <DeviceControl />

        </div>
      </div>
    </>
  )
}