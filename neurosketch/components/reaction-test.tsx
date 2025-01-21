"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { TestCard } from "./test-card"

export function ReactionTest() {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  const handleStart = () => {
    setCountdown(3)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          setIsActive(true)
          return null
        }
        return prev ? prev - 1 : null
      })
    }, 1000)
  }

  const defaultContent = (
    <div className="text-center space-y-4">
      <Clock className="w-16 h-16 mx-auto text-primary" />
      <p className="text-muted-foreground">Test your reaction time</p>
    </div>
  )

  const testContent = (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="w-32 h-32 flex items-center justify-center text-4xl font-bold"
      style={{ background: isActive ? "#22c55e" : "#ef4444" }}
    >
      {countdown || (isActive ? "Click!" : "...")}
    </motion.div>
  )

  return (
    <TestCard
      title="Reaction Time Test"
      icon={<Clock className="w-6 h-6 text-primary" />}
      defaultContent={defaultContent}
      testContent={testContent}
      onStart={handleStart}
      isHealthy={true}
    />
  )
}

