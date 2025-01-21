"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic } from "lucide-react"
import { TestCard } from "./test-card"

export function VoiceTest() {
  const [isRecording, setIsRecording] = useState(false)

  const handleStart = () => {
    setIsRecording(true)
  }

  const defaultContent = (
    <div className="text-center space-y-4">
      <Mic className="w-16 h-16 mx-auto text-primary" />
      <p className="text-muted-foreground">Record your voice</p>
    </div>
  )

  const testContent = (
    <div className="text-center space-y-4">
      <motion.div
        animate={{
          scale: isRecording ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
        }}
        className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center"
      >
        <Mic className="w-8 h-8 text-red-500" />
      </motion.div>
      <p className="text-primary font-medium">"The quick brown fox jumps over the lazy dog"</p>
    </div>
  )

  return (
    <TestCard
      title="Voice Test"
      icon={<Mic className="w-6 h-6 text-primary" />}
      defaultContent={defaultContent}
      testContent={testContent}
      onStart={handleStart}
      isHealthy={true}
    />
  )
}

