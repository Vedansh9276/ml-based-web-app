"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ParticleEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const particles = Array.from({ length: 50 }).map((_, i) => {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 rounded-full bg-primary/50"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particlesRef.current[i] = particle
      containerRef.current?.appendChild(particle)
      return particle
    })

    const animate = () => {
      particles.forEach((particle) => {
        const x = Number.parseFloat(particle.style.left)
        const y = Number.parseFloat(particle.style.top)

        particle.style.left = `${(x + Math.random() - 0.5) % 100}%`
        particle.style.top = `${(y + Math.random() - 0.5) % 100}%`
      })
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      particles.forEach((particle) => particle.remove())
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
}

