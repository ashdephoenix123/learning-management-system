import Image from 'next/image'
import React from 'react'
import _ from 'lodash'
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
import Link from 'next/link'

async function getData(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchSelectedUser?id=${id}`)
    const data = await res.json();
    if (data.status) {
        return data.user
    }
}

const page = async ({ params }) => {
    const fetchUserData = await getData(params.userid)
    const { fname, lname, image, batchFullName } = fetchUserData

    return (
        <div className='min-h-screen card2'>
            <div className='mt-2 flex items-center max-[577px]:block '>
                <figure className='relative w-[200px] h-[200px] max-[577px]:w-[120px] max-[577px]:h-[120px]'>
                    {!image ? <Image alt='userImage' fill className='object-cover border-2 rounded-full' src={'/userImage.jpg'}></Image> : <Image alt='userImage' fill className='object-cover rounded-full' priority src={image}></Image>}
                </figure>
                <div className='ml-6 max-[577px]:ml-0 max-[577px]:mt-2'>
                    <h3 className='heading1'>{_.capitalize(fname)} {_.capitalize(lname)}</h3>
                    <p>{batchFullName}</p>
                    <p className='text-gray-500 text-sm'>Anonymous University</p>
                    <div className='flex items-center mt-4 gap-1 -ml-1'>
                        <Link href={'#'}>
                            <AiFillInstagram size={30} />
                        </Link>
                        <Link href={'#'}>
                            <AiFillLinkedin size={30} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
