'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';

interface PowerLimiterControlProps {
  currentUsage: number;
  powerLimit: number;
  onLimitChange: (newLimit: number) => void;
}

export function PowerLimiterControl({ currentUsage, powerLimit, onLimitChange }: PowerLimiterControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempLimit, setTempLimit] = useState(powerLimit);

  const usagePercentage = (currentUsage / powerLimit) * 100;


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string, digits, and one decimal point with digits after
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTempLimit(value === '' ? 0 : parseFloat(value) || 0);
    }
  };

  const handleInputBlur = () => {
    if (tempLimit > 0) {
      onLimitChange(tempLimit);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (tempLimit > 0) {
        onLimitChange(tempLimit);
      }
      e.currentTarget.blur();
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Collapsed State */}
      <motion.div
        className="bg-gray-100 dark:bg-[#161617] rounded-2xl p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-gray-900 dark:text-white font-medium text-lg">
                {powerLimit.toFixed(1)} kW
              </div>
              <div className="text-gray-700 dark:text-gray-400 text-sm">Power limit</div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded State */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-gray-100 dark:bg-[#161617] rounded-2xl p-4 overflow-hidden"
          >
            <div className="space-y-4">
              {/* Header */}
             

              {/* Current Usage Display */}
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-emerald-400 font-medium">
                    {currentUsage.toFixed(1)} kW
                  </div>
                  <div className="text-gray-700 dark:text-gray-400 text-sm">Used today</div>
                </div>
              </div>

              {/* Power Limit Input */}
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-400 text-sm font-medium">
                  Power Limit (kW)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempLimit === 0 ? '' : tempLimit.toString()}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter limit..."
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">kW</span>
                </div>
              </div>


              {/* Usage Status */}
              <div className="pt-2 border-t border-gray-300 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Usage</span>
                  <span className={`font-medium ${
                    usagePercentage > 100 ? 'text-red-400' : 
                    usagePercentage > 80 ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {usagePercentage.toFixed(0)}% of limit
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      usagePercentage > 100 ? 'bg-red-500' : 
                      usagePercentage > 80 ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
