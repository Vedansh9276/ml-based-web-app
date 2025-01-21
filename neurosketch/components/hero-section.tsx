"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useCursorPosition } from "@/hooks/use-cursor-position"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const brainRef = useRef<HTMLDivElement>(null)
  const cursorPosition = useCursorPosition()
  const controls = useAnimation()

  useEffect(() => {
    const handleMouseMove = () => {
      if (!brainRef.current) return
      const { left, top, width, height } = brainRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const maxDistance = Math.max(width, height) / 2

      const dx = cursorPosition.x - centerX
      const dy = cursorPosition.y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      const normalizedDistance = Math.min(distance / maxDistance, 1)
      const scale = 1 + normalizedDistance * 0.1

      controls.start({
        x: dx * 0.05,
        y: dy * 0.05,
        scale,
        transition: { type: "spring", stiffness: 100, damping: 10 },
      })
    }

    handleMouseMove()
  }, [cursorPosition, controls])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Brain Wellness Scan
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Leading the way in diagnostic excellence since 1970. Experience the next generation of neural imaging
              technology.
            </motion.p>
            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Your Scan Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              ref={brainRef}
              animate={controls}
              className="relative transition-transform duration-200 ease-out"
            >
              <motion.img
                src="https://sjc.microlink.io/NbC0TU9fDAt7t9Rjhx4l1l5_EjWfX5PfO7ZaoyiI9K_CTQHR8TfIT2WYAQqXh2w-GWgQC1wDR9Su8efCml6OsQ.jpeg"
                alt="Brain Visualization"
                className="w-full h-auto max-w-2xl mx-auto rounded-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 mix-blend-overlay rounded-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

