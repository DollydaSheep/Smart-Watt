"use client"

import { TrendingUp } from "lucide-react"

export function HomeUsage(){
  return(
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
    </div>
  )
}