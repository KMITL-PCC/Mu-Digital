"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Star = {
	top: string;
	left: string;
	size: string;
	duration: string;
	opacity: number;
};

export default function SelectionPage() {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [stars, setStars] = useState<Star[]>([]);

	// ส่งค่า gender เป็นภาษาไทยเพื่อให้สอดคล้องกับหน้า Birthday
	const selectGender = (gender: string) => {
		router.push(`/birthday?gender=${gender}`);
	};

	useEffect(() => {
		setMounted(true);
		setStars(
			Array.from({ length: 40 }).map(() => ({
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
				size: `${Math.random() * 2 + 1}px`,
				duration: `${Math.random() * 4 + 2}s`,
				opacity: Math.random() * 0.4,
			})),
		);
	}, []);

	return (
		<div className="min-h-screen bg-[#0f0c29] bg-gradient-to-b from-[#0f0c29] via-[#1a1a2e] to-[#0f0c29] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden font-serif">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[900px] max-h-[900px] bg-purple-600/5 blur-[140px] rounded-full pointer-events-none"></div>

			<div className="z-10 w-full max-w-7xl">
				<div className="text-center mb-10 sm:mb-16">
					<h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] mb-3">
						โชคชะตากำลังรอคุณอยู่
					</h2>
					<p className="text-purple-300/60 tracking-widest text-[12px] sm:text-base uppercase">
						— สัมผัสตัวตนเพื่อเปิดประตูแห่งคำทำนาย —
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-6 sm:gap-12 justify-center items-stretch">
					{/* ปุ่มเพศชาย */}
					<button
						onClick={() => selectGender("ชาย")}
						className="group relative flex-1 flex flex-col items-center p-5 sm:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl transition-all duration-700 hover:bg-blue-900/10 hover:border-blue-500/40 hover:-translate-y-4 hover:shadow-[0_20px_80px_rgba(59,130,246,0.2)]"
					>
						<div className="relative w-full aspect-[3/4] max-h-[50vh] flex items-center justify-center overflow-visible cursor-pointer">
							<div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-75 group-hover:bg-blue-500/20 transition-all duration-700"></div>
							<Image
								src="/male.svg"
								alt="Male"
								fill
								className="relative z-10 object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-700"
							/>
						</div>
						<div className="mt-8 text-center">
							<span className="text-xl sm:text-4xl font-light tracking-widest text-blue-200 group-hover:text-blue-400 transition-all">
								ชาย
							</span>
							<div className="h-[1px] w-12 bg-blue-500/30 mx-auto mt-4 group-hover:w-24 group-hover:bg-blue-400 transition-all duration-500"></div>
						</div>
					</button>

					{/* ปุ่มเพศหญิง */}
					<button
						onClick={() => selectGender("หญิง")}
						className="group relative flex-1 flex flex-col items-center p-5 sm:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl transition-all duration-700 hover:bg-pink-900/10 hover:border-pink-500/40 hover:-translate-y-4 hover:shadow-[0_20px_80px_rgba(236,72,153,0.2)]"
					>
						<div className="relative w-full aspect-[3/4] max-h-[50vh] flex items-center justify-center overflow-visible cursor-pointer">
							<div className="absolute inset-0 bg-pink-500/5 blur-3xl rounded-full scale-75 group-hover:bg-pink-500/20 transition-all duration-700"></div>
							<Image
								src="/female.svg"
								alt="Female"
								fill
								className="relative z-10 object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-700"
							/>
						</div>
						<div className="mt-8 text-center">
							<span className="text-xl sm:text-4xl font-light tracking-widest text-pink-200 group-hover:text-pink-400 transition-all">
								หญิง
							</span>
							<div className="h-[1px] w-12 bg-pink-500/30 mx-auto mt-4 group-hover:w-24 group-hover:bg-pink-400 transition-all duration-500"></div>
						</div>
					</button>
				</div>
			</div>

			{mounted && (
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
			)}
		</div>
	);
}
