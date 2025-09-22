"use client"

import { TrendingUp, Lightbulb, Zap, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"

export function AIInsights() {
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 dark:bg-[#161617] rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-green-400 block relative z-10"
              animate={{
                opacity: [1, 0.6, 1, 1],
                scale: [1, 0.7, 1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.4, 0.8, 1]
              }}
            />
            <motion.span
              className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full border border-green-400"
              animate={{
                scale: [1, 3, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.6, 1]
              }}
            />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Insights</h3>
        </div>
        <div className="max-h-[75px] overflow-y-auto pr-2 -mr-2">
          <div className="space-y-1.5 pr-2">
        <div className="p-2 bg-transparent">
          <div className="flex items-center gap-1.5 text-yellow-300 mb-0.5">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium">Energy Saving Tip</span>
          </div>
          <p className="text-gray-200 text-xs">Your energy usage is 12% higher than usual. Consider running high-power appliances during off-peak hours.</p>
        </div>
        
        <div className="p-2 bg-transparent">
          <div className="flex items-center gap-1.5 text-green-300 mb-0.5">
            <BarChart2 className="w-4 h-4" />
            <span className="font-medium">Efficiency Score</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-1.5">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <p className="text-gray-400 text-xs mt-1">78% - Better than 65% of similar homes</p>
        </div>
        
        <div className="p-2 bg-transparent">
          <div className="flex items-center gap-1.5 text-blue-300 mb-0.5">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Appliance Analysis</span>
          </div>
          <p className="text-gray-200 text-xs">Your refrigerator is using more power than average. Consider defrosting it for better efficiency.</p>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}
