"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

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
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => desktopData.map((item) => item.month), [])

  return (
    <Card data-chart={id} className=" bg-white/5 border-2 border-white/10 shadow-lg rounded-2xl">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 ">
        <div className="grid gap-1">
          <CardTitle> Pie Chart - Visitors
          </CardTitle>
          <CardDescription className="text-white/40">January - June 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
  <SelectTrigger
    className="ml-auto h-6 w-[84px] rounded-md pl-2 text-[10px] -mt-10  bg-white/5 border-2 border-white/10"
    aria-label="Select a value"
  >
    <SelectValue placeholder="Select month" />
  </SelectTrigger>
  <SelectContent align="end" className="rounded-xl z-50 bg-white/5 border-2 border-white/10">
    {months.map((key) => {
      const config = chartConfig[key as keyof typeof chartConfig]

      if (!config) {
        return null
      }

      return (
        <SelectItem
          key={key}
          value={key}
          className="rounded-lg [&_span]:flex"
        >
          <div className="flex items-center gap-2 text-xs">
            <span
              className="flex h-2 w-2 shrink-0 rounded-xs"
              style={{
                backgroundColor: `var(--color-${key})`,
              }}
            />
            {config?.label}
          </div>
        </SelectItem>
      )
    })}
  </SelectContent>
</Select>
      </CardHeader>
      <CardContent className="flex justify-center p-2 pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className=" mx-auto aspect-square w-full max-w-[330px] relative z-10  -mt-13"
        >
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={90}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                     const activeColor = desktopData[activeIndex].fill

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-5xl font-bold"
                           style={{ fill: activeColor }}
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 34}
                          className="fill-white/50 text-xl"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
