"use client";

import { useRouter } from 'next/navigation';



export default function Home() {
  const router = useRouter();

  
  return (
    <div className="relative h-screen w-full overflow-hidden font-serif">
      {/* Spline */}
      <iframe
        src="https://my.spline.design/untitled-X4MgDf5FQFHsZRTrWr1WUjsX-D1A/"
        className="absolute inset-0 h-full w-full z-0"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />

      {/* dark + cosmic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none z-10" />

      {/* content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6 pointer-events-none">
        
        {/* subtitle */}
        <p className="mb-3 text-sm md:text-base tracking-[0.3em] text-purple-300 uppercase">
          Celestial Analysis
        </p>

        {/* main title */}
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-wide drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          Astrologer
        </h1>

        {/* divider */}
        <div className="my-6 h-px w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

        {/* description */}
        <p className="max-w-xl text-sm md:text-lg text-gray-300 leading-relaxed">
          วิเคราะห์ดวงชะตาด้วยศาสตร์โหราศาสตร์  
          ผสานจักรราศี ดาวเคราะห์ และพลังจักรวาล
        </p>

        {/* CTA */}
        <div className="mt-10 pointer-events-auto">
          <button 
          onClick={() => router.push('/gender-selection')}
          className="rounded-full border border-purple-400/60 px-8 py-3 text-purple-200 hover:bg-purple-400/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition">
            เริ่มวิเคราะห์ดวง
          </button>
        </div>
      </div>
    </div>
  );
}
