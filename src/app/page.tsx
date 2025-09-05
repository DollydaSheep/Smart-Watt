import Image from "next/image";

import { RadarChart } from "../Components/application/charts/radar-chart";

export default function Home() {
  return (
  <><div className="font-sans grid flex-col min-h-screen items-start justify-items-center  p-200 pb-10 gap-16 sm:p-10 ml-10">
    <main className="flex flex-row justify-between items-start gap-10 row-start-2 w-full px-5">

  <div className="flex flex-col gap-6">
    <Image
      className="dark:invert pt-5"
      src="/SVG/smartwatt.svg"
      alt="Next.js logo"
      width={620}
      height={10}
      priority
    />

    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <a
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Statistics
      </a>
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-full sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Start Here
      </a>
    </div>
  </div>

  <div className="w-full flex  justify-end flex-1 self-start -mt-23">
    <div className="w-[100vh] h-[1vh]">
      <RadarChart />
    </div>
  </div>
</main>


          </div>

          </>
      
      
  );  


  }
