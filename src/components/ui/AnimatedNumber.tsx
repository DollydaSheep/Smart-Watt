"use client"

import { useEffect, useState, useRef, useCallback } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  format?: (value: number) => string | number;
  className?: string;
}

// Easing function for smooth animation
const easeOutQuad = (t: number) => t * (2 - t);

export function AnimatedNumber({
  value,
  duration = 1.5,
  format = (n) => n,
  className = '',
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValue = useRef(0);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }
    
    const startTime = startTimeRef.current || timestamp;
    const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
    const current = startValue.current + (value - startValue.current) * easeOutQuad(progress);
    
    setDisplayValue(current);
    
    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
    }
  }, [value, duration]);

  useEffect(() => {
    startValue.current = displayValue;
    startTimeRef.current = null;
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [value, duration, animate]);

  // Format the display value
  const formattedValue = format(displayValue);

  return <span className={className}>{formattedValue}</span>;
}
