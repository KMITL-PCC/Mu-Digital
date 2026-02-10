"use client";

<<<<<<< HEAD
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { IterationCw } from "lucide-react";

// --- 1. Data & Interface ---
interface HoroscopeResult {
	sequence: number;
	name: string;
	category: string;
	description: string;
	targetDegree: number;
}
=======
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PopupWordle from './Popup-Wordle';

export default function LuckyWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
>>>>>>> 86feed1d86346cefc10c04e8315be625d7060a21

const HOROSCOPE_POSITIONS: HoroscopeResult[] = [
	{
		sequence: 1,
		targetDegree: 180,
		name: "เจดีย์",
		category: "GOOD",
		description: "เป็นคนดี จะได้เป็นที่พึ่งพาแห่งตนและผู้อื่น (ปีชวด เริ่มต้น)",
	},
	{
		sequence: 2,
		targetDegree: 155,
		name: "ฉัตรเงิน",
		category: "GOOD",
		description: "จะมีลาภยศ มีความสุข เงินทองไหลมาเทมา",
	},
	{
		sequence: 3,
		targetDegree: 120,
		name: "คนคอขาด",
		category: "BAD",
		description: "เป็นคนอาภัพ หาที่พึ่งพาไม่ได้ ต้องระวังตัว",
	},
	{
		sequence: 4,
		targetDegree: 90,
		name: "เรือนหลวง",
		category: "GOOD",
		description: "จะประกอบด้วยยศถาบรรดาศักดิ์ เป็นเจ้าคนนายคน",
	},
	{
		sequence: 5,
		targetDegree: 65,
		name: "ปราสาท",
		category: "GOOD",
		description: "จะมีความสุข สบาย ก้าวหน้าในหน้าที่การงาน",
	},
	{
		sequence: 6,
		targetDegree: 30,
		name: "ราหู",
		category: "BAD",
		description: "น้ำใจไม่แน่นอน มักมีเรื่องเดือดร้อนใจ",
	},
	{
		sequence: 7,
		targetDegree: 10,
		name: "ฉัตรทอง",
		category: "GOOD",
		description: "ผู้ใหญ่จะอุปถัมภ์ค้ำชู มีเกียรติยศชื่อเสียง",
	},
	{
		sequence: 8,
		targetDegree: -15,
		name: "เทวดาขี่เต่า",
		category: "GOOD",
		description: "ชอบการเปลี่ยนแปลง แต่มักจะสุขสบายในบั้นปลาย",
	},
	{
		sequence: 9,
		targetDegree: -150,
		name: "นาคราช",
		category: "GOOD",
		description: "มีอำนาจวาสนา บริวารเกรงใจ",
	},
	{
		sequence: 10,
		targetDegree: -120,
		name: "แม่มด",
		category: "GOOD",
		description: "ผู้ใหญ่จะให้ความเมตตาปรานี มีวิชาความรู้",
	},
	{
		sequence: 11,
		targetDegree: -90,
		name: "พ่อหมอ",
		category: "GOOD",
		description: "เจ้านายและขุนนางผู้ใหญ่จะเมตตา เลี้ยงดู",
	},
	{
		sequence: 12,
		targetDegree: -60,
		name: "คนต้องขื่อคา",
		category: "BAD",
		description: "ชะตาไม่คงที่ มักดีตอนต้นและลำบากตอนปลาย หรือต้องโทษ",
	},
];

<<<<<<< HEAD
// คอมโพเนนต์หลักที่ใช้ดึง SearchParams
function WheelContent() {
	const searchParams = useSearchParams();

	// รับค่าจากหน้าที่แล้ว
	const gender = (searchParams.get("gender") as "male" | "female") || "male";
	const yearBE = parseInt(searchParams.get("year") || "2543");
	const monthName = searchParams.get("month") || "";

	// State สำหรับแอนิเมชัน
	const [rotation, setRotation] = useState<number>(0);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);
	const [result, setResult] = useState<HoroscopeResult | null>(null);
=======
    setIsSpinning(true);
    setShowPopup(false);
    // หมุนเพิ่ม 1800-2160 องศา (5-6 รอบ)
    const newRotation = rotation + 1800 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setShowPopup(true);
    }, 4000);
  };

  return (
    // 1. Background: ไล่เฉดสีม่วงดำ แบบท้องฟ้ายามค่ำคืนงานวัด
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-black gap-12 overflow-hidden relative">

      {/* Background Decor: ไฟงานวัดเบลอๆ ด้านหลัง */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[100px] opacity-20 animate-pulse delay-700"></div>
>>>>>>> 86feed1d86346cefc10c04e8315be625d7060a21

	const handleReload = () => {
		setResult(null);
		setRotation(0);
		setIsSpinning(false);
	};

<<<<<<< HEAD
	const handleSpinClick = () => {
		if (isSpinning) return;
		setIsSpinning(true);
		setResult(null);
=======
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
>>>>>>> 86feed1d86346cefc10c04e8315be625d7060a21

		// 1. คำนวณ Logic พรหมชาติ
		const yearAD = yearBE - 543;
		const zodiacOffset = (yearAD - 1924) % 12;

<<<<<<< HEAD
		let targetIndex = 0;
		if (gender === "male") {
			targetIndex = (0 + zodiacOffset) % 12;
		} else {
			targetIndex = (12 - (zodiacOffset % 12)) % 12;
			if (targetIndex === 12) targetIndex = 0;
		}

		const targetData = HOROSCOPE_POSITIONS[targetIndex];

		// 2. คำนวณองศาการหมุน
		let rawTarget = targetData.targetDegree % 360;
		if (rawTarget < 0) rawTarget += 360;
=======
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
>>>>>>> 86feed1d86346cefc10c04e8315be625d7060a21

		const baseSpins = 360 * 5;
		let nextRotation = 0;

<<<<<<< HEAD
		if (gender === "female") {
			const currentMod = rotation % 360;
			let distanceToCompleteCircle = 360 - currentMod;
			if (distanceToCompleteCircle === 360) distanceToCompleteCircle = 0;
			const targetOffset = (360 - rawTarget) % 360;
			nextRotation =
				rotation + distanceToCompleteCircle + baseSpins + targetOffset;
		} else {
			const currentMod = Math.abs(rotation % 360);
			let distanceToCompleteCircle = 360 - currentMod;
			if (distanceToCompleteCircle === 360) distanceToCompleteCircle = 0;
			const targetOffset = rawTarget;
			nextRotation =
				rotation - distanceToCompleteCircle - baseSpins - targetOffset;
		}

		setRotation(nextRotation);

		setTimeout(() => {
			setIsSpinning(false);
			setResult(targetData);
		}, 4000);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-black gap-6 overflow-hidden relative font-sans">
			{/* Background Effects เหมือนเดิม */}
			<div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
			<div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[100px] opacity-20 animate-pulse delay-700"></div>

			{/* --- Title --- */}
			<div className="z-10 text-center mt-8">
				<h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] tracking-wider">
					ผลคำทำนายของท่าน
				</h1>
				<p className="text-slate-400 text-sm mt-2 font-mono opacity-80 uppercase tracking-widest">
					{gender === "male" ? "♂ ชาย" : "♀ หญิง"} • พ.ศ. {yearBE} • {monthName}
				</p>
			</div>

			{/* --- Wheel Container (มุมมองเดิมเป๊ะๆ) --- */}
			<div className="relative w-72 h-72 md:w-[450px] md:h-[450px] z-10 my-[-20px] scale-90 md:scale-100">
				{/* Pointer */}
				<div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
					<div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-600 border-2 border-yellow-800 shadow-inner mb-[-4px] z-20"></div>
					<div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[50px] border-t-yellow-500 filter drop-shadow-lg"></div>
				</div>

				{/* Wheel Decorations */}
				<div className="absolute -inset-4 rounded-full border-4 border-dashed border-pink-500/30 animate-[spin_10s_linear_infinite]"></div>
				<div className="absolute -inset-1 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full blur-md opacity-50"></div>

				<motion.div
					animate={{ rotate: rotation }}
					transition={{ duration: 4, ease: [0.25, 1, 0.5, 1] }}
					className="relative w-full h-full rounded-full cursor-pointer shadow-[0_0_50px_rgba(234,179,8,0.3)] bg-slate-800 border-4 border-yellow-600"
				>
					<div className="absolute inset-0 rounded-full border-[10px] border-yellow-500/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none box-border ring-2 ring-yellow-200/50"></div>

					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-700 rounded-full z-30 shadow-[0_0_15px_rgba(0,0,0,0.8)] border-4 border-yellow-800 flex items-center justify-center">
						<div className="w-6 h-6 bg-yellow-100 rounded-full opacity-50 blur-sm"></div>
					</div>

					<img
						src="/mu.png"
						alt="Wheel"
						className="w-full h-full object-cover rounded-full"
						style={{ clipPath: "circle(50%)" }}
					/>
				</motion.div>
			</div>

			{/* --- Action Area / Result (ปุ่ม 3D เดิม) --- */}
			<div className="z-10 pb-8 flex flex-col items-center min-h-[140px] w-full px-4">
				{result ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center bg-black/80 p-6 rounded-xl border border-yellow-500/50 backdrop-blur-md shadow-2xl max-w-md w-full"
					>
						<h2
							className={`text-3xl font-bold mb-2 drop-shadow-lg ${result.category === "BAD" ? "text-red-500" : "text-green-400"}`}
						>
							ตกที่: {result.name}
						</h2>
						<div className="w-12 h-1 bg-yellow-500/50 mx-auto mb-3 rounded-full"></div>
						<p className="text-yellow-100/90 text-md font-light leading-relaxed mb-5">
							{result.description}
						</p>
						<button
							onClick={() => (window.location.href = "/")}
							className="w-full py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-red-600 to-red-800 rounded-lg hover:from-red-500 hover:to-red-700 shadow-lg"
						>
							<IterationCw />
							ทำนายใหม่
						</button>
					</motion.div>
				) : (
					<button
						onClick={handleSpinClick}
						disabled={isSpinning}
						className={`
                relative group w-full max-w-xs py-4 rounded-xl font-black text-xl uppercase tracking-widest transition-all duration-100
                ${isSpinning ? "opacity-50 cursor-not-allowed translate-y-2" : "hover:scale-105"}
            `}
					>
						<div
							className={`absolute inset-0 bg-red-900 rounded-xl transform translate-y-2 transition-transform duration-100 ${!isSpinning && "group-active:translate-y-1"}`}
						></div>
						<div
							className={`
                absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 rounded-xl border-2 border-yellow-400/50 
                shadow-[inset_0_2px_10px_rgba(255,255,255,0.3),0_0_20px_rgba(239,68,68,0.6)]
                flex items-center justify-center
                transform transition-transform duration-100
                ${!isSpinning && "group-active:translate-y-1"} 
            `}
						></div>
						<span
							className={`relative text-white drop-shadow-md flex items-center gap-2 justify-center ${!isSpinning && "group-active:translate-y-1"}`}
						>
							{isSpinning ? (
								<>
									<span className="animate-spin">⚙️</span> กำลังคำนวณ...
								</>
							) : (
								"🔮 เปิดดวงชะตา"
							)}
						</span>
					</button>
				)}
			</div>
		</div>
	);
}

// Wrap ด้วย Suspense เพื่อให้ใช้ useSearchParams ได้ใน Next.js
export default function CelestialZodiacWheel() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-black text-white flex items-center justify-center">
					Loading...
				</div>
			}
		>
			<WheelContent />
		</Suspense>
	);
}
=======
      <PopupWordle
        open={showPopup}
        onClose={() => setShowPopup(false)}
      />


    </div>
  );
}
>>>>>>> 86feed1d86346cefc10c04e8315be625d7060a21
