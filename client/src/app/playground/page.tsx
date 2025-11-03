'use client'
import React, { useState } from 'react'
import Play from "@/components/Play"

const Page = () => {
    const [parent, setParent] = useState(true)

    console.log(parent);
    
  return (
    <div className='w-screen min-h-screen p-11'>
<button className='bg-red-400 w-2 h-2 mt-4' onClick={() => setParent((prev) => !prev)}>p</button>
{/* {
    [...Array(10)].map((item, i) => (
        <Play key={i} />
    ))
} */}

<Play /> 
<Play /> 
<Play /> 

    </div>
  )
}

export default Page