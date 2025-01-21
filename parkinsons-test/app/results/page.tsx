"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "../components/header"

export default function Results() {
  const searchParams = useSearchParams()
  const score = searchParams.get("score")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Test Results</h1>
        <p className="mb-4">
          Your steadiness score: <span className="font-bold text-2xl">{score}</span> out of 100
        </p>
        <p className="mb-4">
          This score is based on the steadiness of your drawn line. A higher score indicates steadier hand movement.
        </p>
        <p className="mb-6">
          Remember, this test is not a diagnosis. If you have any concerns about your score or symptoms, please consult
          with your healthcare provider.
        </p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          Back to Home
        </Link>
      </main>
    </div>
  )
}

