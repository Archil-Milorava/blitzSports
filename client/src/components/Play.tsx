'use client'
import React, { useState } from 'react'

const Play = () => {
    const [number, setNumber] = useState(0)
  return (
    <div className='w-[10rem] h-[5rem] m-4 text-black border-2 border-black'>
        

        <div>{number}</div>
        <button className='px-5 py-1 text-white bg-gray-500' onClick={() => setNumber((e) => e + 1)}>click</button>
    </div>
  )
}

export default Play