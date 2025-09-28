'use client';

import dynamic from 'next/dynamic';
import type { DeviceData } from './Sphere3D';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import { ChartAreaInteractive } from '@/components/areachart';
import { ChartPieInteractive } from '@/components/Piechart';

// Dynamically import the 3D sphere with SSR disabled
const Sphere3D = dynamic(
  () => import('@/components/Sphere3D'),
  { 
    ssr: false, 
    loading: () => <div className="w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-lg animate-pulse" /> 
  }
);

interface Visualization3DProps {
  devices: DeviceData[];
  totalUsage: number;
  powerLimit: number;
  showLabels?: boolean;
  isChartsBlurred?: boolean;
}

export function Visualization3D({ devices, totalUsage, powerLimit, showLabels = false, isChartsBlurred = false }: Visualization3DProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // When showLabels is false, don't render anything
  if (!showLabels) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto md:mx-0 md:w-1/2 lg:w-2/5 xl:w-1/3 -mt-3 md:mt-0 flex flex-col items-center">
      {/* Swipeable Panels: 3D Sphere, Area Chart, and Pie Chart - All shown when showLabels is true */}
      <div className="w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {/* Slide 1: 3D Sphere */}
            <div className="flex-[0_0_100%] min-w-0 pr-2">
              <div 
                className={`w-full aspect-square bg-[#09090B] rounded-lg shadow-lg border border-transparent transition-all duration-500 ${isChartsBlurred ? 'opacity-70' : 'opacity-100'}`}
                style={{ 
                  filter: isChartsBlurred ? 'blur(3px) brightness(0.7)' : 'blur(0px) brightness(1)',
                  transition: 'filter 0.5s ease, opacity 0.5s ease'
                }}
              >
                <Sphere3D devices={devices} totalUsage={totalUsage} powerLimit={powerLimit} showLabels={showLabels} />
              </div>
            </div>
            {/* Slide 2: Area Chart */}
            <div className="flex-[0_0_100%] min-w-0 px-1">
              <div 
                className={`h-72 sm:h-80 transition-all duration-500 ${isChartsBlurred ? 'opacity-70' : 'opacity-100'}`}
                style={{ 
                  filter: isChartsBlurred ? 'blur(3px) brightness(0.7)' : 'blur(0px) brightness(1)',
                  transition: 'filter 0.5s ease, opacity 0.5s ease'
                }}
              >
                <ChartAreaInteractive />
              </div>
            </div>
            {/* Slide 3: Pie Chart */}
            <div className="flex-[0_0_100%] min-w-0 pl-2">
              <div 
                className={`h-72 sm:h-80 transition-all duration-500 ${isChartsBlurred ? 'opacity-70' : 'opacity-100'}`}
                style={{ 
                  filter: isChartsBlurred ? 'blur(3px) brightness(0.7)' : 'blur(0px) brightness(1)',
                  transition: 'filter 0.5s ease, opacity 0.5s ease'
                }}
              >
                <ChartPieInteractive />
              </div>
            </div>
          </div>
        </div>

        {/* Minimal indicators - show all 3 panels */}
        {/* <div className="flex justify-center gap-2 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                selectedIndex === i ? 'bg-white w-6' : 'bg-white/30 w-3'
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}

