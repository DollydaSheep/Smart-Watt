"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { getCurrentDeviceData } from "@/data/deviceData"

import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive pie chart"

export function ChartPieInteractive() {
  const id = "pie-interactive"
  const [activeIndex, setActiveIndex] = React.useState(0)

  // Get real device data
  const devices = getCurrentDeviceData();
  
  // Convert device data to pie chart format
  const pieData = devices.map((device, index) => ({
    name: device.name,
    value: device.powerValue,
    fill: `var(--chart-${index + 1})`,
  }));

  // Create dynamic chart config based on devices
  const chartConfig = devices.reduce((config, device, index) => {
    config[device.name.toLowerCase()] = {
      label: device.name,
      color: `var(--chart-${index + 1})`,
    };
    return config;
  }, {} as ChartConfig);

  const handlePieClick = (data: unknown, index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center p-4">
      <ChartStyle id={id} config={chartConfig} />
      <div className="w-full h-full max-w-full max-h-full aspect-square flex items-center justify-center">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="w-full h-full flex items-center justify-center"
        >
          <PieChart 
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            style={{ width: '100%', height: '100%' }}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius="70%"
              outerRadius="90%"
              strokeWidth={0}
              paddingAngle={2}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g onClick={() => handlePieClick(pieData[activeIndex], activeIndex)} style={{ cursor: 'pointer' }}>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 18}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
              onClick={(data, index) => handlePieClick(data, index)}
            >
              <Label
                 content={(props: { viewBox?: PieSectorDataItem }) => {
                  const viewBox = props.viewBox as {
                    cx: number;
                    cy: number;
                    innerRadius: number;
                    outerRadius: number;
                    startAngle: number;
                    endAngle: number;
                  };
                  if (!viewBox?.cx || !viewBox?.cy) {
                    return null;
                  }
                  
                  const { cx, cy } = viewBox;
                  const activeColor = pieData[activeIndex]?.fill || "var(--chart-1)";

                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        y={cy - 10}
                        className="text-5xl sm:text-6xl md:text-3xl lg:text-5xl font-bold"
                        style={{ fill: activeColor }}
                      >
                        {pieData[activeIndex]?.value.toFixed(1)}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + (window.innerWidth < 640 ? 30 : 25)}
                        className="fill-white/50 text-lg md:text-base"
                      >
                        kW Usage
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  )
}
