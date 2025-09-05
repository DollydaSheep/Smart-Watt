
'use client';

import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartLegendContent, ChartTooltipContent } from "./charts-base";
import { cx } from "@/utils/cx";


const CustomRadarChartTick = ({ x, y, payload, ...rest }: any) => {
  return (
    <text
      
    
      textAnchor="middle"
      {...rest}
      className="fill-utility-red-500 text-xs"
    >
 
    </text>
  );
};

const radarData = [
    {
        subject: "Mon",
        A: 800,
        B: 400,
        C: 600,
    },
    {
        subject: "Tue",
        A: 600,
        B: 1000,
        C: 800,
    },
    {
        subject: "Wed",
        A: 600,
        B: 200,
        C: 400,
    },
    {
        subject: "Thu",
        A: 200,
        B: 600,
        C: 800,
    },
    {
        subject: "Fri",
        A: 400,
        B: 200,
        C: 600,
    },
    {
        subject: "Sat",
        A: 1000,
        B: 800,
        C: 600,
    },
    {
        subject: "Sun",
        A: 400,
        B: 1000,
        C: 800,
    },
];

export const RadarChart = () => {
    const colors: Record<string, string> = {
        A: "text-utility-brand-600",
        B: "text-utility-pink-500",
        C: "text-utility-blue-light-500",
    };

    return (
        <ResponsiveContainer height={500} width="100%">
            <RechartsRadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={radarData}
                className="size-full font-medium text-tertiary [&_.recharts-polar-grid]:text-utility-gray-100 [&_.recharts-text]:text-sm"
                margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Legend verticalAlign="bottom" align="center" layout="horizontal" content={ChartLegendContent} />

                <PolarGrid stroke="currentColor" className="text-utility-gray-100" />
                <PolarAngleAxis
                    dataKey="subject"
                    stroke="currentColor"
                    tick={({ x, y, textAnchor, index, payload, ...props }) => (
                        <text
                            x={x}
                            y={index === 0 ? Number(y) - 14 : index === 3 || index === 4 ? Number(y) + 10 : Number(y)}
                            textAnchor={textAnchor}
                            {...props}
                            className={cx("recharts-text recharts-polar-angle-axis-tick-value", props.className)}
                        >
                            <tspan dy="0em" className="fill-utility-gray-700 text-xs font-medium">
                                {payload.value}
                            </tspan>
                        </text>
                    )}
                    tickLine={false}
                    axisLine={false}
                />
                <PolarRadiusAxis textAnchor="middle" tick={(props) => <CustomRadarChartTick {...props} />} axisLine={false} angle={90} domain={[0, 1000]} />

                <Tooltip
                    content={<ChartTooltipContent />}
                    cursor={{
                        className: "stroke-utility-brand-600  stroke-2",
                        style: {
                            transform: "translateZ(0)",
                        },
                    }}
                />

                <Radar
                    isAnimationActive={false}
                    className={colors["A"]}
                    dataKey="A"
                    name="Oven"
                    stroke="#7637d5"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    fill="#7637d5"
                    fillOpacity={0.2}
                    activeDot={{
                        className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                    }}
                />
                <Radar
                    isAnimationActive={false}
                    className={colors["B"]}
                    dataKey="B"
                    name="Computer"
                    stroke="#1db954"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    fill="#1db954"
                    fillOpacity={0.2}
                    activeDot={{
                        className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                    }}
                />
                <Radar
                    isAnimationActive={false}
                    className={colors["C"]}
                    dataKey="C"
                    name="TV"
                    stroke="#71d7fc"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    fill="#71d7fc"
                    fillOpacity={0.2}
                    activeDot={{
                        className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                    }}
                />
            </RechartsRadarChart>
        </ResponsiveContainer>
    );
};