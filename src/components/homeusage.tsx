"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, ChevronRight, DollarSign } from "lucide-react"
import { Device } from "@/data/deviceData"
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

export function HomeUsage({ totalUsage, powerLimit, onPowerLimitChange }: HomeUsageProps) {
  
  // Slide panel state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Calculate total bill (assuming $0.12 per kWh and 24 hours)
  const kwhRate = 0.12; // $0.12 per kWh
  const dailyBill = totalUsage * 24 * kwhRate;
  const monthlyBill = dailyBill * 30;

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


  return (
    <div className="w-full">
      <div 
        className="w-full bg-gray-100 dark:bg-[#161617] rounded-3xl p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1a1a1b] transition-colors duration-200"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        <div className="flex items-center gap-3 mb-2">
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
          <motion.div
            animate={{ rotate: isPanelOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-auto"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold">
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
              className={`${getColorClasses('text')} text-xs`}
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
      
      {/* Slide Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-[#0f0f10] rounded-2xl mt-2 p-4 border border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Total Bill Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Total Bill</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Daily Estimate</span>
                      <span className="text-lg font-bold text-green-500">${dailyBill.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Monthly Estimate</span>
                      <span className="text-xl font-bold text-green-500">${monthlyBill.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Rate: ${kwhRate}/kWh
                    </div>
                  </div>
                </div>

                {/* Power Limit Control Section */}
                <div className="space-y-3">
                  <PowerLimiterControl
                    currentUsage={totalUsage}
                    powerLimit={powerLimit}
                    onLimitChange={onPowerLimitChange}
                    isActive={true}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}