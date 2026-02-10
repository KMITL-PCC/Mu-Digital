'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../globals.css'

type PopupWordleProps = {
  open: boolean
  onClose: () => void
}
type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}
function PopupWordle({ open, onClose }: PopupWordleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const particles = useRef<Particle[]>([])
  const raf = useRef<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    const popup = popupRef.current
    if (!canvas || !popup) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    const colors = ['#a855f7', '#38bdf8', '#22d3ee', '#c084fc', '#f472b6']
    const spawnBurst = () => {
      const rect = popup.getBoundingClientRect()
      const points = [
        { x: rect.left - 80, y: rect.top + rect.height * 0.3 },
        { x: rect.right + 80, y: rect.top + rect.height * 0.3 },
        { x: rect.left + rect.width * 0.3, y: rect.top - 80 },
        { x: rect.left + rect.width * 0.7, y: rect.bottom + 80 },
        { x: rect.right + 60, y: rect.bottom - 60 }
      ]
      points.forEach((pos, i) => {
        const color = colors[i % colors.length]
        for (let j = 0; j < 40; j++) {
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 3 + 1.5
          particles.current.push({
            x: pos.x,
            y: pos.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 90,
            color
          })
        }
      })
    }
    spawnBurst()
    const interval = setInterval(spawnBurst, 1600)
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      particles.current = particles.current.filter(p => p.life > 0)
      particles.current.forEach(p => {
        p.vy += 0.02
        p.x += p.vx
        p.y += p.vy
        p.life--
        ctx.strokeStyle = p.color
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2)
        ctx.stroke()
      })
      raf.current = requestAnimationFrame(update)
    }
    update()
    return () => {
      clearInterval(interval)
      if (raf.current) cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      particles.current = []
    }
  }, [open])
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-700/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />
          <motion.div
            ref={popupRef}
            onClick={e => e.stopPropagation()}
            className="
              relative z-10
              w-[520px] max-h-[80vh]
              rounded-2xl
              bg-gradient-to-br from-[#0b1020] to-[#05070f]
              text-white
              grid grid-rows-[auto_1fr_auto]
              overflow-hidden
            "
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
          >
            <div className="py-4 text-center border-b border-white/10">
              <h1 className="text-xl font-semibold">ผลการทำนาย</h1>
            </div>
            <div className="popup-scroll px-8 py-6 space-y-6 overflow-y-auto">
                <style jsx>{`
                .popup-scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .popup-scroll::-webkit-scrollbar {
                    display: none;
                }
                `}</style>
              <div className="flex justify-center">
                <img src="mu.png" className="h-48" />
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-purple-300">
                  คนต้องขื่อคา
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  อุอิอ๊า
                  <br /><br />
                  Adults often deny believing in magic, but on closer inspection, much of our behavior is more magical than we think.
                   Eugene Subbotsky, who for over 40 years has studied the development of magical thinking, has suggested that in adults,
                    magical beliefs are simply suppressed and can be reactivated given the appropriate conditions.
                     His research also suggests that when denial of a magical belief is costly,
                      adults are happy to give up their belief in the power of physical causality and view the world in terms of magical explanations.
                </p>
              </div>
            </div>
            <div className="py-4 flex justify-center border-t border-white/10">
              <button
                onClick={onClose}
                className="px-8 h-11 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
              >
                ดูดวงอีกครั้ง
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default PopupWordle