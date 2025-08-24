// app/api/auth/verify/route.ts
import { NextResponse, NextRequest } from "next/server"
import { verifyJwt, parseAuthCookie } from "../../../../../utils/jwt"

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie')
    const token = parseAuthCookie(cookieHeader)
    
    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 })
    }
    
    const payload = await verifyJwt(token) // ✅ Added await here
    
    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
    
    return NextResponse.json({ 
      email: payload.email, 
      authenticated: true 
    }, { status: 200 })

  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ message: "Authentication failed" }, { status: 401 })
  }
}