// app/api/item/[id]/route.ts - Fixed for Next.js 15+
import { connectDB } from "../../../../../lib/db";
import { NextResponse, NextRequest } from "next/server";
import Post from "../../../../../models/post";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB()
        
        // ✅ Await params before using
        const { id } = await params
        
        const deletedPost = await Post.findByIdAndDelete(id)
        
        if (!deletedPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }
        
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })
    } catch (error) {
        console.error("DELETE /api/item/[id] error:", error)
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB()
        
        // ✅ Await params before using
        const { id } = await params
        
        const body = await req.json()
        
        const postUpdated = await Post.findByIdAndUpdate(id, body, { new: true })
        
        if (!postUpdated) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }
        
        return NextResponse.json(postUpdated, { status: 200 })
    } catch (error) {
        console.error("PUT /api/item/[id] error:", error)
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB()
        
        // ✅ Await params before using
        const { id } = await params
        
        const post = await Post.findById(id)
        
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }
        
        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        console.error("GET /api/item/[id] error:", error)
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
    }
}