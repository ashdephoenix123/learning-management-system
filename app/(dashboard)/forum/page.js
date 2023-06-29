import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <section className='min-h-screen'>
            <h3 className='text-xl font-semibold text-center'>Discussion Forum</h3>
            <div className='mt-4'>
                <Link href={'/forum/id'} className='bg-gray-200 rounded block mb-4 px-4 py-4 hover:bg-gray-300 transition-all relative'>
                    <span className='absolute -top-2 left-1 bg-green-500 rounded-lg px-1 text-xs text-white'>Open</span>
                    <h3 className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore optio minima ipsam nihil magnam officia itaque nisi a enim praesentium.</h3>
                </Link>
                <Link href={'/forum/id'} className='bg-gray-200 rounded block mb-4 px-4 py-4 hover:bg-gray-300 transition-all relative'>
                    <span className='absolute -top-2 left-1 bg-green-500 rounded-lg px-1 text-xs text-white'>Open</span>
                    <h3 className='font-semibold'>Tempore optio minima ipsam nihil magnam officia itaque nisi a enim praesentium.</h3>
                </Link>
                <Link href={'/forum/id'} className='bg-gray-200 rounded block mb-4 px-4 py-4 hover:bg-gray-300 transition-all relative'>
                    <span className='absolute -top-2 left-1 bg-green-500 rounded-lg px-1 text-xs text-white'>Open</span>
                    <h3 className='font-semibold'>Lorem ipsum dolor sit re optio minima ipsam nihil magnam officia itaque nisi a enim praesentium.</h3>
                </Link>
                <Link href={'/forum/id'} className='bg-gray-200 rounded block mb-4 px-4 py-4 hover:bg-gray-300 transition-all relative'>
                    <span className='absolute -top-2 left-1 bg-green-500 rounded-lg px-1 text-xs text-white'>Open</span>
                    <h3 className='font-semibold'>Amet consectetur adipisicing elit. Tempore optio minima ipsam nihil magnam officia itaque nisi a enim praesentium.</h3>
                </Link>
                <Link href={'/forum/id'} className='bg-gray-200 rounded block mb-4 px-4 py-4 hover:bg-gray-300 transition-all relative'>
                    <span className='absolute -top-2 left-1 bg-green-500 rounded-lg px-1 text-xs text-white'>Open</span>
                    <h3 className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore optiotium.</h3>
                </Link>
                <Link href={'/forum/id'} className='bg-gray-200 rounded block mb-4 px-4 py-4 hover:bg-gray-300 transition-all relative'>
                    <span className='absolute -top-2 left-1 bg-red-500 rounded-lg px-1 text-xs text-white'>Closed</span>
                    <h3 className='font-semibold'>Lorem ipsum dolor sit ametnam officia itaque nisi a enim praesentium.</h3>
                </Link>

            </div>
        </section>
    )
}

export default Page
