"use client"

import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const devices = [
  { 
    id: 1, 
    name: 'Oven', 
    color: '#10b981',
    percentage: 35,
    power: '0.3 kW'
  },
  { 
    id: 2, 
    name: 'PC', 
    color: 'white',
    percentage: 20,
    power: '0.3 kW'
  },
  { 
    id: 3, 
    name: 'Refrigerator', 
    color: '#9333ea',
    percentage: 30,
    power: '0.3 kW'
  },
  { 
    id: 4, 
    name: 'TV', 
    color: '#3b82f6',
    percentage: 15,
    power: '0.3 kW'
  },
]

export function ConnectedDevices() {
  return (
    <div className="w-full bg-gray-100 dark:bg-[#161617] rounded-lg p-4">
      <div className='flex justify-between items-center mb-2'>
        <div className="flex items-center gap-3">
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connected Devices</h3>
        </div>
        <div className='flex items-center'>
          <div className="w-1.5 h-1.5 rounded-full mr-2 bg-green-300" />
          <span className='text-xs text-green-300'>
            {devices.length} Devices
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: device.color }}
            />
            <div className='flex justify-between items-center w-full'>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                {device.name}
              </span>
              <div className='flex items-center gap-1'>
                <TrendingUp className='text-green-300 size-4'/>
                <div className='flex flex-col'>
                  <span className='text-sm text-gray-700 dark:text-gray-300 font-semibold'>
                    ({device.percentage}%)
                  </span>
                  <span className='text-xs text-gray-800 dark:text-gray-400 font-light'>
                    {device.power}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
