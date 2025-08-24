'use client'
import Image from "next/image";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import NotFoud from "./components/notFoud";
interface Post {
  _id: string
  title: string
  description: string
  image: string
  // Add more fields as needed
}
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const  fetchPosts = async () => {
      const res = await fetch('/api/allItems', {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'}
      })
      // if (!res.ok) {
      //   const errorText = await res.text()
      // }
      const data = await res.json()
      if (data.posts && Array.isArray(data.posts)) {
        setPosts(data.posts)
      } else {
        setPosts([])
      } 
        setLoading(false)
    
    }
    fetchPosts()
  }, [])
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: 'Newsreader, "Noto Sans", sans-serif'}}>       
  <div className="layout-container flex h-full grow flex-col">         
    <Navbar/>         
    <div className="px-4 sm:px-8 md:px-40 flex flex-1 justify-center py-5">           
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">             
        <div className="flex flex-wrap justify-between gap-3 p-2 sm:p-4">               
          <p className="text-[#111418] tracking-light text-2xl sm:text-3xl md:text-[32px] font-bold leading-tight min-w-0 sm:min-w-72">Blogs</p>             
        </div>             
        {loading ? (                                     
          <Loading/>                                         
        )  : posts.length === 0 ? (                                              
          <NotFoud/>                     
        ) : (                       
          <>                                                
            {posts?.map((post) => (                         
              <div key={post._id} className="p-2 sm:p-3 md:p-4">                           
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-lg">
                  
                  {/* Image First on Mobile - Text Second */}
                  <div className="relative w-full md:w-[400px] h-[220px] sm:h-[250px] md:h-[225px] rounded-lg overflow-hidden order-1">                               
                    <Image                                  
                      src={post.image}                                  
                      alt={post.title}                                  
                      fill                                  
                      style={{ objectFit: 'cover' }}                                  
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 400px"                                 
                      priority={false}                               
                    />                             
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-2 flex-1 md:flex-[2_2_0px] order-2">                               
                    <p className="text-[#111418] text-base sm:text-lg md:text-base font-bold leading-tight">{post.title}</p>                               
                    <p className="text-[#60748a] text-sm sm:text-base md:text-sm font-normal leading-normal">
                      {/* Show more text on mobile, truncate on desktop */}
                      <span className="block md:hidden">{post.description}</span>
                      <span className="hidden md:block md:line-clamp-8">{post.description}</span>
                    </p>                             
                  </div>
                                           
                </div>                         
              </div>                           
            ))}                       
          </>                     
        )}                        
      </div>         
    </div>       
  </div>     
</div>
  );
}