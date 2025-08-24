// Check your login route - it should look like this:
// app/api/auth/login/route.ts
import { NextResponse, NextRequest } from "next/server"
import { connectDB } from "../../../../../lib/db"
import User from "../../../../../models/user" // or whatever your user model is
import { createJwt } from "../../../../../utils/jwt" // Make sure you're using the new createJwt
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 })
    }

    await connectDB()
    
    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // ✅ Create JWT token using the new async function
    const token = await createJwt({ email: user.email, password: user.password })
    
    console.log('Created token:', token ? 'SUCCESS' : 'FAILED') // Debug log
    
    // ✅ Set cookie properly
    const response = NextResponse.json({ message: "Login successful", user: { email: user.email }}, { status: 200 })

    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/', // ✅ Important: set path to root
    })
    
    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}
