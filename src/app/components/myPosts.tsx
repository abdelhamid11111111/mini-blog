import React, { useState } from 'react'
import Image from 'next/image'



interface Post {
    _id: string
    title: string
    description: string
    image: string
    // Add more fields as needed
  }

const MyPosts = () => {

    const [showPosts, setShowPosts] = useState(false)
    const [posts, setPosts] = useState<Post[]>([])

    const showPostsInBottom = async () => {
        setShowPosts(true)

        const res = await fetch('/api/item', {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
          })

          const data = await res.json()

          if (data.posts && Array.isArray(data.posts)) {
            setPosts(data.posts)
          } else {
            setPosts([])
          } 
    }

    const hidePostsInBottom = async () => {
        setShowPosts(false)
    }

  return (
    <div>
        {
            showPosts ? (
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-medium leading-normal">
            <span onClick={hidePostsInBottom} className="truncate">Hide my posts</span>
        </button>
            ) : (
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-medium leading-normal">
            <span onClick={showPostsInBottom} className="truncate">Show my posts</span>
        </button>
            )
        }
        
        

        {
            showPosts && (
                <div className="flex justify-center py-5 px-4">
  <div className="w-full max-w-[960px]">
    {posts?.map((post) => (
      <div key={post._id} className="p-2 sm:p-4">
        <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-4 rounded-lg">
          <div className="flex flex-col gap-1 flex-1 md:flex-[2_2_0px]">
            <p className="text-[#111418] text-base font-bold leading-tight">{post.title}</p>
            <p className="text-[#60748a] text-sm font-normal leading-normal">{post.description}</p>
          </div>
          <div className="relative w-full md:w-[400px] h-[200px] md:h-[225px] rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 400px"
              priority={false}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
            )
        }
    </div>
  )
}

export default MyPosts