'use client';

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import Footer from './components/Footer';
import { HiBars3 } from 'react-icons/hi2';
import { MdOutlineLogout } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { useRouter } from 'next/navigation';

const page = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [toggle, setToggle] = useState(false);
    const toggleref = useRef(null);
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const router = useRouter();

    const updateChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleClickOutside = (event) => {
        if (toggleref.current && !toggleref.current.contains(event.target)) {
            setToggle(false);
        }
    };

    const userLogin = async (e) => {
        e.preventDefault();
        //login functionality
        const res = await fetch('/api/userlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        });
        const data = await res.json();
        if (data.status) {
            localStorage.setItem('token', JSON.stringify({ token: data.token, email: userDetails.email}));
            setShowLogin(false);
            router.push('/dashboard');
        } else {
            //show invalid credentials
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            <section className='relative'>
                <nav className='fixed z-10 flex justify-between w-full items-center px-6 backdrop-blur-sm max-[516px]:pl-0 max-[516px]:pr-2'>
                    <Image src='/auvlogo2.png' width={150} height={100} alt='univlogo' className='max-[516px]:w-[120px]'></Image>
                    <div className='fontsz2 max-[480px]:hidden'>
                        <Link href={'/register'} className='btn2 mr-2'>Register for a Course</Link>
                        <button className='btn2' onClick={() => setShowLogin(true)}>Login</button>
                    </div>
                    <div className='fontsz2 min-[481px]:hidden'>
                        <div onClick={() => { setToggle(prev => !prev) }}>
                            {
                                !toggle ? <HiBars3 size={25} className='cursor-pointer text-white' /> : <RxCross2 size={25} className='font-thin cursor-pointer text-white' />
                            }
                        </div>
                    </div>
                </nav>

                {
                    toggle && <>
                        <div className='fixed top-[70px] w-full h-fit bg1 z-50 border border-b-4 border-b-zinc-300' ref={toggleref}>
                            <ul>
                                <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/register'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><ImBooks className='mr-2' size={18} />Register for a Course</span></Link></li>
                                <li onClick={() => { setToggle(prev => !prev); setShowLogin(true); }} className='cursor-pointer hover:bg-zinc-200 border-b'><button className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><MdOutlineLogout className='mr-2' size={18} />Log In</span></button></li>
                            </ul>
                        </div>
                    </>
                }

                <div className='w-full h-[80vh] relative'>
                    <Image src='/main3.jpg' fill alt='mainImage' className='object-cover opacity-95'></Image>
                    <h1 className='text-6xl max-[516px]:text-4xl max-[516px]:mx-2 max-[516px]:top-1/4 font-bold text-white absolute top-1/3 ml-5'>
                        Welcome to<span className='font-serif'>,</span><br /> <span className='text-yellow-500'>
                            Anonymous University
                        </span>
                    </h1>
                </div>


                {
                    showLogin &&

                    <div className='absolute top-52 right-0 mr-5 w-96 rounded-lg overflow-hidden max-[1107px]:top-72 max-[1107px]:left-1/2 max-[1107px]:-translate-x-1/2 max-[1107px]:-translate-y-1/2 max-[412px]:w-full'>
                        <div className='flex justify-between items-center bg-blue-600 py-2 px-6 text-white'>
                            <h3 className=''>Login</h3>
                            <div className='cursor-pointer' onClick={() => { setShowLogin(prev => !prev) }}>
                                <RxCross2 />
                            </div>
                        </div>
                        <form onSubmit={userLogin} className='bg-white px-6 py-4'>
                            <label className='block text-sm text-gray-600' htmlFor="email">Email</label>
                            <input value={userDetails.email} onChange={updateChange} className='block border-b-black border-b outline-none mb-4 fontsz2 headin2 w-full' type="email" id='email' name='email' required />
                            <label className='block text-sm text-gray-600' htmlFor="password">Password</label>
                            <input value={userDetails.password} onChange={updateChange} className='block border-b-black border-b outline-none fontsz2 headin2 w-full' type="password" id='password' name='password' required />
                            <div className='block text-right'>
                                <Link href={'/forgotPassword'} className='fontsz3  hover:underline'>Forgot password?</Link>
                            </div>
                            {
                                error && <div className='text-red-600 fontsz3 font-semibold'>***Invalid Credentials!***</div>
                            }
                            <button type='submit' className='btn block w-1/3 mt-4 ml-auto'>Login</button>
                        </form>

                    </div>
                }

                <div className='layoutCard px-16 py-24 max-[412px]:px-4'>
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
