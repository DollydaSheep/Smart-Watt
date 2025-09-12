"use client"

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A stacked area chart with expand stacking"

const monthlyData = {
  January: [
    { day: 1, desktop: 6, mobile: 3, other: 2 },
    { day: 5, desktop: 10, mobile: 5, other: 3 },
    { day: 10, desktop: 15, mobile: 8, other: 5 },
    { day: 15, desktop: 20, mobile: 12, other: 7 },
    { day: 20, desktop: 18, mobile: 10, other: 6 },
    { day: 25, desktop: 12, mobile: 6, other: 4 },
    { day: 30, desktop: 8, mobile: 4, other: 2 },
  ],
  February: [
    { day: 1, desktop: 8, mobile: 4, other: 3 },
    { day: 5, desktop: 12, mobile: 6, other: 4 },
    { day: 10, desktop: 18, mobile: 10, other: 6 },
    { day: 15, desktop: 22, mobile: 15, other: 8 },
    { day: 20, desktop: 20, mobile: 12, other: 7 },
    { day: 25, desktop: 15, mobile: 8, other: 5 },
    { day: 28, desktop: 10, mobile: 5, other: 3 },
  ],
  // Add more months as needed
};

const months = [
  { name: "January", data: monthlyData.January },
  { name: "February", data: monthlyData.February },
  { name: "March", data: monthlyData.January },
  { name: "April", data: monthlyData.February },
  { name: "May", data: monthlyData.January },
  { name: "June", data: monthlyData.February },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  other: {
    label: "Other",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ChartAreaStackedExpand() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  
  return (
    <Card className="bg-white/5 border-2 border-white/10 shadow-lg rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>Monthly Usage</CardTitle>
            <CardDescription className="text-white/40">
              Showing daily data for {selectedMonth.name}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {months.map((month) => (
              <Button
                key={month.name}
                variant="ghost"
                size="sm"
                className={`text-xs h-8 px-2 text-nowrap ${selectedMonth.name === month.name ? 'text-white' : 'text-white/50 hover:text-white'}`}
                onClick={() => setSelectedMonth(month)}
              >
                {month.name.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={selectedMonth.data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                stackOffset="expand"
              >
                <CartesianGrid vertical={false} stroke="#202020" />
                <XAxis 
                  dataKey="day" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}${value === 1 ? 'st' : value === 2 ? 'nd' : value === 3 ? 'rd' : 'th'}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="other"
                  type="monotone"
                  fill="var(--chart-3)"
                  fillOpacity={0.1}
                  stroke="var(--chart-3)"
                  stackId="a"
                />
                <Area
                  dataKey="mobile"
                  type="monotone"
                  fill="var(--chart-2)"
                  fillOpacity={0.4}
                  stroke="var(--chart-2)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="monotone"
                  fill="var(--chart-1)"
                  fillOpacity={0.4}
                  stroke="var(--chart-1)"
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
