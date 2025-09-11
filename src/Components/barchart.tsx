"use client"

import { useState, useCallback } from "react"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A swipable stacked bar chart with a legend"

const allMonthsData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 250, mobile: 180 },
  { month: "August", desktop: 190, mobile: 160 },
  { month: "September", desktop: 300, mobile: 200 },
  { month: "October", desktop: 280, mobile: 220 },
  { month: "November", desktop: 320, mobile: 240 },
  { month: "December", desktop: 350, mobile: 260 },
]

const MONTHS_PER_VIEW = 6

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarStacked() {
  const [startIndex, setStartIndex] = useState(0)
  const visibleData = allMonthsData.slice(startIndex, startIndex + MONTHS_PER_VIEW)
  const totalMonths = allMonthsData.length
  const canSwipeLeft = startIndex > 0
  const canSwipeRight = startIndex < totalMonths - MONTHS_PER_VIEW

  const handleSwipeLeft = useCallback(() => {
    if (canSwipeRight) {
      setStartIndex(prev => Math.min(prev + 1, totalMonths - MONTHS_PER_VIEW))
    }
  }, [canSwipeRight, totalMonths])

  const handleSwipeRight = useCallback(() => {
    if (canSwipeLeft) {
      setStartIndex(prev => Math.max(prev - 1, 0))
    }
  }, [canSwipeLeft])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
    preventScrollOnSwipe: true,
  })

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-center font-bold text-white/50 text-lg mb-2">DEVICE USAGE</h3>
      <div className="flex-1 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleSwipeRight}
            disabled={!canSwipeLeft}
            className={`p-2 rounded-full ${canSwipeLeft ? 'text-white hover:bg-gray-700' : 'text-gray-500'}`}
            aria-label="Previous month"
          >
           
          </button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleSwipeLeft}
            disabled={!canSwipeRight}
            className={`p-2 rounded-full ${canSwipeRight ? 'text-white hover:bg-gray-700' : 'text-gray-500'}`}
            aria-label="Next month"
          >
           
          </button>
        </div>

        <div {...swipeHandlers} className="h-full w-full">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={visibleData}>
              <CartesianGrid vertical={false} stroke="#202020" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="desktop"
                stackId="a"
                fill="var(--color-desktop)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="mobile"
                stackId="a"
                fill="var(--color-mobile)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      <div className="flex justify-center mt-2 space-x-1">
        {Array.from({ length: Math.ceil(totalMonths / MONTHS_PER_VIEW) }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${Math.floor(startIndex / MONTHS_PER_VIEW) === index ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  )
}
