import { connectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import { encrypt } from "@/lib/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, name } = await req.json()

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ email, name })
    }

    const token = await encrypt({ id: user._id, email, name })
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}

