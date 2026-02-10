<<<<<<< HEAD
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
=======
import CelestialZodiacWheel from '@/app/components/CelestialZodiacWheel'
import PopupWordle from '../components/Popup-Wordle';
>>>>>>> 86feed1d86346cefc10c04e8315be625d7060a21

type Star = {
	top: string;
	left: string;
	size: string;
	duration: string;
	opacity: number;
};

export default function Home() {
<<<<<<< HEAD
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		setMounted(true);
		// สร้างระบบดวงดาว (Effex)
		setStars(
			Array.from({ length: 50 }).map(() => ({
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
				size: `${Math.random() * 2 + 1}px`,
				duration: `${Math.random() * 3 + 2}s`,
				opacity: Math.random() * 0.4,
			})),
		);
	}, []);

	return (
		<div className="relative h-screen w-full overflow-hidden font-serif bg-black">
			<div className="bg-[#000] w-70 h-10 absolute right-0 bottom-4 z-50" />
			{/* 1. Spline Scene */}
			<iframe
				src="https://my.spline.design/untitled-X4MgDf5FQFHsZRTrWr1WUjsX-D1A/"
				className="absolute inset-0 h-full w-full z-0"
				frameBorder="0"
				allow="autoplay; fullscreen"
				allowFullScreen
			/>

			{/* 2. Dark Overlay & Aura */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none z-10" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-10" />

			{/* 3. Star Particles (Effex) */}
			{mounted && (
				<div className="absolute inset-0 pointer-events-none z-20">
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

			{/* 4. Content with Motion */}
			<div className="relative z-30 flex h-full flex-col items-center justify-center text-center px-6 pointer-events-none">
				<motion.p
					initial={{ opacity: 0, letterSpacing: "0.1em" }}
					animate={{ opacity: 1, letterSpacing: "0.3em" }}
					transition={{ duration: 1 }}
					className="mb-3 text-sm md:text-base tracking-[0.3em] text-purple-300 uppercase"
				>
					Celestial Analysis
				</motion.p>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-white text-5xl md:text-7xl font-bold tracking-wide drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
				>
					Astrologer
				</motion.h1>

				<motion.div
					initial={{ width: 0 }}
					animate={{ width: "128px" }}
					transition={{ delay: 0.5, duration: 1 }}
					className="my-6 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
				/>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="max-w-xl text-sm md:text-lg text-gray-300 leading-relaxed font-light"
				>
					วิเคราะห์ดวงชะตาด้วยศาสตร์โหราศาสตร์
					<br />
					ผสานจักรราศี ดาวเคราะห์ และพลังจักรวาล
				</motion.p>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2 }}
					className="mt-10 pointer-events-auto"
				>
					<button
						onClick={() => router.push("/gender")}
						className="rounded-full border border-purple-400/60 px-8 py-3 text-purple-200 hover:bg-purple-400/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition cursor-pointer"
					>
						เริ่มวิเคราะห์ดวง
					</button>
				</motion.div>
			</div>
		</div>
	);
}
=======
    return (
        <div>
            <CelestialZodiacWheel />
            {/* <PopupWordle /> */}
        </div>
    );
}
>>>>>>> 86feed1d86346cefc10c04e8315be625d7060a21
