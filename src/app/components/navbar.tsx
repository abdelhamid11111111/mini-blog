// components/Navbar.tsx
'use client'
import Link from "next/link"
import { useAuth } from "../api/auth/contexts/AuthContext"

export default function Navbar() {
  const { isLoggedIn, logout, loading, user } = useAuth()

  // if (loading) {
  //   return (
  //     <header className="relative flex items-center justify-between border-b border-solid border-b-[#f0f2f5] px-10 py-3">
  //       <div className="flex items-center gap-4 text-[#111418]">
  //         <div className="size-4">
  //           <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  //             <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
  //           </svg>
  //         </div>
  //         <Link href='/'>
  //           <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Bloggr</h2>
  //         </Link>
  //       </div>
        
  //       <div className="absolute left-1/2 -translate-x-1/2 flex gap-9">
  //         <Link href='/' className="text-[#111418] text-sm font-medium leading-normal">Home</Link>
  //         <Link href='/dashboard' className="text-[#111418] text-sm font-medium leading-normal">Dashboard</Link>
  //       </div>

  //       <div className="flex items-center gap-4">
  //         <div className="h-10 w-16 bg-gray-200 animate-pulse rounded-lg"></div>
  //       </div>
  //     </header>
  //   )
  // }

  return (
    <header className="relative flex items-center justify-between border-b border-solid border-b-[#f0f2f5] px-10 py-3">
      {/* Left: Logo */}
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
        </div>
        <Link href='/'>
          <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Bloggr</h2>
        </Link>
      </div>

      {/* Center: Home and Dashboard */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-9">
        <Link href='/' className="text-[#111418] text-sm font-medium leading-normal">Home</Link>
        <Link href='/dashboard' className="text-[#111418] text-sm font-medium leading-normal">Dashboard</Link>
      </div>

      {/* Right: Sign In / Out */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            {/* {user?.email && (
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            )} */}
            <button
              onClick={logout}
              className="flex h-10 items-center rounded-lg bg-[#f0f2f5] px-4 text-sm font-bold text-[#111418] hover:bg-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex h-10 items-center rounded-lg bg-[#f0f2f5] px-4 text-sm font-bold text-[#111418] hover:bg-gray-300 transition-colors"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  )
}
