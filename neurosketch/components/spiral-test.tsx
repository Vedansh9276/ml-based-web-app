"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { CircleDot } from "lucide-react"
import { TestCard } from "./test-card"

export function SpiralTest({ email }: { email: string }) {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleStart = () => {
    setPoints([])
    setIsDrawing(true)
    setScore(null)
  }

  const handleEnd = () => {
    setIsDrawing(false)
    calculateScore()
  }

  const calculateScore = () => {
    if (points.length < 2) return

    let totalDeviation = 0
    const center = { x: 150, y: 150 }
    const expectedRadius = 75

    for (let i = 0; i < points.length; i++) {
      const point = points[i]
      const dx = point.x - center.x
      const dy = point.y - center.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const deviation = Math.abs(distance - expectedRadius)
      totalDeviation += deviation
    }

    const averageDeviation = totalDeviation / points.length
    const normalizedScore = Math.max(0, Math.min(1, 1 - averageDeviation / expectedRadius))
    setScore(normalizedScore)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = "rgba(var(--primary-rgb), 0.8)"
        ctx.lineWidth = 2
        ctx.beginPath()
        points.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })
        ctx.stroke()
      }
    }
  }, [points])

  const defaultContent = (
    <div className="text-center space-y-4">
      <CircleDot className="w-16 h-16 mx-auto text-primary" />
      <p className="text-muted-foreground">Draw the spiral pattern</p>
    </div>
  )

  const testContent = (
    <div className="relative w-[300px] h-[300px]">
      <svg className="absolute inset-0" width="300" height="300">
        <circle cx="150" cy="150" r="75" fill="none" stroke="rgba(var(--primary-rgb), 0.2)" strokeWidth="2" />
      </svg>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onMouseMove={(e) => {
          if (isDrawing) {
            const rect = e.currentTarget.getBoundingClientRect()
            setPoints([
              ...points,
              {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              },
            ])
          }
        }}
      />
    </div>
  )

  return (
    <TestCard
      title="Spiral Test"
      icon={<CircleDot className="w-6 h-6 text-primary" />}
      defaultContent={defaultContent}
      testContent={testContent}
      onStart={handleStart}
      isHealthy={score !== null ? score > 0.7 : undefined}
      email={email}
      score={score}
    />
  )
}

