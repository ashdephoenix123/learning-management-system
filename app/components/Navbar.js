'use client';

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MdOutlineLogout } from 'react-icons/md'
import { VscSearch } from 'react-icons/vsc'
import { BsBoxes } from 'react-icons/bs'
import { HiBars3 } from 'react-icons/hi2'
import { RxCross2 } from 'react-icons/rx'
import { FaUserAlt } from 'react-icons/fa'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { MdEmail } from 'react-icons/md'
import { AiFillBell, AiFillCalendar, AiFillHome } from 'react-icons/ai'
import { BiSupport } from 'react-icons/bi'
import { IoGridSharp } from 'react-icons/io5'
import Image from 'next/image';
import { ImBooks } from 'react-icons/im'
import { useRouter } from 'next/navigation';
import { useRootContext } from '../provider/RootProvider';
import _ from 'lodash';

const Navbar = () => {
    const [dropdown, setdropdown] = useState(false)
    const [search, setsearch] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [arrow, setArrow] = useState(false)
    const ref = useRef(null)
    const searchref = useRef(null);
    const toggleref = useRef(null);
    const router = useRouter();
    const allDetails = useRootContext();

    const { userDetails: { fname, lname, image = "" } } = allDetails || { userDetails: { fname: 'Username', lname: '' } };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setdropdown(false);
        }
        if (searchref.current && !searchref.current.contains(event.target)) {
            setsearch(false);
        }
        if (toggleref.current && !toggleref.current.contains(event.target)) {
            setToggle(false);
        }
    };

    const searchHandler = () => {
        setsearch(true);
        if (search && searchref.current) {
            searchref.current.focus();
        }
    }

    const submitInputForm = (e) => {
        e.preventDefault();
    }

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }


    return (
        <>
            <nav className='shadow-md fixed container2 z-50 primary text-white'>
                <div className="">
                    <div className="py-1 flex items-center fontsm bp1 relative">
                        <div className='hide3'>
                            <div onClick={() => { setToggle(prev => !prev) }}>
                                {
                                    !toggle ? <HiBars3 size={25} className='mr-3 cursor-pointer' /> : <RxCross2 size={25} className='mr-3 font-thin cursor-pointer' />
                                }
                            </div>
                        </div>
                        <div className="flex mr-6 items-center">
                            {/* <span className='text-lg tracking-tight min-[861px]:hidden'>LMS</span> */}
                            <span className='text-lg tracking-tight max-[860px]:hidden'>Learning Management System</span>

                        </div>
                        <ul className='flex'>
                            <li className='flex items-center cursor-pointer hide2 hoverColor1 px-2 py-1 rounded relative group'><Link href={'/inbox'}><MdEmail size={18} /><span className='absolute bg-red-600 top-2 right-1 px-1 py-1 rounded-full'></span><span className='absolute top-10 bg-slate-700 px-1 py-1 text-white text-xs hidden group-hover:block showMe z-20'>Messages</span></Link></li>
                            <li className='flex items-center cursor-pointer hide2 hoverColor1 px-2 py-1 rounded relative group'><Link href={'/notifications'}><AiFillBell size={18} /><span className='text-sm absolute bg-red-600 top-2 right-1 px-1 py-1 rounded-full'></span><span className='absolute top-10 bg-slate-700 px-1 py-1 text-white  text-xs hidden group-hover:block showMe z-20'>Notifications</span></Link></li>
                            <li className='flex items-center cursor-pointer hide2 hoverColor1 px-2 py-1 rounded relative group'><Link href={'/calendar'}><AiFillCalendar size={18} /><span className='absolute top-10 bg-slate-700 px-1 py-1 text-white  text-xs hidden group-hover:block showMe z-20'>Calendar</span></Link></li>
                            <li className='flex items-center cursor-pointer hoverColor1 px-2 py-1 rounded relative group' onClick={searchHandler}><VscSearch size={18} />
                                {search &&
                                    <>
                                        <div className='absolute top-0 right-1 flex w-[200px] fillit bg-white rounded-md z-50'>
                                            <div className='flex items-center w-full' ref={searchref}>
                                                <input type="text" className='border-2 border-blue-500 focus:outline-none px-2 py-2 mr-2 rounded-md text-black' placeholder='Search in LMS' />
                                                <button className='-ml-10 p-1.5' onClick={submitInputForm}>
                                                    <VscSearch size={18} className='text-purple-500' />
                                                </button>
                                            </div>
                                        </div>
                                    </>}
                                <span className='absolute top-10 bg-slate-700 px-1 py-1 text-white text-xs hidden group-hover:block showMe z-20'>Search</span>
                            </li>
                            <li className='flex items-center cursor-pointer hide2 hoverColor1 px-2 py-1 rounded relative group mr-1'><Link href={'/support'}><BiSupport size={18} /><span className='absolute top-10 bg-slate-700 px-1 py-1 text-white  text-xs hidden group-hover:block showMe z-20'>Help</span></Link></li>
                            <li className='flex items-center cursor-pointer px-2 py-1 hoverColor1 rounded-md relative group'><Link className='flex items-center' href={'/user'}><span className='mr-1.5 hide1  text-xs block'>{_.capitalize(fname)} {_.capitalize(lname)}</span><span className='absolute top-10 right-0 bg-slate-700 px-1 py-1 text-white  text-xs hidden group-hover:block showMe'>Profile</span>

                                {
                                    !image ?
                                        <Image src={'/userImage.jpg'} width={100} height={100} className='w-[30px] h-[30px] rounded-full' alt='me'></Image>
                                        :
                                        <Image src={image} width={100} height={100} className='w-[30px] h-[30px] rounded-full' alt='me'></Image>
                                }

                            </Link></li>
                            <li ref={ref} onClick={() => { setdropdown(prev => !prev) }} className='flex items-center cursor-pointer hide2 hoverColor1 px-2 py-1 rounded relative group'><SlArrowDown size={10} /><span className='absolute top-10 right-0 bg-slate-700 px-1 py-1 text-white  text-xs hidden group-hover:block showMe'>Dropdown</span>
                                {
                                    dropdown &&
                                    <div className='absolute top-10 right-0 rounded overflow-hidden'>
                                        <div className='flex items-center text-black px-4 py-3  bg-gray-200 hover:bg-gray-300' onClick={logout}>
                                            <MdOutlineLogout className='mr-2' />
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {
                toggle && <>
                    <div className='fixed top-11 w-full h-fit bg1 z-50 border border-b-4 border-b-zinc-300' ref={toggleref}>
                        <ul>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/dashboard'} className='flex items-center justify-between'><span className='p-4 w-full text-sm tracking-wide flex items-center'><AiFillHome className='mr-2' size={18} />Home</span></Link></li>
                            <li className='cursor-pointer hover:bg-zinc-200 border-b flex items-center justify-between'>
                                <Link onClick={() => { setToggle(prev => !prev) }} href={'/semesters'} className='w-full flex items-center justify-between'>
                                    <span className='p-4 w-full text-sm tracking-wide flex items-center'>
                                        <BsBoxes className='mr-2' size={18} />
                                        Semesters
                                    </span>
                                </Link>
                                <div onClick={() => { setArrow((prev) => !prev) }} className='p-5'>
                                    {arrow ? <SlArrowDown size={12} className='h-full w-full' /> : <SlArrowUp size={12} className='h-full w-full' />}
                                </div>
                            </li>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/dashboard'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><IoGridSharp className='mr-2' size={18} />Catalogue</span></Link></li>
                            <li className='cursor-pointer hover:bg-zinc-200 border-b flex items-center justify-between'>
                                <Link onClick={() => { setToggle(prev => !prev) }} href={'/users'} className='w-full flex items-center justify-between'>
                                    <span className='p-4 w-full text-sm tracking-wide flex items-center'>
                                        <FaUserAlt className='mr-2' size={18} />
                                        Users
                                    </span>
                                </Link>
                                <div onClick={() => { setArrow((prev) => !prev) }} className='p-5'>
                                    {arrow ? <SlArrowDown size={12} className='h-full w-full' /> : <SlArrowUp size={12} className='h-full w-full' />}
                                </div>
                            </li>
                            <li className='cursor-pointer hover:bg-zinc-200 border-b flex items-center justify-between'>
                                <Link onClick={() => { setToggle(prev => !prev) }} href={'/resources'} className='w-full flex items-center justify-between'>
                                    <span className='p-4 w-full text-sm tracking-wide flex items-center'>
                                        <ImBooks className='mr-2' size={18} />
                                        Resources
                                    </span>
                                </Link>
                                <div onClick={() => { setArrow((prev) => !prev) }} className='p-5'>
                                    {arrow ? <SlArrowDown size={12} className='h-full w-full' /> : <SlArrowUp size={12} className='h-full w-full' />}
                                </div>
                            </li>

                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer bg-zinc-300 border-b'><span className='p-4 w-full inline-block text-sm tracking-wide mr-1.5 font-semibold'>Others</span></li>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/support'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><BiSupport className='mr-2' size={18} />Help</span></Link></li>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/inbox'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><MdEmail className='mr-2' size={18} />Inbox</span></Link></li>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/notifications'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><AiFillBell className='mr-2' size={18} />Notifications</span></Link></li>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/calendar'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><AiFillCalendar className='mr-2' size={18} />Calendar</span></Link></li>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/user'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><FaUserAlt className='mr-2' size={18} />Profile</span></Link></li>
                            <li onClick={logout} className='cursor-pointer hover:bg-zinc-200 border-b'><div className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><MdOutlineLogout className='mr-2' size={18} />Log out</span></div></li>
                        </ul>
                    </div>
                </>
            }
        </>
    )
}

export default Navbar