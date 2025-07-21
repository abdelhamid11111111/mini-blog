'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import Navbar from '../components/navbar';
import {toast} from 'sonner'
import { useRouter } from 'next/navigation';




export default function SignUp() {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const router = useRouter()
    const [error, setError] = useState(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'}, 
            body: JSON.stringify(form)
        })

        const data = await res.json()

        if (res.ok) {
            toast.success(data.message);
            router.push("/signin");
  
          } else if (res.status === 400) {
            setError(data.message);
  
          } else if (res.status === 500) {
            setError(data.message);
          }
    }


  return (
    <>
      

      <div
        className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Newsreader, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <Navbar/>
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
              <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 ">Create your account</h2>
              {error && (
                <div className="max-w-md mx-auto my-4 p-4 border border-red-400 bg-red-50 text-red-700 rounded-md flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M6.343 6.343l12.728 12.728"></path>
                  </svg>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <form className="w-full max-w-[480px] space-y-4 px-4 py-3">
                <label className="block w-full">
                    <p className="text-[#111418] text-base font-medium leading-normal pb-2">Username</p>
                    <input
                    placeholder="Username"
                    className="w-full rounded-lg bg-[#f0f2f5] p-4 text-base text-[#111418] placeholder:text-[#60748a] h-14 focus:outline-none"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                </label>

                <label className="block w-full">
                    <p className="text-[#111418] text-base font-medium leading-normal pb-2">Email</p>
                    <input
                    placeholder="Email"
                    className="w-full rounded-lg bg-[#f0f2f5] p-4 text-base text-[#111418] placeholder:text-[#60748a] h-14 focus:outline-none"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </label>

                <label className="block w-full">
                    <p className="text-[#111418] text-base font-medium leading-normal pb-2">Password</p>
                    <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg bg-[#f0f2f5] p-4 text-base text-[#111418] placeholder:text-[#60748a] h-14 focus:outline-none"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </label>

                <label className="block w-full">
                    <p className="text-[#111418] text-base font-medium leading-normal pb-2">Confirm Password</p>
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full rounded-lg bg-[#f0f2f5] p-4 text-base text-[#111418] placeholder:text-[#60748a] h-14 focus:outline-none"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    />
                </label>

                <button
                    className="w-full rounded-lg bg-[#0c77f2] h-14 px-4 cursor-pointer text-white text-sm font-bold tracking-[0.015em] hover:bg-[#0b6de0] transition"
                    type="submit"
                    onClick={handleSubmit}
                >
                    <span className="truncate">Sign Up</span>
                </button>
                </form>
                <Link href='/signin' className="text-[#60748a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                   Already have an account?
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


