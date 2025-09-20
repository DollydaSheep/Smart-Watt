"use client"


import Image from "next/image";
import { Visualization3D } from "@/components/Visualization3D";
import { TrendingUp } from "lucide-react";



export default function Home() {
  return (
    <div className="font-sans h-screen w-full p-4 sm:p-6 md:p-10 pt-15 md:pt-16 flex items-center justify-center overflow-hidden">
      <main className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 w-full max-w-7xl mx-auto md:mt-12">
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {/* <div className="w-full max-w-[500px] mx-auto md:mx-0">
            <Image
              className="w-full h-auto"
              src="/SVG/smartwattWhite.svg"
              alt="SmartWatt Logo"
              width={620}
              height={124}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </div> */}
          <div className="w-full bg-gray-100 dark:bg-[#161617] rounded-lg p-4 mb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total Usage</h3>
            <h1 className="text-4xl font-bold text-green-300 mb-2">10.3 kW</h1>
            <div className="w-full flex justify-between">
              <div className="flex gap-1 items-center">
                <TrendingUp className="text-green-300 size-4"/>
                <span className="text-green-300 text-sm">Optimized Efficiency</span>
              </div>
              <div className="flex items-center">
                <div 
                  className="w-1.5 h-1.5 rounded-full mr-2 bg-green-300"
                />
                <span className="text-green-300 text-sm">0 Anomalies</span>
              </div>
            </div>
            <span></span>
          </div>
        </div>
        <Visualization3D />
      </main>
    </div>
  );
}
