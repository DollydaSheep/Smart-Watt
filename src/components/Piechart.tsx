"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"


import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export const description = "An interactive pie chart"

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "var(--chart-1)",
  },
  february: {
    label: "February",
    color: "var(--chart-2)",
  },
  march: {
    label: "March",
    color: "var(--chart-3)",
  },
  april: {
    label: "April",
    color: "var(--chart-4)",
  },
  may: {
    label: "May",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartPieInteractive() {
  const id = "pie-interactive"
 
  const [activeIndex, setActiveIndex] = React.useState(0)

   const handlePieClick = (data: { month: string; desktop: number; fill: string }, index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <ChartStyle id={id} config={chartConfig} />
      <div className="w-full h-full max-w-[120%] max-h-[120%] aspect-square">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="w-full h-full"
        >
          <PieChart 
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            style={{ width: '100%', height: '100%' }}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius="70%"
              outerRadius="90%"
              strokeWidth={0}
              paddingAngle={2}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g onClick={() => handlePieClick(desktopData[activeIndex], activeIndex)} style={{ cursor: 'pointer' }}>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
              onClick={(data, index) => handlePieClick(data, index)}
            >
              <Label
                content={(props: any) => {
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
                  const activeColor = desktopData[activeIndex].fill;

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
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                        style={{ fill: activeColor }}
                      >
                        {desktopData[activeIndex].desktop.toLocaleString()}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + (window.innerWidth < 640 ? 30 : 55)}
                        className="fill-white/50 text-base sm:text-lg md:text-2xl lg:text-2xl"
                      >
                        Visitors
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
