"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { IterationCw, LoaderPinwheel } from "lucide-react";

interface HoroscopeResult {
	sequence: number;
	name: string;
	category: string;
	description: string;
	targetDegree: number;
}

const HOROSCOPE_POSITIONS: HoroscopeResult[] = [
	{
		sequence: 1,
		targetDegree: 180,
		name: "เจดีย์",
		category: "GOOD",
		description:
			"พื้นดวง: เป็นคนใจบุญ มีความยุติธรรม เป็นที่พึ่งพาของญาติพี่น้อง เทวดาย่อมคุ้มครอง ศัตรูทำอันตรายมิได้ \n จร: ปีนี้จะมีความสุข มีลาภเงินทอง ทำราชการจะได้เลื่อนตำแหน่ง คดีความจะชนะ มีเสน่ห์แก่คนทั้งหลาย",
	},
	{
		sequence: 2,
		targetDegree: 155,
		name: "ฉัตรเงิน",
		category: "GOOD",
		description:
			"พื้นดวง: เป็นคนมีเสน่ห์ เป็นที่โปรดปรานของเจ้านาย มีความสุขสบายยิ่งนัก \n จร: ปีนี้จะมีลาภยศ มีความสุข เงินทองไหลมาเทมา หรือจะได้สัตว์ 4 เท้า 2 เท้า ถ้าทำราชการจะได้เลื่อนตำแหน่ง",
	},
	{
		sequence: 3,
		targetDegree: 120,
		name: "คนคอขาด",
		category: "BAD",
		description:
			"พื้นดวง: เป็นคนอาภัพ หาที่พึ่งพามิได้ มีแต่คนคอยหาทุกข์โทษให้ สิ่งของเงินทองมักจะเสียไปเป็นนิจ \n จร: ปีนี้ระวังผู้ใหญ่ให้โทษ จะเกิดถ้อยความ เลือดตกยางออก หรือเสียของรัก",
	},
	{
		sequence: 4,
		targetDegree: 90,
		name: "เรือนหลวง",
		category: "GOOD",
		description:
			"พื้นดวง: จะประกอบด้วยยศถาบรรดาศักดิ์ เป็นที่ชอบใจของเจ้านายและสมณชีพราหมณ์ จะตั้งตัวได้เป็นหลักฐาน \n จร: ปีนี้จะได้ลาภเงินทองหรือสัตว์ 4 เท้า 2 เท้า จะได้ที่พึ่งพาอาศัย คนโสดจะได้พบเนื้อคู่",
	},
	{
		sequence: 5,
		targetDegree: 65,
		name: "ปราสาท",
		category: "GOOD",
		description:
			"พื้นดวง: มีบุญวาสนาสูง จะตั้งตัวเป็นหลักฐานได้ ชะตามีลาภผลพอประมาณ ศัตรูไม่สามารถทำอันตรายได้ \n จร: ปีนี้จะมีความสุขสบาย ก้าวหน้าในหน้าที่การงาน จะได้ลาภยศและบริวาร",
	},
	{
		sequence: 6,
		targetDegree: 30,
		name: "ราหู",
		category: "BAD",
		description:
			"พื้นดวง: น้ำใจไม่แน่นอน ถึงยามรักก็รักจริง ถึงยามเกลียดก็เกลียดอย่างเข้ากระดูกดำ เป็นคนเจ้าโทสะและถือตัว \n จร: ปีนี้ให้ระวังเขี้ยวงา อสรพิษกัดต่อย จะบังเกิดความไข้เจ็บ ปวดหัวมัวตา เสียทรัพย์และของรัก",
	},
	{
		sequence: 7,
		targetDegree: 10,
		name: "ฉัตรทอง",
		category: "GOOD",
		description:
			"พื้นดวง: เป็นคนใจบุญ มีความยุติธรรม เทวดาย่อมคุ้มครอง เป็นที่โปรดปรานของเจ้านาย \n จร: ปีนี้จะมีความสุขกายสบายใจ มีลาภเงินทองและเกียรติยศชื่อเสียง มีผู้อุปถัมภ์ค้ำชู",
	},
	{
		sequence: 8,
		targetDegree: -15,
		name: "เทวดาขี่เต่า",
		category: "GOOD",
		description:
			"พื้นดวง: มักจะอยู่ไม่เป็นที่ ชอบการโยกย้ายและเดินทางท่องเที่ยว มีเพื่อนฝูงมาก ใจไม่ค่อยยั่งยืน \n จร: ปีนี้จะต้องมีการเดินทาง และจะได้ลาภผลเนืองๆ แต่ไม่ใช่ลาภก้อนใหญ่",
	},
	{
		sequence: 9,
		targetDegree: -60,
		name: "คนต้องขื่อคา",
		category: "BAD",
		description:
			"พื้นดวง: ชะตาไม่คงที่ มักดีตอนต้นและร้ายตอนปลาย มีเรื่องให้ต้องโทษทัณฑ์หรือเป็นถ้อยความ มักมีศัตรูคอยแสร้งหาโทษอยู่เนืองๆ \n จร: ปีนี้ระวังถ้อยความหรือเรื่องชู้สาว ถ้าเป็นวัยกลางคนให้ระวังบุตรหลานจะนำความเดือดร้อนมาให้ ระวังอุบัติเหตุยามค่ำคืน",
	},
	{
		sequence: 10,
		targetDegree: -90,
		name: "พ่อหมอ",
		category: "GOOD",
		description:
			"พื้นดวง: เจ้านายและขุนนางผู้ใหญ่จะเมตตาเอ็นดู ให้ลาภผลและยศศักดิ์ตามสมควร \n จร: ปีนี้จะได้ท่านผู้ใหญ่เป็นที่พึ่ง จะได้รับความเมตตาปรานีและได้รับความอุปถัมภ์",
	},
	{
		sequence: 11,
		targetDegree: -120,
		name: "แม่มด",
		category: "GOOD",
		description:
			"พื้นดวง: เป็นคนปากดี เข้าใจพูดแต่มักไม่ชอบทำ นิสัยติดเจ้าชู้ รู้หลักเหลี่ยมและรู้หลบหลีก มีลาภสักการะเนืองๆ \n จร: ปีนี้ให้เข้าหาเจ้านายที่เป็นผู้หญิง จะได้รับความช่วยเหลือและได้ลาภเกื้อกูล",
	},
	{
		sequence: 12,
		targetDegree: -150,
		name: "นาคราช",
		category: "GOOD",
		description:
			"พื้นดวง: มีอำนาจวาสนา บริวารเกรงใจ เป็นคนเจ้าโทสะ ถือตัว และเชื่อมั่นในตัวเองสูง \n จร: ปีนี้ให้ระวังเรื่องเจ็บไข้ได้ป่วยทั่วสรรพางค์กาย ปวดหัวมัวตา ระวังของมีคมและเสียทรัพย์สินเงินทอง",
	},
];

function WheelContent() {
	const searchParams = useSearchParams();

	// รับค่าที่ส่งมาจากหน้า Birthday
	const gender = searchParams.get("gender") || "ชาย";
	const yearBE = parseInt(searchParams.get("year") || "2543");
	const monthName = searchParams.get("month") || "";

	const [rotation, setRotation] = useState<number>(0);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);
	const [result, setResult] = useState<HoroscopeResult | null>(null);

	const handleSpinClick = () => {
		if (isSpinning) return;
		setIsSpinning(true);
		setResult(null);

		// Logic พรหมชาติ: ปี 1924 คือปีชวด (Index 0: เจดีย์)
		const yearAD = yearBE - 543;
		const zodiacOffset = (yearAD - 1924) % 12;

		// ชาย: เวียนขวา (Index เพิ่มขึ้น) | หญิง: เวียนซ้าย (Index ลดลง)
		let targetIndex = 0;
		if (gender === "ชาย") {
			targetIndex = (0 + zodiacOffset) % 12;
		} else {
			targetIndex = (12 - (zodiacOffset % 12)) % 12;
			if (targetIndex === 12) targetIndex = 0;
		}

		const targetData = HOROSCOPE_POSITIONS[targetIndex];

		// คำนวณองศาการหมุน
		let rawTarget = targetData.targetDegree % 360;
		if (rawTarget < 0) rawTarget += 360;

		const baseSpins = 360 * 5;
		let nextRotation = 0;

		// หมุนไปหาเป้าหมายตามเพศ
		if (gender === "หญิง") {
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
			<div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
			<div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full blur-[100px] opacity-20 animate-pulse delay-700"></div>

			<div className="flex flex-col gap-14 w-full">
				<div className="z-10 text-center mt-8">
					<h1 className="text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] tracking-wider">
						ผลคำทำนายของท่าน
					</h1>
					<p className="text-slate-400 text-lg mt-4 font-mono opacity-80 uppercase tracking-widest md:text-3xl">
						{gender === "ชาย" ? "♂ ชาย" : "♀ หญิง"} • พ.ศ. {yearBE} • {monthName}
					</p>
				</div>

				<div className="relative mx-auto w-80 h-80 md:h-[600px] md:w-[600px] z-10">
					<div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
						<div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-600 border-2 border-yellow-800 shadow-inner mb-[-4px] z-20"></div>
						<div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[50px] border-t-yellow-500 filter drop-shadow-lg"></div>
					</div>
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
							onClick={handleSpinClick}
							src="/mu.png"
							alt="Wheel"
							className="w-full h-full object-cover rounded-full"
							style={{ clipPath: "circle(50%)" }}
						/>
					</motion.div>
				</div>

				<div className="z-10 pb-8 flex flex-col items-center min-h-[140px] w-full px-4">
					<>
						{result && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/70 backdrop-blur-sm"
							>
								<motion.div
									initial={{ scale: 0.7, y: 50, opacity: 0 }}
									animate={{ scale: 1, y: 0, opacity: 1 }}
									transition={{ type: "spring", stiffness: 260, damping: 20 }}
									className="relative bg-gradient-to-b from-slate-900 to-black border border-yellow-500/60 rounded-2xl shadow-2xl max-w-5xl max-h-[480px] h-full  w-full px-6 py-4 text-center flex flex-col  justify-center items-center"
								>
									<div className="flex flex-col gap-8">
										{/* ปุ่มปิด */}
										<button
											onClick={() => setResult(null)}
											className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-xl"
										>
											✕
										</button>

										<div className="flex flex-col gap-4">
											<h2
												className={`text-3xl font-extrabold mb-2 drop-shadow-lg sm:text-5xl ${
													result.category === "BAD"
														? "text-red-500"
														: "text-green-400"
												}`}
											>
												ตกที่: {result.name}
											</h2>

											<div className="w-14 h-1 bg-yellow-500 mx-auto mb-4 rounded-full"></div>
										</div>
										{/* เพิ่ม whitespace-pre-line ตรงนี้เพื่อให้ \n ทำงาน */}
										<p className="text-yellow-100/90 text-base text-left leading-relaxed mb-6 whitespace-pre-line sm:text-2xl">
											{result.description}
										</p>

										<div className="flex gap-4 w-full">
											<button
												onClick={() => setResult(null)}
												className="flex-1 py-3 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 text-white transition cursor-pointer text-base sm:text-2xl"
											>
												ปิด
											</button>

											<button
												onClick={() =>
													(window.location.href = "/gender-selection")
												}
												className="flex gap-2 flex-1 py-3 rounded-xl justify-center items-center font-bold bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white transition shadow-lg cursor-pointer text-base sm:text-2xl"
											>
												<IterationCw className="size-6" />
												ทำนายใหม่
											</button>
										</div>
									</div>
								</motion.div>
							</motion.div>
						)}

						{/* ปุ่มเปิดดวง */}
						<button
							onClick={handleSpinClick}
							disabled={isSpinning}
							className={`relative group w-full max-w-xs md:max-w-lg md:h-20 py-4 rounded-xl font-black text-xl uppercase tracking-widest transition-all duration-100 cursor-pointer ${
								isSpinning
									? "opacity-50 cursor-not-allowed translate-y-2"
									: "hover:scale-105"
							}`}
						>
							<div
								className={`absolute inset-0 bg-red-900 rounded-xl transform translate-y-2 transition-transform duration-100 ${
									!isSpinning && "group-active:translate-y-1"
								}`}
							/>
							<div
								className={`absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 rounded-xl border-2 border-yellow-400/50 shadow-[inset_0_2px_10px_rgba(255,255,255,0.3),0_0_20px_rgba(239,68,68,0.6)] flex items-center justify-center transform transition-transform duration-100 ${
									!isSpinning && "group-active:translate-y-1"
								}`}
							/>
							<span
								className={`relative text-white drop-shadow-md flex items-center gap-2 text-xl md:text-3xl justify-center ${
									!isSpinning && "group-active:translate-y-1"
								}`}
							>
								{isSpinning ? (
									<>
										<span className="animate-spin">
											<LoaderPinwheel />
										</span>{" "}
										กำลังคำนวณ...
									</>
								) : (
									"🔮 เปิดดวงชะตา"
								)}
							</span>
						</button>
					</>
				</div>
			</div>
		</div>
	);
}

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
