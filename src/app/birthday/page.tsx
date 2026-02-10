"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from "framer-motion";

type Star = {
	top: string;
	left: string;
	size: string;
	duration: string;
	opacity: number;
};

function BirthdayContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	// รับค่า gender จากหน้าเลือกเพศ (Page 1)
	const gender = searchParams.get("gender") || "ชาย";

	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [isMonthOpen, setIsMonthOpen] = useState(false);
	const [isYearOpen, setIsYearOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [stars, setStars] = useState<Star[]>([]);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
	const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

	useEffect(() => {
		setMounted(true);
		setStars(
			Array.from({ length: 45 }).map(() => ({
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
				size: `${Math.random() * 2 + 1}px`,
				duration: `${Math.random() * 5 + 3}s`,
				opacity: Math.random() * 0.5,
			})),
		);

		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX - window.innerWidth / 2);
			mouseY.set(e.clientY - window.innerHeight / 2);
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	const months = [
		"มกราคม",
		"กุมภาพันธ์",
		"มีนาคม",
		"เมษายน",
		"พฤษภาคม",
		"มิถุนายน",
		"กรกฎาคม",
		"สิงหาคม",
		"กันยายน",
		"ตุลาคม",
		"พฤศจิกายน",
		"ธันวาคม",
	];
	const years = Array.from(
		{ length: 100 },
		(_, i) => new Date().getFullYear() + 543 - i,
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!month || !year) return alert("กรุณาเลือกข้อมูลให้ครบถ้วน");
		router.push(`/result?gender=${gender}&month=${month}&year=${year}`);
	};

	if (!mounted) return null;

	return (
		<div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 relative overflow-hidden font-['Noto_Serif_Thai',_serif]">
			<motion.div
				style={{ x: springX, y: springY }}
				className="absolute w-[80vw] h-[80vw] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0"
			/>
			<div className="absolute inset-0 pointer-events-none">
				{stars.map((s, i) => (
					<div
						key={i}
						className="absolute bg-white rounded-full animate-pulse"
						style={{
							top: s.top,
							left: s.left,
							width: s.size,
							height: s.size,
							animationDuration: s.duration,
							opacity: s.opacity,
						}}
					/>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className="z-10 w-full max-w-xl p-10 md:p-14 bg-white/[0.02] backdrop-blur-[30px] rounded-[3.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] text-center relative overflow-visible"
			>
				<div className="absolute inset-0 rounded-[3.5rem] border border-yellow-500/10 shadow-[inset_0_0_40px_rgba(255,215,0,0.05)] animate-pulse" />
				<h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 py-4 leading-[1.2] mb-2 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
					วารกำเนิด
				</h2>
				<p className="text-purple-300/40 tracking-widest text-xs sm:text-base uppercase mb-12">
					Identity Confirmed:{" "}
					<span className="text-purple-400 font-bold underline decoration-purple-500/30">
						{gender}
					</span>
				</p>

				<form onSubmit={handleSubmit} className="space-y-12">
					<div className="space-y-6">
						<label className="block text-left text-yellow-500/50 text-xs font-bold uppercase tracking-widest ml-2 sm:text-base">
							กาลเวลาที่ท่านจุติ
						</label>
						<div className="flex flex-col sm:flex-row gap-4 relative z-50">
							<div className="relative sm:w-1/2">
								<div
									onClick={() => {
										setIsMonthOpen(!isMonthOpen);
										setIsYearOpen(false);
									}}
									className={`w-full p-5 bg-white/[0.05] border ${isMonthOpen ? "border-yellow-400" : "border-white/10"} rounded-2xl text-white cursor-pointer flex justify-between items-center transition-all hover:bg-white/[0.08]`}
								>
									<span className={month ? "text-white" : "text-white/40"}>
										{month || "เดือนเกิด"}
									</span>
									<motion.span
										animate={{ rotate: isMonthOpen ? 180 : 0 }}
										className="text-yellow-500/40 text-[10px]"
									>
										▼
									</motion.span>
								</div>
								<AnimatePresence>
									{isMonthOpen && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 5 }}
											exit={{ opacity: 0, y: -10 }}
											className="absolute top-full left-0 w-full mt-2 bg-[#0f0c29]/95 backdrop-blur-xl border border-yellow-500/30 rounded-2xl overflow-hidden shadow-2xl z-[100] max-h-60 overflow-y-auto custom-scroll"
										>
											{months.map((m) => (
												<div
													key={m}
													onClick={() => {
														setMonth(m);
														setIsMonthOpen(false);
													}}
													className="p-4 text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-all cursor-pointer text-left font-light border-b border-white/5 last:border-none"
												>
													{m}
												</div>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<div className="relative sm:w-1/2">
								<div
									onClick={() => {
										setIsYearOpen(!isYearOpen);
										setIsMonthOpen(false);
									}}
									className={`w-full p-5 bg-white/[0.05] border ${isYearOpen ? "border-yellow-400" : "border-white/10"} rounded-2xl text-white cursor-pointer flex justify-between items-center transition-all hover:bg-white/[0.08]`}
								>
									<span className={year ? "text-white" : "text-white/40"}>
										{year || "ปี (พ.ศ.)"}
									</span>
									<motion.span
										animate={{ rotate: isYearOpen ? 180 : 0 }}
										className="text-yellow-500/40 text-[10px]"
									>
										▼
									</motion.span>
								</div>
								<AnimatePresence>
									{isYearOpen && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 5 }}
											exit={{ opacity: 0, y: -10 }}
											className="absolute top-full left-0 w-full mt-2 bg-[#0f0c29]/95 backdrop-blur-xl border border-yellow-500/30 rounded-2xl overflow-hidden shadow-2xl z-[100] max-h-60 overflow-y-auto custom-scroll"
										>
											{years.map((y) => (
												<div
													key={y}
													onClick={() => {
														setYear(y.toString());
														setIsYearOpen(false);
													}}
													className="p-4 text-white/80 hover:text-yellow-400 hover:bg-white/5 transition-all cursor-pointer text-left font-light border-b border-white/5 last:border-none"
												>
													{y}
												</div>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					</div>

					<motion.button
						whileHover={{
							scale: 1.02,
							boxShadow: "0 0 50px rgba(234,179,8,0.5)",
						}}
						whileTap={{ scale: 0.98 }}
						type="submit"
						className="w-full py-6 bg-gradient-to-br from-amber-300 via-orange-500 to-amber-600 rounded-2xl text-[#1a0b2e] font-black text-2xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group leading-none cursor-pointer"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]" />
						อ่านคำทำนาย
					</motion.button>
				</form>

				{/* <div className="mt-14 flex justify-center items-center gap-5 opacity-30">
					<div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white" />
					<span className="text-[10px] tracking-[0.6em] text-white font-light uppercase">
						Promhchat
					</span>
					<div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white" />
				</div> */}
			</motion.div>
			<style jsx global>{`
        @keyframes shimmer { 100% { transform: translateX(200%) skew-x(-20deg); } }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255, 215, 0, 0.2); border-radius: 10px; }
      `}</style>
		</div>
	);
}

export default function BirthdayPage() {
	return (
		<Suspense fallback={<div className="min-h-screen bg-black" />}>
			<BirthdayContent />
		</Suspense>
	);
}
