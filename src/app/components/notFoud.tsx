import React from 'react'

const NotFoud = () => {
  return (
    <div>
        <div className="flex flex-col px-4 py-6">
  <div className="flex flex-col items-center gap-6">
    

    <div className="flex max-w-[480px] flex-col items-center gap-2">
      <p className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
        No Posts Found
      </p>
      <p className="text-[#111418] text-sm font-normal leading-normal max-w-[480px] text-center">
        There are currently no blog posts available. Please check back later.
      </p>
    </div>

    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
      <span className="truncate">Refresh</span>
    </button>
  </div>
</div>
    </div>
  )
}

export default NotFoud