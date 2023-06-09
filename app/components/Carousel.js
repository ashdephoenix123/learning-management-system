'use client';

import Image from 'next/image'
import React from 'react'

const Carousel = () => {
  return (
    <>
      <div className="card2">
        <h2 className="heading1">Welcome</h2>
        <Image width={500} height={500} alt='carousel' className="w-full h-[35vh] object-cover" src='/carousel6.png'></Image>
      </div>
    </>
  )
}

export default Carousel
