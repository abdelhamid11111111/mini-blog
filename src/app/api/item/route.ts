// app/api/item/route.ts

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../lib/authOptions"
import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/db"
import post from "../../../../models/post"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    await connectDB()

    const posts = await post.find({ userEmail: session.user.email }).sort({ createdAt: -1 })

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error("GET /api/item error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const { title, description, image } = await req.json()
    await connectDB()

    if (!title || !description || !image) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    console.log("Creating post for:", session.user.email)
    console.log("Post data:", { title, description, image, userEmail: session.user.email })
    
    const newPost = await post.create({
      title,
      description,
      image,
      userEmail: session.user.email, // ✅ Save by email
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("POST /api/item error:", error)
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 })
  }
}
