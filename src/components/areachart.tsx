"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent  } from "@/components/ui/chart"
import { getCurrentDeviceData, getTotalPowerUsage } from "@/data/deviceData"

export const description = "An interactive area chart"

export const ChartAreaInteractive = () => {
  const [selectedMonth, setSelectedMonth] = React.useState('May')
  const [visibleMonths, setVisibleMonths] = React.useState(['April', 'May', 'June'])
  
  // Generate data based on all current devices
  const devices = getCurrentDeviceData();
  
  // Generate monthly data for all devices
  const monthlyData = React.useMemo(() => {
    const generateDayData = (monthMultiplier: number = 1.0) => {
      return Array.from({ length: 5 }, (_, i) => {
        const day = i === 0 ? 1 : (i + 1) * 7;
        
        const dayData: any = {
          date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          day,
        };
        
        // Add each device's power data with variations
        devices.forEach((device, index) => {
          const variation = (Math.random() - 0.5) * 0.3;
          const deviceKey = `device${index + 1}`;
          dayData[deviceKey] = Math.max(0.1, device.powerValue * monthMultiplier * (1 + variation));
        });
        
        return dayData;
      });
    };

    return {
      January: generateDayData(1.0),
      February: generateDayData(0.9),
      March: generateDayData(1.1),
      April: generateDayData(0.8),
      May: generateDayData(1.0),
      June: generateDayData(0.7),
      July: generateDayData(1.2),
      August: generateDayData(1.1),
      September: generateDayData(0.9),
      October: generateDayData(1.0),
      November: generateDayData(1.1),
      December: generateDayData(1.3),
    };
  }, [devices]);

  const months = Object.keys(monthlyData);
  const currentData = monthlyData[selectedMonth as keyof typeof monthlyData];
  
  const monthIndex = months.findIndex(month => month === selectedMonth);
  const isFirstMonth = monthIndex === 0;
  const isLastMonth = monthIndex === months.length - 1;
  
  const navigateMonths = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && !isFirstMonth) {
      const newIndex = Math.max(0, monthIndex - 1);
      setSelectedMonth(months[newIndex]);
      
      if (newIndex < months.indexOf(visibleMonths[0])) {
        const newVisible = months.slice(Math.max(0, newIndex - 1), Math.max(3, newIndex + 2));
        setVisibleMonths(newVisible);
      }
    } else if (direction === 'next' && !isLastMonth) {
      const newIndex = Math.min(months.length - 1, monthIndex + 1);
      setSelectedMonth(months[newIndex]);
      
      if (newIndex > months.indexOf(visibleMonths[visibleMonths.length - 1])) {
        const newVisible = months.slice(Math.max(0, newIndex - 1), Math.min(months.length, newIndex + 2));
        setVisibleMonths(newVisible);
      }
    }
  };
  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateMonths('next'),
    onSwipedRight: () => navigateMonths('prev'),
    preventScrollOnSwipe: true,
    trackMouse: true
  });
  
  const formatDay = (day: number) => {
    if (day === 1 || day === 21 || day === 31) return `${day}st`
    if (day === 2 || day === 22) return `${day}nd`
    if (day === 3 || day === 23) return `${day}rd`
    return `${day}th`
  };

  // Create dynamic chart config for all devices
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    devices.forEach((device, index) => {
      const deviceKey = `device${index + 1}`;
      config[deviceKey] = {
        label: device.name,
        color: `var(--chart-${index + 1})`,
      };
    });
    return config;
  }, [devices]);

  return (
    <Card className="bg-transparent h-full border-transparent shadow-lg rounded-2xl" {...swipeHandlers}>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0 md:hidden"
              onClick={() => navigateMonths('prev')}
              disabled={isFirstMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex justify-center">
              <CardTitle className="text-lg font-medium text-center text-white/50">{selectedMonth} 2025</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0 md:hidden"
              onClick={() => navigateMonths('next')}
              disabled={isLastMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0"
              onClick={() => navigateMonths('prev')}
              disabled={isFirstMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-1 overflow-hidden">
              {visibleMonths.map((month) => (
                <Button
                  key={month}
                  variant="ghost"
                  size="sm"
                  className={`min-w-[60px] text-xs h-8 px-2 transition-all ${
                    selectedMonth === month 
                      ? 'bg-white/10 text-white' 
                      : 'bg-transparent hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                  onClick={() => setSelectedMonth(month)}
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0"
              onClick={() => navigateMonths('next')}
              disabled={isLastMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="md:hidden flex-1 overflow-x-auto no-scrollbar px-2">
            <div className="flex gap-1 w-max mx-auto">
              {visibleMonths.map((month) => (
                <Button
                  key={month}
                  variant="ghost"
                  size="sm"
                  className={`min-w-[60px] text-xs h-8 px-2 transition-all ${
                    selectedMonth === month 
                      ? 'bg-white/10 text-white' 
                      : 'bg-transparent hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                  onClick={() => setSelectedMonth(month)}
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2 md:hidden">
          <span className="text-xs text-white/40">
            {monthIndex + 1} of {months.length}
          </span>
          <div className="flex gap-1">
            {months.map((_, i) => (
              <div 
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === monthIndex ? 'bg-white w-4' : 'bg-white/20 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-2 h-full md:flex md:justify-center md:items-center">
        <div className="h-auto w-full md:w-11/12 lg:w-4/5 min-w-0">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="99%" height="99%" className="text-xs mx-auto">
              <AreaChart 
                data={currentData}
                margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  {devices.map((device, index) => {
                    const deviceKey = `device${index + 1}`;
                    return (
                      <linearGradient key={deviceKey} id={deviceKey} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={`var(--chart-${index + 1})`} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={`var(--chart-${index + 1})`} stopOpacity={0} />
                      </linearGradient>
                    );
                  })}
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatDay}
                  tickMargin={8}
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                {devices.map((device, index) => {
                  const deviceKey = `device${index + 1}`;
                  return (
                    <Area
                      key={deviceKey}
                      type="monotone"
                      dataKey={deviceKey}
                      stroke={`var(--chart-${index + 1})`}
                      fillOpacity={1}
                      fill={`url(#${deviceKey})`}
                      stackId="1"
                    />
                  );
                })}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
