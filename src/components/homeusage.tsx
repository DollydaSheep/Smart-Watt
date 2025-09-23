"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { Device } from "@/data/deviceData"
import { AIInsights } from "./AIInsights"
import { PowerLimiterControl } from "./PowerLimiterControl"

const AnimatedNumber = ({ value, colorClass = "text-white" }: { value: number; colorClass?: string }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Initial count-up animation
  useEffect(() => {
    if (!hasAnimated) {
      setDisplayValue(0) // Start from 0
      const duration = 1500
      const startTime = performance.now()
      
      const animateNumber = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        const currentValue = value * easedProgress
        
        setDisplayValue(Number(currentValue.toFixed(1)))
        
        if (progress < 1) {
          requestAnimationFrame(animateNumber)
        } else {
          setDisplayValue(value)
          setHasAnimated(true)
        }
      }
      
      // Delay the start slightly to ensure smooth intro
      setTimeout(() => {
        requestAnimationFrame(animateNumber)
      }, 100)
    }
  }, [value, hasAnimated])

  // Handle value updates after initial animation
  useEffect(() => {
    if (hasAnimated && Math.abs(value - displayValue) > 0.1) {
      setIsAnimating(true)
      const duration = 800
      const startValue = displayValue
      const startTime = performance.now()
      
      const updateNumber = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const easedProgress = 1 - Math.pow(1 - progress, 2)
        const currentValue = startValue + (value - startValue) * easedProgress
        
        setDisplayValue(Number(currentValue.toFixed(1)))
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber)
        } else {
          setDisplayValue(value)
          setIsAnimating(false)
        }
      }
      
      requestAnimationFrame(updateNumber)
    }
  }, [value, hasAnimated, displayValue])

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-block ${colorClass}`}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      style={{
        transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease-out'
      }}
    >
      {displayValue.toFixed(1)} kW
    </motion.span>
  )
}

// Device interface imported from @/data/deviceData

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

  // Calculate usage percentage and determine colors
  const usagePercentage = (totalUsage / powerLimit) * 100;
  const isOverLimit = usagePercentage > 100;
  const isNearLimit = usagePercentage >= 80;

  // Color logic: green (0-79%) -> yellow (80-99%) -> red (100%+)
  const getStatusColor = () => {
    if (isOverLimit) return 'red';
    if (isNearLimit) return 'yellow';
    return 'white';
  };

  const getColorClasses = (type: 'bg' | 'text' | 'border') => {
    const status = getStatusColor();
    
    switch (status) {
      case 'red':
        if (type === 'bg') return 'bg-red-500';
        if (type === 'text') return 'text-red-400';
        return 'border-red-500';
      case 'yellow':
        if (type === 'bg') return 'bg-yellow-500';
        if (type === 'text') return 'text-yellow-400';
        return 'border-yellow-500';
      default:
        if (type === 'bg') return 'bg-green-400';
        if (type === 'text') return 'text-green-300';
        return 'border-green-400';
    }
  };

  const getKwColorClass = () => {
    const status = getStatusColor();
    
    switch (status) {
      case 'red':
        return 'text-red-400';
      case 'yellow':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

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
                  className={`w-2.5 h-2.5 rounded-full ${getColorClasses('bg')} block relative z-10`}
                  animate={{
                    opacity: [1, 0.6, 1, 1],
                    scale: isOverLimit ? [1, 1.3, 1, 1] : [1, 0.7, 1, 1], // Pulse more when over limit
                  }}
                  transition={{
                    duration: isOverLimit ? 1.5 : 3, // Faster pulse when over limit
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.4, 0.8, 1]
                  }}
                  layout
                  layoutId="status-dot"
                />
                <motion.span
                  className={`absolute top-0 left-0 w-2.5 h-2.5 rounded-full border ${getColorClasses('border')}`}
                  animate={{
                    scale: [1, 3, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: isOverLimit ? 1.5 : 3, // Faster pulse when over limit
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.6, 1]
                  }}
                  layout
                  layoutId="status-ring"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Usage</h3>
            </div>
            <h1 className="text-4xl font-bold mb-1">
              <AnimatedNumber value={totalUsage} colorClass={getKwColorClass()} />
            </h1>
            <div className="w-full flex justify-between">
              <div className="flex gap-1 items-center">
                <motion.div
                  className={`${getColorClasses('text')} size-4`}
                  layout
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <TrendingUp className="size-4"/>
                </motion.div>
                <motion.span 
                  className={`${getColorClasses('text')} text-sm`}
                  layout
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isOverLimit ? 'Over Limit!' : isNearLimit ? 'Near Limit' : 'Optimized Efficiency'}
                </motion.span>
              </div>
              <div className="flex items-center">
                <motion.div 
                  className={`w-1.5 h-1.5 rounded-full mr-2 ${getColorClasses('bg')}`}
                  layout
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span 
                  className={`${getColorClasses('text')} text-sm`}
                  layout
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isOverLimit ? '1 Anomalies' : isNearLimit ? '1 Anomalies' : '0 Anomalies'}
                </motion.span>
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
        </div>
        <div className="w-full flex-shrink-0">
          <AIInsights />
        </div>
        <div className="w-full flex-shrink-0">
          <PowerLimiterControl 
            currentUsage={totalUsage}
            powerLimit={powerLimit}
            onLimitChange={onPowerLimitChange}
            isActive={activeIndex === 3}
          />
        </div>
      </div>
    </div>
  )
}