import React from 'react'

const Loading = () => {
  return (
    <div>
        <div>
            <div className="px-4 py-8 text-center">
                <div className="flex justify-center items-center">
                    <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loading