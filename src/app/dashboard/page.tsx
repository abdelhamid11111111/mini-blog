'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MyPosts from '../components/myPosts'

interface Post {
  _id: string
  title: string
}

export default function Dashboard() {

  const route = useRouter()
  const { status } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return // Wait for session to load
    if (status !== 'authenticated') {
      setLoading(false)
      setError('Not authenticated')
      return
    }

    const fetchPosts = async () => {
      try {
        
        const res = await fetch('/api/item', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log('Response status:', res.status)
        
        if (!res.ok) {
          const errorText = await res.text()
          console.error('Error response:', errorText)
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        console.log('Fetched data:', data)
        console.log('Posts array:', data.posts)
        
        // Make sure we're setting the posts correctly
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts)
        } else {
          console.error('Posts is not an array:', data.posts)
          setPosts([])
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [status])

  const handleDelete = async (id: unknown) => {
    
    await fetch(`/api/item/${id}`, {
      method: 'DELETE',
    })
    setPosts((prevPost) => prevPost.filter(post => post._id !== id))
  }

  const handleUpdate = async (id: unknown) => {
    route.push(`/editPost/${id}`)
  }

  // Show error state
  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{fontFamily: 'Newsreader, "Noto Sans", sans-serif'}}>
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <p className="text-red-600 text-lg mb-4">Error: {error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{fontFamily: 'Newsreader, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex justify-between gap-3 p-4">
              <p className="text-[32px] font-bold text-[#121416] tracking-light leading-tight">Your Posts</p>
              <Link href="/dashboard/createblog">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-medium leading-normal">
                  <span className="truncate">New Post</span>
                </button>
              </Link>
            </div>
            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-xl border border-[#dde0e3] bg-white">
                <table className="w-full">
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={2} className="px-4 py-8 text-center">
                          <div className="flex justify-center items-center">
                            <p className="text-[#121416] text-sm font-normal">Loading posts...</p>
                          </div>
                        </td>
                      </tr>
                    ) : posts.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center">
                          <div className="flex flex-col px-4 py-6">
                            <div className="flex flex-col items-center gap-6">
                              <div className="flex max-w-[480px] flex-col items-center gap-2">
                                <p className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">No Posts Yet</p>
                                <p className="text-[#121416] text-sm font-normal leading-normal max-w-[480px] text-center">
                                  Start sharing your thoughts and ideas with the world. Create your first post now!
                                </p>
                              </div>
                              
                              <Link href="/dashboard/createblog">
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
                                  <span className="truncate">Create Post</span>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        <tr className=''>
                          <th className="px-4 py-3 text-left text-sm font-medium text-[#121416] bg-[#f8f9fa] border-b border-[#dde0e3]">Title</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-[#121416] bg-[#f8f9fa] border-b border-[#dde0e3]">Actions</th>
                        </tr>
                        {posts.map((post) => (
                          <tr key={post._id} className="border-b border-[#dde0e3] hover:bg-[#f8f9fa] transition-colors">
                            <td className="px-4 py-3 text-left text-[#121416] text-sm">{post.title}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex gap-2 justify-end">
                                <button className="text-blue-600 cursor-pointer hover:text-blue-800 text-sm font-medium"
                                        onClick={() => handleUpdate(post._id)}
                                        >Edit</button>
                                <span className="text-gray-400">|</span>
                                <button className="text-red-600 cursor-pointer hover:text-red-800 text-sm font-medium"
                                        onClick={() => handleDelete(post._id)}
                                        >Remove</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between gap-3 p-4">
              <div className="text-[32px] font-bold text-[#121416] tracking-light leading-tight">
                <MyPosts/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}