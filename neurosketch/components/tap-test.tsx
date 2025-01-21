"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Pointer } from "lucide-react"
import { TestCard } from "./test-card"

export function TapTest() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([])
  const [tappedDots, setTappedDots] = useState<number[]>([])

  const generateDots = () => {
    const newDots = Array.from({ length: 10 }, (_, i) => ({
      x: Math.random() * 200,
      y: Math.random() * 200,
      id: i,
    }))
    setDots(newDots)
    setTappedDots([])
  }

  const defaultContent = (
    <div className="text-center space-y-4">
      <Pointer className="w-16 h-16 mx-auto text-primary" />
      <p className="text-muted-foreground">Tap the dots as they appear</p>
    </div>
  )

  const testContent = (
    <motion.div className="relative w-64 h-64 border rounded-lg">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute w-4 h-4 rounded-full ${tappedDots.includes(dot.id) ? "bg-green-500" : "bg-primary"}`}
          style={{ left: dot.x, top: dot.y }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => {
            if (!tappedDots.includes(dot.id)) {
              setTappedDots([...tappedDots, dot.id])
            }
          }}
        />
      ))}
    </motion.div>
  )

  return (
    <TestCard
      title="Tap Speed Test"
      icon={<Pointer className="w-6 h-6 text-primary" />}
      defaultContent={defaultContent}
      testContent={testContent}
      onStart={generateDots}
      isHealthy={true}
    />
  )
}

