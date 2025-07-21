'use client'

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

  const { status } = useSession();
  const isLoggedIn = status === "authenticated";


  
  return (
    <>
      
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
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
        <div className="flex flex-1 justify-end gap-8 mr-9">
          <div className="flex items-center gap-9">
            <Link href='/' className="text-[#111418] text-sm font-medium leading-normal">Home</Link>
            <Link href='/dashboard' className="text-[#111418] text-sm font-medium leading-normal">Dashboard</Link>

            {isLoggedIn ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                Sign Out
              </button>
            ) : (
              <Link href='/signin' className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
