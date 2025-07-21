import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

// error
export async function POST(req: Request){
    try{
        await connectDB()

        const { username, email, password, confirmPassword } = await req.json()

        const isValidEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          };

        if(!isValidEmail(email)){
            return NextResponse.json({message: 'Email not valid'}, {status: 400})
        }

        if(!username || !email || !password || !confirmPassword){
            return NextResponse.json({message: 'All fields are required'}, {status: 400})
        }

        if(password !== confirmPassword){
            return NextResponse.json({message: 'Password not match'}, {status: 400})
        }

        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
        }

        const user = await User.findOne({ email })

        if(user){
            return NextResponse.json({message: 'User already exist'}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash( password, 10 )

        const NewUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await NewUser.save()

        return NextResponse.json({message: 'User created'}, {status: 201})

    } catch(error){
        console.error('Server error:', error);
        return NextResponse.json({message: 'Server error'}, {status: 500})
    }
}