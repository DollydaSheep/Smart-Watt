"use client"


import Image from "next/image";
import { Visualization3D } from "@/components/Visualization3D";



export default function Home() {
  return (
    <div className="font-sans min-h-screen w-full p-4 sm:p-6 md:p-10 pt-15 md:pt-16 flex items-center justify-center">
      <main className="flex flex-col md:flex-row justify-between items-center md:items-center gap-12 w-full max-w-7xl mx-auto mt-2 md:mt-12">
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <div className="w-full max-w-[500px] mx-auto md:mx-0">
            <Image
              className="dark:invert w-full h-auto"
              src="/SVG/smartwatt.svg"
              alt="SmartWatt Logo"
              width={620}
              height={124}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
        <Visualization3D />
      </main>
    </div>
  );
}
