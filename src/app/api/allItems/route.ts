
import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/db"
import post from "../../../../models/post"

export async function GET() {
  try {

    await connectDB()

    const posts = await post.find().sort({ createdAt: -1 })

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error("GET /api/item error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}