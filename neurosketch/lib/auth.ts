import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_please_change")

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, JWT_SECRET, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function getSession() {
  const token = cookies().get("token")?.value
  if (!token) return null
  try {
    return await decrypt(token)
  } catch (error) {
    return null
  }
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  if (!token) return null
  try {
    const session = await decrypt(token)
    if (!session) return null

    // Refresh the token
    const newToken = await encrypt(session)
    request.cookies.set("token", newToken)
    return session
  } catch (error) {
    return null
  }
}

