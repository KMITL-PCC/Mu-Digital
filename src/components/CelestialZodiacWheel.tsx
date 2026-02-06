"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LuckyWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    // หมุนเพิ่ม 1800-2160 องศา (5-6 รอบ)
    const newRotation = rotation + 1800 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  return (
    // 1. Background: ไล่เฉดสีม่วงดำ แบบท้องฟ้ายามค่ำคืนงานวัด
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-black gap-12 overflow-hidden relative">
      
      {/* Background Decor: ไฟงานวัดเบลอๆ ด้านหลัง */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[100px] opacity-20 animate-pulse delay-700"></div>

      {/* --- ส่วนหัวข้อ (Title) สไตล์ป้ายไฟงานวัด --- */}
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] tracking-wider">
          Mu Digital
        </h1>
        <p className="text-pink-400 mt-2 text-lg tracking-widest drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">
          CYBER TEMPLE
        </p>
      </div>

      {/* --- Container วงล้อ --- */}
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] z-10">
        
        {/* ลูกศร (Pointer): ทรงยอดเจดีย์ทองคำกลับหัว */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
            {/* หัวหมุด */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-600 border-2 border-yellow-800 shadow-inner mb-[-5px] z-20"></div>
            {/* ตัวเข็ม */}
            <div className="w-0 h-0 
              border-l-[25px] border-l-transparent 
              border-r-[25px] border-r-transparent 
              border-t-[60px] border-t-yellow-500
              filter drop-shadow-lg"
            ></div>
        </div>

        {/* แสง Neon Ring รอบวงล้อ */}
        <div className="absolute -inset-4 rounded-full border-4 border-dashed border-pink-500/30 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute -inset-1 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full blur-md opacity-50"></div>

        {/* --- ตัววงล้อ --- */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.25, 1, 0.5, 1] }} // Physics แบบวงล้อหนักๆ
          onClick={spinWheel}
          className="relative w-full h-full rounded-full cursor-pointer shadow-[0_0_50px_rgba(234,179,8,0.3)] bg-slate-800 border-4 border-yellow-600"
        >
          {/* กรอบทอง 3 มิติ (Golden Frame) */}
          <div className="absolute inset-0 rounded-full border-[12px] border-yellow-500/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none box-border ring-2 ring-yellow-200/50"></div>
          
          {/* แกนกลาง (Hub) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-700 rounded-full z-30 shadow-[0_0_15px_rgba(0,0,0,0.8)] border-4 border-yellow-800 flex items-center justify-center">
             <div className="w-8 h-8 bg-yellow-100 rounded-full opacity-50 blur-sm"></div>
          </div>

          {/* รูปภาพ */}
          <img 
            src="/mu.png" // ⚠️ อย่าลืมใส่รูปของคุณที่นี่
            alt="Wheel" 
            className="w-full h-full object-cover rounded-full"
            style={{ clipPath: 'circle(50%)' }}
          />
        </motion.div>
      </div>

      {/* --- ปุ่มกด (Arcade Style 3D Button) --- */}
      <div className="z-10 pb-10">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`
            relative group px-12 py-5 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all duration-100
            ${isSpinning ? 'opacity-50 cursor-not-allowed translate-y-2' : 'hover:scale-105'}
          `}
        >
          {/* Layer 1: เงาพื้นหลัง */}
          <div className={`absolute inset-0 bg-red-900 rounded-2xl transform translate-y-3 transition-transform duration-100 ${!isSpinning && 'group-active:translate-y-1'}`}></div>
          
          {/* Layer 2: ตัวปุ่มจริง (สีแดงสดตัดทอง) */}
          <div className={`
            absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 rounded-2xl border-2 border-yellow-400/50 
            shadow-[inset_0_2px_10px_rgba(255,255,255,0.3),0_0_20px_rgba(239,68,68,0.6)]
            flex items-center justify-center
            transform transition-transform duration-100
            ${!isSpinning && 'group-active:translate-y-2'} 
          `}>
          </div>

          {/* Text บนปุ่ม */}
          <span className={`relative text-white drop-shadow-md ${!isSpinning && 'group-active:translate-y-2'}`}>
            {isSpinning ? '...หมุน...' : 'กดเสี่ยงทาย'}
          </span>
        </button>
      </div>

    </div>
  );
}