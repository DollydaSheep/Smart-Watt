// "use client"

// import * as React from "react"
// import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useSwipeable } from "react-swipeable"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import {
//   ChartConfig,
//   ChartContainer,
// } from "@/components/ui/chart"

// export const description = "An interactive area chart"

// // Group data by month
// const monthlyData = {
//   January: [
//     { date: "2024-01-01", day: 1, desktop: 320, mobile: 250 },
//     { date: "2024-01-07", day: 7, desktop: 410, mobile: 320 },
//     { date: "2024-01-14", day: 14, desktop: 380, mobile: 290 },
//     { date: "2024-01-21", day: 21, desktop: 290, mobile: 210 },
//     { date: "2024-01-31", day: 31, desktop: 420, mobile: 350 },
//   ],
//   February: [
//     { date: "2024-02-01", day: 1, desktop: 350, mobile: 280 },
//     { date: "2024-02-08", day: 8, desktop: 270, mobile: 190 },
//     { date: "2024-02-14", day: 14, desktop: 330, mobile: 260 },
//     { date: "2024-02-21", day: 21, desktop: 290, mobile: 230 },
//     { date: "2024-02-29", day: 29, desktop: 380, mobile: 310 },
//   ],
//   March: [
//     { date: "2024-03-01", day: 1, desktop: 410, mobile: 340 },
//     { date: "2024-03-08", day: 8, desktop: 370, mobile: 290 },
//     { date: "2024-03-15", day: 15, desktop: 350, mobile: 270 },
//     { date: "2024-03-22", day: 22, desktop: 290, mobile: 230 },
//     { date: "2024-03-31", day: 31, desktop: 440, mobile: 380 },
//   ],
//   April: [
//     { date: "2024-04-01", day: 1, desktop: 222, mobile: 150 },
//     { date: "2024-04-05", day: 5, desktop: 373, mobile: 290 },
//     { date: "2024-04-10", day: 10, desktop: 261, mobile: 190 },
//     { date: "2024-04-15", day: 15, desktop: 120, mobile: 170 },
//     { date: "2024-04-20", day: 20, desktop: 89, mobile: 150 },
//     { date: "2024-04-25", day: 25, desktop: 215, mobile: 250 },
//     { date: "2024-04-30", day: 30, desktop: 454, mobile: 380 },
//   ],
//   May: [
//     { date: "2024-05-01", day: 1, desktop: 165, mobile: 220 },
//     { date: "2024-05-05", day: 5, desktop: 481, mobile: 390 },
//     { date: "2024-05-10", day: 10, desktop: 293, mobile: 330 },
//     { date: "2024-05-15", day: 15, desktop: 473, mobile: 380 },
//     { date: "2024-05-20", day: 20, desktop: 177, mobile: 230 },
//     { date: "2024-05-25", day: 25, desktop: 201, mobile: 250 },
//     { date: "2024-05-31", day: 31, desktop: 178, mobile: 230 },
//   ],
//   June: [
//     { date: "2024-06-01", day: 1, desktop: 178, mobile: 200 },
//     { date: "2024-06-05", day: 5, desktop: 88, mobile: 140 },
//     { date: "2024-06-10", day: 10, desktop: 155, mobile: 200 },
//     { date: "2024-06-15", day: 15, desktop: 307, mobile: 350 },
//     { date: "2024-06-20", day: 20, desktop: 408, mobile: 450 },
//     { date: "2024-06-25", day: 25, desktop: 141, mobile: 190 },
//     { date: "2024-06-30", day: 30, desktop: 446, mobile: 400 },
//   ],
//   July: [
//     { date: "2024-07-01", day: 1, desktop: 420, mobile: 350 },
//     { date: "2024-07-06", day: 6, desktop: 380, mobile: 320 },
//     { date: "2024-07-12", day: 12, desktop: 450, mobile: 390 },
//     { date: "2024-07-18", day: 18, desktop: 390, mobile: 340 },
//     { date: "2024-07-24", day: 24, desktop: 410, mobile: 360 },
//     { date: "2024-07-31", day: 31, desktop: 480, mobile: 410 },
//   ],
//   August: [
//     { date: "2024-08-01", day: 1, desktop: 450, mobile: 380 },
//     { date: "2024-08-07", day: 7, desktop: 390, mobile: 330 },
//     { date: "2024-08-14", day: 14, desktop: 420, mobile: 360 },
//     { date: "2024-08-21", day: 21, desktop: 380, mobile: 320 },
//     { date: "2024-08-28", day: 28, desktop: 460, mobile: 390 },
//     { date: "2024-08-31", day: 31, desktop: 410, mobile: 350 },
//   ],
//   September: [
//     { date: "2024-09-01", day: 1, desktop: 380, mobile: 310 },
//     { date: "2024-09-08", day: 8, desktop: 420, mobile: 360 },
//     { date: "2024-09-15", day: 15, desktop: 350, mobile: 290 },
//     { date: "2024-09-22", day: 22, desktop: 390, mobile: 330 },
//     { date: "2024-09-30", day: 30, desktop: 440, mobile: 380 },
//   ],
//   October: [
//     { date: "2024-10-01", day: 1, desktop: 410, mobile: 340 },
//     { date: "2024-10-07", day: 7, desktop: 380, mobile: 310 },
//     { date: "2024-10-14", day: 14, desktop: 420, mobile: 360 },
//     { date: "2024-10-21", day: 21, desktop: 390, mobile: 330 },
//     { date: "2024-10-31", day: 31, desktop: 470, mobile: 400 },
//   ],
//   November: [
//     { date: "2024-11-01", day: 1, desktop: 440, mobile: 370 },
//     { date: "2024-11-08", day: 8, desktop: 390, mobile: 320 },
//     { date: "2024-11-15", day: 15, desktop: 410, mobile: 350 },
//     { date: "2024-11-22", day: 22, desktop: 380, mobile: 310 },
//     { date: "2024-11-30", day: 30, desktop: 460, mobile: 390 },
//   ],
//   December: [
//     { date: "2024-12-01", day: 1, desktop: 480, mobile: 410 },
//     { date: "2024-12-08", day: 8, desktop: 520, mobile: 450 },
//     { date: "2024-12-15", day: 15, desktop: 580, mobile: 500 },
//     { date: "2024-12-22", day: 22, desktop: 620, mobile: 550 },
//     { date: "2024-12-25", day: 25, desktop: 720, mobile: 650 },
//     { date: "2024-12-31", day: 31, desktop: 680, mobile: 600 },
//   ]
// }

// type MonthKey = keyof typeof monthlyData
// const months = Object.keys(monthlyData) as MonthKey[]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig

// export const ChartAreaInteractive = () => {
//   const [selectedMonth, setSelectedMonth] = React.useState<MonthKey>('May')
//   const [visibleMonths, setVisibleMonths] = React.useState<MonthKey[]>(['April', 'May', 'June'])
//   const currentData = monthlyData[selectedMonth]
  
//   const monthIndex = months.findIndex(month => month === selectedMonth)
//   const isFirstMonth = monthIndex === 0
//   const isLastMonth = monthIndex === months.length - 1
  
//   const navigateMonths = (direction: 'prev' | 'next') => {
//     if (direction === 'prev' && !isFirstMonth) {
//       const newIndex = Math.max(0, monthIndex - 1)
//       setSelectedMonth(months[newIndex])
      
//       // Update visible months if needed
//       if (newIndex < months.indexOf(visibleMonths[0])) {
//         const newVisible = months.slice(Math.max(0, newIndex - 1), Math.max(3, newIndex + 2))
//         setVisibleMonths(newVisible as MonthKey[])
//       }
//     } else if (direction === 'next' && !isLastMonth) {
//       const newIndex = Math.min(months.length - 1, monthIndex + 1)
//       setSelectedMonth(months[newIndex])
      
//       // Update visible months if needed
//       if (newIndex > months.indexOf(visibleMonths[visibleMonths.length - 1])) {
//         const newVisible = months.slice(Math.max(0, newIndex - 1), Math.min(months.length, newIndex + 2))
//         setVisibleMonths(newVisible as MonthKey[])
//       }
//     }
//   }
  
//   // Swipe handlers for mobile
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => navigateMonths('next'),
//     onSwipedRight: () => navigateMonths('prev'),
//     preventScrollOnSwipe: true,
//     trackMouse: true
//   })
  
//   const formatDay = (day: number) => {
//     if (day === 1 || day === 21 || day === 31) return `${day}st`
//     if (day === 2 || day === 22) return `${day}nd`
//     if (day === 3 || day === 23) return `${day}rd`
//     return `${day}th`
//   }

//   return (
//     <Card className="bg-transparent border-transparent shadow-lg rounded-2xl" {...swipeHandlers}>
//       <CardHeader className="pb-2">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div className="flex items-center gap-2 justify-center">
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8 p-0 md:hidden"
//               onClick={() => navigateMonths('prev')}
//               disabled={isFirstMonth}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <div className="flex justify-center">
//               <CardTitle className="text-lg font-medium text-center text-white/50 ">{selectedMonth} 2025</CardTitle>
//               <CardDescription className="text-white/60 text-sm">
                
//               </CardDescription>
//             </div>
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8 p-0 md:hidden"
//               onClick={() => navigateMonths('next')}
//               disabled={isLastMonth}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
          
//           {/* Desktop month selector */}
//           <div className="hidden md:flex items-center gap-2">
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8 p-0"
//               onClick={() => navigateMonths('prev')}
//               disabled={isFirstMonth}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
            
//             <div className="flex gap-1 overflow-hidden">
//               {visibleMonths.map((month) => (
//                 <Button
//                   key={month}
//                   variant="ghost"
//                   size="sm"
//                   className={`min-w-[60px] text-xs h-8 px-2 transition-all ${
//                     selectedMonth === month 
//                       ? 'bg-white/10 text-white' 
//                       : 'bg-transparent hover:bg-white/5 text-white/60 hover:text-white'
//                   }`}
//                   onClick={() => setSelectedMonth(month)}
//                 >
//                   {month.slice(0, 3)}
//                 </Button>
//               ))}
//             </div>
            
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8 p-0"
//               onClick={() => navigateMonths('next')}
//               disabled={isLastMonth}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
          
//           {/* Mobile month selector */}
//           <div className="md:hidden flex-1 overflow-x-auto no-scrollbar px-2">
//             <div className="flex gap-1 w-max mx-auto">
//               {visibleMonths.map((month) => (
//                 <Button
//                   key={month}
//                   variant="ghost"
//                   size="sm"
//                   className={`min-w-[60px] text-xs h-8 px-2 transition-all ${
//                     selectedMonth === month 
//                       ? 'bg-white/10 text-white' 
//                       : 'bg-transparent hover:bg-white/5 text-white/60 hover:text-white'
//                   }`}
//                   onClick={() => setSelectedMonth(month)}
//                 >
//                   {month.slice(0, 3)}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation for mobile */}
//         <div className="flex justify-between items-center mt-2 md:hidden">
//           <span className="text-xs text-white/40">
//             {monthIndex + 1} of {months.length}
//           </span>
//           <div className="flex gap-1">
//             {months.map((_, i) => (
//               <div 
//                 key={i}
//                 className={`h-1 rounded-full transition-all ${
//                   i === monthIndex ? 'bg-white w-4' : 'bg-white/20 w-2'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="p-0 sm:p-2">
//         <div className="h-[250px] w-full min-w-0">
//           <ChartContainer config={chartConfig}>
//             <ResponsiveContainer width="99%" height="99%" className="text-xs mx-auto">
//               <AreaChart 
//                 data={currentData}
//                 margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
//               >
//                 <defs>
//                   <linearGradient id="desktop" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
//                     <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
//                   </linearGradient>
//                   <linearGradient id="mobile" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
//                     <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
//                 <XAxis
//                   dataKey="day"
//                   axisLine={false}
//                   tickLine={false}
//                   tickFormatter={formatDay}
//                   tickMargin={8}
//                   padding={{ left: 10, right: 10 }}
//                   tick={{ fontSize: 11 }}
//                 />
//                 <ChartTooltip
//                   cursor={false}
//                   content={<ChartTooltipContent indicator="line" />}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="desktop"
//                   stroke="var(--chart-1)"
//                   fillOpacity={1}
//                   fill="url(#desktop)"
//                   stackId="1"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="mobile"
//                   stroke="var(--chart-2)"
//                   fillOpacity={1}
//                   fill="url(#mobile)"
//                   stackId="1"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
