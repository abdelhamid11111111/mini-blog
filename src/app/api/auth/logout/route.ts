import { NextResponse } from "next/server";


export async function POST(req: Request){
    const logout = NextResponse.redirect(new URL('/', req.url))
    logout.cookies.delete('authToken')
    return logout;
}

// app/api/auth/logout/route.ts
// import { NextResponse, NextRequest } from "next/server"

// export async function POST(req: NextRequest) {
//   try {
//     const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
    
//     // Clear the auth token cookie
//     response.cookies.set('authToken', '', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 0, // This expires the cookie immediately
//       path: '/',
//     })
    
//     return response

//   } catch (error) {
//     console.error("Logout error:", error)
//     return NextResponse.json({ message: "Logout failed" }, { status: 500 })
//   }
// }