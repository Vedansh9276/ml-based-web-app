"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTestData } from "@/hooks/use-test-data"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

interface TestCardProps {
  title: string
  icon: React.ReactNode
  defaultContent: React.ReactNode
  testContent: React.ReactNode
  onStart: () => void
  isHealthy?: boolean
  email: string
  score?: number | null
}

export function TestCard({
  title,
  icon,
  defaultContent,
  testContent,
  onStart,
  isHealthy,
  email,
  score,
}: TestCardProps) {
  const { saveTestResult, isLoading } = useTestData(email)
  const [isTestMode, setIsTestMode] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const handleCheck = async () => {
    setIsChecking(true)
    try {
      await saveTestResult({
        testType: title,
        score: score !== null ? score : isHealthy ? 1 : 0,
        details: {
          timestamp: new Date().toISOString(),
          result: isHealthy ? "healthy" : "not_healthy",
        },
      })
      toast({
        title: "Test Complete",
        description: "Your results have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save test results. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
      setIsTestMode(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border p-6 shadow-lg"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isTestMode ? "test" : "default"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-[200px] flex items-center justify-center"
          >
            {isTestMode ? testContent : defaultContent}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            <Button
              variant={isHealthy ? "default" : "destructive"}
              onClick={() => (!isTestMode ? (setIsTestMode(true), onStart()) : handleCheck())}
              className="w-24"
            >
              {!isTestMode ? "Start Test" : "Submit Results"}
            </Button>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Healthy</span>
                <span>{score !== null ? `${Math.round(score * 100)}%` : "0%"}</span>
              </div>
              <Progress value={score !== null ? score * 100 : 0} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Parkinson's Risk</span>
                <span>{score !== null ? `${Math.round((1 - score) * 100)}%` : "0%"}</span>
              </div>
              <Progress value={score !== null ? (1 - score) * 100 : 0} className="h-2" />
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {isChecking ? "Analyzing results..." : score !== null ? "Test completed" : "Not tested"}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

