import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SemesterCard = ({ item, coursecode }) => {
  const { semester, subjects } = item;

  return (
    <Link href={`semesters/${semester}`} className="card font1">
      <figure className="card-figure relative h-[10rem] w-full">
        <Image className="card-img" src="/15.jpg" alt="proj9" fill></Image>
      </figure>
      <div className="card-info tracking-tight">
        <h3 className="fontsz1 h-12">Semester {semester} Information</h3>
        <p className='text-right fontsz3 text-gray-200'>{subjects.length} Items</p>
      </div>
    </Link>
  )
}

export default SemesterCard
