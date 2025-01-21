import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/" || path.startsWith("/api/auth")

  const session = await updateSession(request)

  // Redirect to login if accessing protected route without session
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to tests if accessing login with valid session
  if (session && path === "/login") {
    return NextResponse.redirect(new URL("/tests", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

