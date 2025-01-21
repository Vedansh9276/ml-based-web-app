"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

const NeuronNode = ({ x, y }: { x: number; y: number }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: Math.random() * 2 + 1,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }, [controls])

  return (
    <motion.div
      className="absolute w-2 h-2 bg-primary rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={controls}
    />
  )
}

const NeuronConnection = ({ start, end }: { start: { x: number; y: number }; end: { x: number; y: number } }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: [0.2, 0.5, 0.2],
      transition: {
        duration: Math.random() * 2 + 1,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }, [controls])

  const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI
  const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

  return (
    <motion.div
      className="absolute bg-primary/30 h-px origin-left"
      style={{
        left: `${start.x}%`,
        top: `${start.y}%`,
        width: `${length}%`,
        transform: `rotate(${angle}deg)`,
      }}
      animate={controls}
    />
  )
}

export function FuturisticBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodes = useRef<{ x: number; y: number }[]>([])
  const connections = useRef<{ start: { x: number; y: number }; end: { x: number; y: number } }[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()
    nodes.current = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))

    connections.current = nodes.current
      .flatMap((node, i) =>
        nodes.current.slice(i + 1).map((otherNode) => ({
          start: node,
          end: otherNode,
        })),
      )
      .filter(() => Math.random() < 0.2)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {nodes.current.map((node, i) => (
        <NeuronNode key={i} x={node.x} y={node.y} />
      ))}
      {connections.current.map((connection, i) => (
        <NeuronConnection key={i} start={connection.start} end={connection.end} />
      ))}
    </div>
  )
}

