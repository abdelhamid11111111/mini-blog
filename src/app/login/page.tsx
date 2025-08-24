'use client';
import React, { FormEvent, useState } from 'react'
import Link from 'next/link';
import Navbar from '../components/navbar';
import { toast } from 'sonner';
import { useAuth } from '../api/auth/contexts/AuthContext'
import { useRouter } from 'next/navigation';



const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login, checkAuthStatus } = useAuth() // ✅ Get functions from context
  const router = useRouter()



    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setError('')
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        })
  
        const data = await response.json()
        
        if (response.ok) {
          // ✅ Update auth context immediately
          login({ email: data.user.email })
          
          // ✅ Also refresh auth status to make sure everything is in sync
          await checkAuthStatus()
          
          console.log('Login successful, redirecting...')
          
          // Redirect to dashboard or home
          router.push('/dashboard')
          toast.success('Login successfully')
        } else {
          setError(data.message || 'Login failed')
        }
      } catch (error) {
        console.error('Login error:', error)
        setError('Login failed')
      } finally {
        setLoading(false)
      }
    }

  return (
    
    <div>

      <main
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Newsreader, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <Navbar/>
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
              <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
                Welcome back
              </h2>
              {
                error && (
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
                )

              }
              <div className="max-w-[480px] w-full space-y-4 px-4 py-3">
                
                <label className="flex flex-col w-full">
                    <p className="text-[#111418] text-base font-medium leading-normal pb-2">
                    Email
                    </p>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="form-input w-full h-14 rounded-lg border border-[#dbe0e6] bg-white px-[15px] text-base text-[#111418] placeholder:text-[#60748a] focus:outline-0 focus:ring-0 focus:border-[#dbe0e6]"
                    />
                </label>
                
                <label className="flex flex-col w-full">
                    <p className="text-[#111418] text-base font-medium leading-normal pb-2">
                    Password
                    </p>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="form-input w-full h-14 rounded-lg border border-[#dbe0e6] bg-white px-[15px] text-base text-[#111418] placeholder:text-[#60748a] focus:outline-0 focus:ring-0 focus:border-[#dbe0e6]"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full h-14 cursor-pointer rounded-lg bg-[#0c77f2] text-white text-sm font-bold leading-normal tracking-[0.015em] flex items-center justify-center"
                    onClick={handleSubmit}
                >
                    <span className="truncate">Sign in</span>
                </button>
                </div>

              <div className="text-[#60748a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                No account? <Link href='/signup' className="underline">Create one</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



export default SignIn