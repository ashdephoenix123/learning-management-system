import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserCard = ({student}) => {

    return (
        <div className="project-lists">
            <Link href={`/users/${student.enrollmentNumber}`} className="card2 font1">
                <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px]">
                    <Image className="card-img object-cover" src="/me2.jpg" alt="proj9" fill></Image>
                </figure>
                <div className='py-2'>
                    <p className='text-center text-sm'>{student.fname} {student.lname}</p>
                </div>
            </Link>
            <Link href={`${student.enrollmentNumber}`} className="card2 font1">
                <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px]">
                    <Image className="card-img object-cover" src="/me2.jpg" alt="proj9" fill></Image>
                </figure>
                <div className='py-2'>
                    <p className='text-center text-sm'>{student.fname} {student.lname}</p>
                </div>
            </Link>
            <Link href={`${student.enrollmentNumber}`} className="card2 font1">
                <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px]">
                    <Image className="card-img object-cover" src="/me2.jpg" alt="proj9" fill></Image>
                </figure>
                <div className='py-2'>
                    <p className='text-center text-sm'>{student.fname} {student.lname}</p>
                </div>
            </Link>
            <Link href={`${student.enrollmentNumber}`} className="card2 font1">
                <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px]">
                    <Image className="card-img object-cover" src="/me2.jpg" alt="proj9" fill></Image>
                </figure>
                <div className='py-2'>
                    <p className='text-center text-sm'>{student.fname} {student.lname}</p>
                </div>
            </Link>
              <Link href={`${student.enrollmentNumber}`} className="card2 font1">
                <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px]">
                    <Image className="card-img object-cover" src="/me2.jpg" alt="proj9" fill></Image>
                </figure>
                <div className='py-2'>
                    <p className='text-center text-sm'>{student.fname} {student.lname}</p>
                </div>
            </Link>
        </div>
    )
}

export default UserCard
