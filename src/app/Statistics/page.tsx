'use client';

import { ChartAreaInteractive } from "@/components/areachart";
import { ChartAreaStackedExpand } from "@/components/areachart2";
import { ChartBarStacked } from "@/components/barchart";  
import { ChartLineLabel } from "@/components/linechart";
import { ChartPieInteractive } from "@/components/Piechart";
import { ChartRadialStacked } from "@/components/radialchart";
import { CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";





export default function Statistics() {
  return (
 
    <div className="flex flex-col ml-20 h-2vh w-2vh m-5 p-5">
      <div className="w-1vh h-1/2 p-5">
       
        <ChartAreaInteractive/>
        
      </div>

     <div className="flex flex-row w-full h-[40vh] gap-4 mt-5">
        
        {/* ChartBarStacked */}
        <div className="flex-1 h-full">
          <ChartBarStacked />
        </div>
          {/* ChartLineLabel */}
        <div className=" flex-1 h-full">
          <ChartAreaStackedExpand/>
        </div>

     
         {/* ChartLineLabel */}
        <div className=" flex-1 h-full">
          <ChartPieInteractive />
        </div>

          {/* ChartLineLabel */}
        <div className=" flex-1 h-full">
          <ChartRadialStacked />
        </div>

        
        


      </div>
  

    </div>
   
  );
}