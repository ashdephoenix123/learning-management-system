import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
import SendMessage from './SendMessage'
import _ from 'lodash'

const ProfileCard = ({ image, fname, lname, batchFullName, email, designation = '' }) => {
    return (
        <div className="mt-2 px-2 py-3 flex items-center max-[577px]:block bg-[url('/background-texture.png')]" >
            <figure className='relative w-[200px] h-[200px] max-[577px]:w-[120px] max-[577px]:h-[120px]'>
                {!image ? <Image alt='userImage' fill className='object-cover border-2 rounded-full' src={'/userImage.jpg'}></Image> : <Image alt='userImage' fill className='object-cover rounded-full' priority src={image}></Image>}
            </figure>
            <div className='ml-6 max-[577px]:ml-0 max-[577px]:mt-2'>
                <h3 className='heading1'>{_.capitalize(fname)} {_.capitalize(lname)}</h3>
                <p>{batchFullName}</p>
                <p className='text-gray-500 text-sm'>Anonymous University</p>
                <div className='flex items-center mt-4 gap-1 -ml-1'>
                    <Link href={'#'}>
                        <AiFillInstagram size={25} />
                    </Link>
                    <Link href={'#'}>
                        <AiFillLinkedin size={25} />
                    </Link>
                </div>
                <SendMessage recipientEmail={email} />
            </div>
            <div className='self-start ml-auto bg-blue-600 text-sm px-2 py-1 rounded text-white'>
                {
                    !designation ? "Student" : "Teacher" 
                }
            </div>
        </div>
    )
}

export default ProfileCard
