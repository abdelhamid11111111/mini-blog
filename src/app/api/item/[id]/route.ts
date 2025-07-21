import { connectDB } from "../../../../../lib/db";
import { NextResponse, NextRequest } from "next/server";
import Post from "../../../../../models/post";


export async function DELETE(_: Request, {params} : {params: {id: string}}){
    // try{
        await connectDB()
        await Post.findByIdAndDelete(params.id)
        return NextResponse.json({ status: 204 })
    // } catch(error){

    // }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    await connectDB();
    const body = await req.json();
    const postUpdated = await Post.findByIdAndUpdate(context.params.id, body, { new: true });
  
    if (!postUpdated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  
    return NextResponse.json(postUpdated, { status: 200 });
  }


  export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    
    const { id } = params;
    const post = await Post.findById(id);
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(post, { status: 200 });
  }