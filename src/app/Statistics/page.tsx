'use client';


import { ChartAreaInteractive } from "@/components/areachart";
import { ChartPieInteractive } from "@/components/Piechart";
import { ChartRadialStacked } from "@/components/radialchart";
import { ChartBarStacked } from "@/components/barchart";





export default function Statistics() {
  return (
    
    <div className="w-full min-h-screen p-4 md:pl-24 space-y-6 md:flex">
      {/* Top Section - Full Width */}
      <div className="w-full">
        <div className="bg-card rounded-xl p-4 sm:p-6 w-full h-auto overflow-visible space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-4xl sm:text-xxl font-bold tracking-wider">STATISTICS</h2>
          </div>
          <div className="w-full h-full min-w-0">
            <div className="w-full h-full relative">
              <ChartAreaInteractive/>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-row-3 gap-6 mt-20 md:mt-4">
        {/* Pie Chart */}
        <div className="bg-card rounded-xl p-4 overflow-hidden">
          <div className="w-full md:w-5/6 h-[300px] md:h-[175px] lg:h-[200px] -m-2">
            <ChartPieInteractive />
          </div>
        </div>

        {/* Radial Chart */}
        <div className="bg-card rounded-xl p-4 overflow-hidden">
          <div className="w-full md:w-5/6 h-[300px] md:h-[175px] lg:h-[200px] -m-2">
            <ChartRadialStacked />
          </div>
        </div>
        
        {/* Bar Chart */}
        <div className="bg-card rounded-xl p-4 overflow-hidden">
          <div className="w-full md:w-5/6 h-[300px] md:h-[175px] lg:h-[200px] -m-2">
            <ChartBarStacked />
          </div>
        </div>
      </div>
    </div>
   
  );
}
