"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"

const Particle = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const x = useMotionValue(Math.random() * window.innerWidth)
  const y = useMotionValue(Math.random() * window.innerHeight)
  const controls = useAnimation()

  useEffect(() => {
    const updatePosition = () => {
      const dx = mouseX - x.get()
      const dy = mouseY - y.get()
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 100

      if (distance < maxDistance) {
        controls.start({
          x: x.get() - dx * 0.1,
          y: y.get() - dy * 0.1,
          transition: { duration: 0.5 },
        })
      } else {
        controls.start({
          x: x.get() + (Math.random() - 0.5) * 2,
          y: y.get() + (Math.random() - 0.5) * 2,
          transition: { duration: 2 },
        })
      }
    }

    const interval = setInterval(updatePosition, 50)
    return () => clearInterval(interval)
  }, [x, y, mouseX, mouseY, controls])

  return <motion.div className="absolute w-2 h-2 rounded-full bg-primary/30" style={{ x, y }} animate={controls} />
}

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <Particle key={i} mouseX={mouseX.get()} mouseY={mouseY.get()} />
      ))}
    </div>
  )
}

