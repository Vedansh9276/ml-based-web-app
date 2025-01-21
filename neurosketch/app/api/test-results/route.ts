import { connectDB, disconnectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const { email, testType, score, details } = body

    if (!email || !testType || score === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          testResults: {
            testType,
            score,
            details,
          },
        },
      },
      { upsert: true, new: true },
    )

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("Error saving test results:", error)
    return NextResponse.json({ success: false, error: "Failed to save test results" }, { status: 500 })
  } finally {
    await disconnectDB()
  }
}

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user.testResults })
  } catch (error) {
    console.error("Error fetching test results:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch test results" }, { status: 500 })
  } finally {
    await disconnectDB()
  }
}

