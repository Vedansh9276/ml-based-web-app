"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/header"

export default function Test() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const { offsetX, offsetY } = e.nativeEvent
    setPoints([{ x: offsetX, y: offsetY }])
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      const { offsetX, offsetY } = e.nativeEvent
      ctx.beginPath()
      ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y)
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke()
      setPoints([...points, { x: offsetX, y: offsetY }])
    }
  }

  const endDrawing = () => {
    setIsDrawing(false)
    const score = calculateScore(points)
    router.push(`/results?score=${score}`)
  }

  const calculateScore = (points: { x: number; y: number }[]): number => {
    let totalDeviation = 0
    for (let i = 2; i < points.length; i++) {
      const expectedX = (points[i - 2].x + points[i].x) / 2
      const expectedY = (points[i - 2].y + points[i].y) / 2
      const actualX = points[i - 1].x
      const actualY = points[i - 1].y
      const deviation = Math.sqrt(Math.pow(expectedX - actualX, 2) + Math.pow(expectedY - actualY, 2))
      totalDeviation += deviation
    }
    const averageDeviation = totalDeviation / (points.length - 2)
    const maxScore = 100
    const score = Math.max(0, Math.min(maxScore, maxScore - averageDeviation))
    return Math.round(score)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Drawing Test</h1>
        <p className="mb-4">Please draw a spiral in the box below. Try to make it as smooth and steady as possible.</p>
        <div className="border-2 border-gray-300 rounded">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            className="cursor-crosshair"
          />
        </div>
      </main>
    </div>
  )
}

