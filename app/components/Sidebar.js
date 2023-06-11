'use client';

import Link from 'next/link'
import React, { useEffect } from 'react'
import { AiFillCalendar, AiFillHome } from 'react-icons/ai'
import { BsBoxes } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { IoGridSharp } from 'react-icons/io5'
import Image from 'next/image'

const Sidebar = () => {

    useEffect(()=> {

    }, [])

    return (
        <ul className='min-h-screen bg1 max-[860px]:hidden sidebar' id='myID'>
            <li className=' bg-zinc-300 border-b text-center'><Image src='/auvlogo2.png' alt='logo' width={500} height={500} className='w-full'></Image></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b active'><Link href={'/dashboard'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><AiFillHome className='mb-1' size={18} /><span className='text-xs'>Home</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/semesters'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><BsBoxes className='mb-1' size={18} /><span className='text-xs'>Semesters</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/catalogue'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><IoGridSharp className='mb-1' size={18} /><span className='text-xs'>Catalogue</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/users'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><FaUserAlt className='mb-1' size={18} /><span className='text-xs'>Users</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/resources'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><AiFillCalendar className='mb-1' size={18} /><span className='text-xs'>Resources</span></span></Link></li>
        </ul>
    )
}

export default Sidebar
