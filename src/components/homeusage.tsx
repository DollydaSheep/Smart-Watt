"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { AIInsights } from "./AIInsights"
import { PowerLimiterControl } from "./PowerLimiterControl"

const AnimatedNumber = ({ value }: { value: number }) => {
  const controls = useAnimation()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        opacity: [0, 1],
        y: [10, 0],
        transition: { duration: 0.5 }
      })
      
      // Animate counting up
      const duration = 1.5
      const start = 0
      const end = value
      const startTime = performance.now()
      
      const updateNumber = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / (duration * 1000), 1)
        
        // Ease out function for smooth deceleration
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        const currentValue = start + (end - start) * easedProgress
        
        setDisplayValue(Number(currentValue.toFixed(1)))
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber)
        } else {
          setDisplayValue(end)
        }
      }
      
      requestAnimationFrame(updateNumber)
    }
    
    animate()
  }, [value, controls])

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      className="inline-block"
    >
      {displayValue.toFixed(1)} kW
    </motion.span>
  )
}

interface Device {
  id: number;
  name: string;
  color: string;
  percentage: number;
  power: string;
}

interface HomeUsageProps {
  devices: Device[];
  totalDevices: number;
  totalUsage: number;
  powerLimit: number;
  onPowerLimitChange: (limit: number) => void;
}

export function HomeUsage({ devices, totalDevices, totalUsage, powerLimit, onPowerLimitChange }: HomeUsageProps) {
  // Use all devices for display
  const displayDevices = devices;
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const isDragging = useRef(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    const currentX = e.touches[0].clientX
    const diff = startX.current - currentX
    
    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0 && activeIndex < 3) {
        setActiveIndex(prev => prev + 1)
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1)
      }
      isDragging.current = false
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX
    isDragging.current = true
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return
    const currentX = e.clientX
    const diff = startX.current - currentX
    
    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0 && activeIndex < 3) {
        setActiveIndex(prev => prev + 1)
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1)
      }
      isDragging.current = false
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [activeIndex])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div 
      className="w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      ref={containerRef}
    >
      <div className="flex justify-end space-x-2 mb-2 pr-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${activeIndex === index ? 'bg-green-300' : 'bg-gray-400'}`}
            aria-label={index === 0 ? 'Show usage' : index === 1 ? 'Show connected devices' : index === 2 ? 'Show AI insights' : 'Show power limiter'}
          />
        ))}
      </div>
      
      <div className="flex transition-transform duration-300 ease-in-out"
           style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        <div className="w-full flex-shrink-0">
          <div className="w-full bg-gray-100 dark:bg-[#161617] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Usage</h3>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              <AnimatedNumber value={totalUsage} />
            </h1>
            <div className="w-full flex justify-between">
              <div className="flex gap-1 items-center">
                <TrendingUp className="text-green-300 size-4"/>
                <span className="text-green-300 text-sm">Optimized Efficiency</span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full mr-2 bg-green-300"/>
                <span className="text-green-300 text-sm">0 Anomalies</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-shrink-0">
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
                  {totalDevices} Devices
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {displayDevices.map((device) => (
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
                      <TrendingUp className='size-4' style={{ color: device.color }}/>
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
        </div>
        <div className="w-full flex-shrink-0">
          <AIInsights />
        </div>
        <div className="w-full flex-shrink-0">
          <PowerLimiterControl 
            currentUsage={totalUsage}
            powerLimit={powerLimit}
            onLimitChange={onPowerLimitChange}
          />
        </div>
      </div>
    </div>
  )
}