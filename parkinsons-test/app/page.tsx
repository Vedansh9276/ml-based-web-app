import Link from "next/link"
import Header from "./components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Parkinson's Online Test</h1>
        <p className="mb-4">
          This simple test is designed to help track motor symptoms associated with Parkinson's disease. Please note
          that this is not a diagnostic tool and should not replace professional medical advice.
        </p>
        <p className="mb-4">
          In this test, you'll be asked to draw a spiral. The steadiness of your line will be measured to give you a
          score. This can help you track changes in your motor control over time.
        </p>
        <p className="mb-6">
          Remember to consult with your healthcare provider about any concerns or changes in your symptoms.
        </p>
        <Link href="/test" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          Start Test
        </Link>
      </main>
    </div>
  )
}

