'use client';

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import Footer from './(dashboard)/components/Footer';
// import mainImage from '../public/main.jpg'

const page = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <section className='relative'>
                <nav className='fixed z-10 flex justify-between w-full items-center px-6 backdrop-blur-sm'>
                    <Image src='/auvlogo2transparent.png' width={150} height={100} alt='univlogo'></Image>
                    <div className='fontsz2'>
                        <Link href={'/register'} className='btn2 mr-2'>Register for a Course</Link>
                        <Link href={'/dashboard'} className='btn2 mr-2'>Go to Dashboard</Link>
                        <button className='btn2' onClick={() => setShowLogin(true)}>Login</button>
                    </div>
                </nav>

                <div className='w-full h-[80vh] relative'>
                    <Image src='/main3.jpg' fill alt='mainImage' className='object-cover opacity-95'></Image>
                    <h1 className='text-6xl font-bold text-white absolute top-1/3 ml-5'>
                        Welcome to<span className='font-serif'>,</span><br /> <span className='text-yellow-500'>
                            Anonymous University
                        </span>
                    </h1>
                </div>


                {
                    showLogin &&

                    <div className='absolute top-52 right-0 mr-5 w-96 rounded-lg overflow-hidden'>
                        <div className='flex justify-between items-center bg-blue-600 py-2 px-6 text-white'>
                            <h3 className=''>Login</h3>
                            <div  className='cursor-pointer' onClick={() => { setShowLogin(prev => !prev) }}>
                                <RxCross2 />
                            </div>
                        </div>
                        <div className='bg-white px-6 py-4' >
                            <label className='block text-sm text-gray-600' htmlFor="email">Email</label>
                            <input className='block border-b-black border-b outline-none mb-4 fontsz3 headin2 w-full' type="email" id='email' name='email' required />
                            <label className='block text-sm text-gray-600' htmlFor="password">Password</label>
                            <input className='block border-b-black border-b outline-none fontsz3 headin2 w-full' type="password" id='password' name='password' required />
                            <div className='block text-right'>
                                <Link href={'/forgotPassword'} className='fontsz3  hover:underline'>Forgot password?</Link>
                            </div>
                            <button className='btn block w-1/3 mt-4 ml-auto'>Login</button>

                        </div>
                    </div>
                }

                <div className='layoutCard px-16 py-24'>
                    <div className='flex flex-col items-center'>
                        <Image src='/curriculum2.jpeg' width={200} height={200} className='rounded-full w-[150px] h-[150px] object-cover'></Image>
                        <h3 className='heading2 font-semibold mt-6 mb-1'>Innovative Curriculum</h3>
                        <p className='text-center fontsz2 font1'>Industry-driven concepts to prepare you for future careers.</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image src='/friends3.jpeg' width={200} height={200} className='rounded-full w-[150px] h-[150px] object-cover'></Image>
                        <h3 className='heading2 font-semibold mt-6 mb-1'>Collaborative learning</h3>
                        <p className='text-center fontsz2 font1'>Interactions with faculty and peers for enhanced learning.</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image src='/mobile.jpeg' width={200} height={200} className='rounded-full w-[150px] h-[150px] object-cover'></Image>
                        <h3 className='heading2 font-semibold mt-6 mb-1'>Communication Tools</h3>
                        <p className='text-center fontsz2 font1'>In-built chat and E-mail options to connect with faculty or admin.</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image src='/progress.png' width={200} height={200} className='rounded-full w-[150px] h-[150px] object-cover'></Image>
                        <h3 className='heading2 font-semibold mt-6 mb-1'>Progress-tracking</h3>
                        <p className='text-center fontsz2 font1'>Analytics section with Leaderboard and reward points.</p>
                    </div>

                </div>
                <Footer />
            </section>
        </>
    )
}

export default page
