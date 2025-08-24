// app/api/item/route.ts

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../../lib/db"
import post from "../../../../models/post"
import { verifyJwt, parseAuthCookie } from "../../../../utils/jwt"



function authenticationRequest(req: Request){
  const token = parseAuthCookie(req.headers.get('cookie'))

  if(!token){
    return null
  }
  const payload = verifyJwt(token)
  if(payload){
    return payload
  }
} 


export async function GET(req: NextRequest) {

  const user = await authenticationRequest(req)
  if (!user || !user.email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  try {

    await connectDB()

    const posts = await post.find({ userEmail: user.email }).sort({ createdAt: -1 })

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error("GET /api/item error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {

  const user = await authenticationRequest(req)
  if (!user || !user.email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }
  try {
    
    const { title, description, image } = await req.json()
    await connectDB()

    if (!title || !description || !image) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    
    const newPost = await post.create({
      title,
      description,
      image,
      userEmail: user.email, // ✅ Save by email
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("POST /api/item error:", error)
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 })
  }
}
