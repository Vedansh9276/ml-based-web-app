"use client"

import { useState, useCallback } from "react"

interface TestResult {
  testType: string
  score: number
  details: any
}

export function useTestData(email: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveTestResult = useCallback(
    async (testResult: TestResult) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/test-results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            ...testResult,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to save test result")
        }

        const data = await response.json()
        return data
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [email],
  )

  const fetchTestResults = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/test-results?email=${encodeURIComponent(email)}`)

      if (!response.ok) {
        throw new Error("Failed to fetch test results")
      }

      const data = await response.json()
      return data.data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [email])

  return {
    saveTestResult,
    fetchTestResults,
    isLoading,
    error,
  }
}

