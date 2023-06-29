'use client';

import Link from 'next/link'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsBoxes } from 'react-icons/bs'
import { FaUserGraduate, FaUserTie } from 'react-icons/fa'
import { ImBooks } from 'react-icons/im'
import Image from 'next/image'
import { useRootContext } from '../provider/RootProvider'
import { RiDiscussFill } from 'react-icons/ri'
const Sidebar = () => {
    const allDetails = useRootContext();
    const { batchDetails: { coursecode } } = allDetails || { batchDetails: { coursecode: '' } }

    return (
        <ul className='min-h-screen bg1 max-[860px]:hidden sidebar' id='myID'>
            <li className=' bg-zinc-300 border-b text-center'><Image src='/auvlogo2.png' alt='logo' width={500} height={500} className='w-full'></Image></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b active'><Link href={'/dashboard'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><AiFillHome className='mb-1' size={18} /><span className='text-xs'>Home</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={`/${coursecode}/semesters`} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><BsBoxes className='mb-1' size={18} /><span className='text-xs'>Semesters</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/users'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><FaUserGraduate className='mb-1' size={18} /><span className='text-xs'>Students</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/teachers'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><FaUserTie className='mb-1' size={18} /><span className='text-xs'>Teachers</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/forum'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><RiDiscussFill className='mb-1' size={18} /><span className='text-xs'>Forums</span></span></Link></li>
            <li className='cursor-pointer text-gray-600 hover:bg-zinc-200 border-b'><Link href={'/assessments'} className='block'><span className='p-4 flex-col text-sm tracking-normal flex items-center'><ImBooks className='mb-1' size={18} /><span className='text-xs'>Assessments</span></span></Link></li>
        </ul>
    )
}

export default Sidebar
