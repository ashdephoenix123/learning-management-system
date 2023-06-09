'use client';

import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { ImBooks } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx'
import Footer from '../components/Footer';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const [toggle, setToggle] = useState(false);
    const toggleref = useRef(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState({
        password: '',
        cpassword: ''
    });
    const [mismatched, setMismatched] = useState(false);

    const updateChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value)
        } else {
            setPassword((prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    const changePassinDB = async (e) => {
        e.preventDefault();
        if (!password.password) {
            toast.error("Password field cannot be Empty!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (password.password !== password.cpassword) {
            setMismatched(true);
            setTimeout(() => {
                setMismatched(false);
            }, 3000);
        } else if (password.password.length < 8) {
            toast.error("Password should be atleast 8 characters long!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            const res = await fetch('/api/updatePassword', {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newpassword: password.password, id })
            })
            const data = await res.json();
            if (data.success) {
                toast.success("Password has been updated!", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setPassword({
                    password: "",
                    cpassword: ""
                })
            } else {
                toast.error(data.error, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/forgotPassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })
        const data = await res.json();
        if (data.success) {
            toast.success("Password Reset instructions have been sent to your email.", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setEmail("")
        } else {
            toast.error(data.error, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleClickOutside = (event) => {
        if (toggleref.current && !toggleref.current.contains(event.target)) {
            setToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <nav className='fixed shadow z-10 flex justify-between w-full items-center px-6 backdrop-blur-sm max-[516px]:pl-0 max-[516px]:pr-2'>
                <Image src='/auvlogo2.png' width={150} height={100} alt='univlogo' className='max-[516px]:w-[120px]'></Image>
                <div className='fontsz2 max-[480px]:hidden'>
                    <Link href={'/register'} className='btn2'>Register for a Course</Link>
                    {/* <button className='btn2' onClick={() => setShowLogin(true)}>Log In</button> */}
                </div>
                <div className='fontsz2 min-[481px]:hidden'>
                    <div onClick={() => { setToggle(prev => !prev) }}>
                        {
                            !toggle ? <HiBars3 size={25} className='cursor-pointer text-black' /> : <RxCross2 size={25} className='font-thin cursor-pointer text-black' />
                        }
                    </div>
                </div>
            </nav>
            {
                toggle && <>
                    <div className='fixed top-[70px] w-full h-fit bg1 z-50 border border-b-4 border-b-zinc-300' ref={toggleref}>
                        <ul>
                            <li onClick={() => { setToggle(prev => !prev) }} className='cursor-pointer hover:bg-zinc-200 border-b'><Link href={'/register'} className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><ImBooks className='mr-2' size={18} />Register for a Course</span></Link></li>
                            {/* <li onClick={() => { setToggle(prev => !prev); setShowLogin(true); }} className='cursor-pointer hover:bg-zinc-200 border-b'><button className='block'><span className='p-4 w-full text-sm tracking-wide mr-1.5 flex items-center'><MdOutlineLogout className='mr-2' size={18} />Log In</span></button></li> */}
                        </ul>
                    </div>
                </>
            }
            <div className='px-6 min-h-screen max-[486px]:px-2 pt-24 pb-6'>
                <h3 className='my-6 text-2xl font-semibold text-center'>Change Password</h3>
                <div className=' w-[350px] mx-auto px-6 py-4'>
                    {
                        !id ?
                            <form className='bg-white' onSubmit={sendEmail}>
                                <label className='block text-sm text-gray-600 mb-3' htmlFor="email">Enter Email Address</label>
                                <input value={email} onChange={updateChange} className='block border-b-black border-b outline-none mb-4 text-sm headin2 w-full text-gray-800' type="email" name='email' required />
                                <button type='submit' className='btn block mt-4 w-full outline-none focus:bg-blue-600'>Continue</button>
                            </form>
                            :
                            <form className='bg-white' onSubmit={changePassinDB}>
                                <label className='block text-sm text-gray-600 mb-3' htmlFor="email">Enter New Password</label>
                                <input value={password.password} onChange={updateChange} className='block border-b-black border-b outline-none mb-4 text-sm headin2 w-full text-gray-800' type="password" name='password' required />
                                <label className='block text-sm text-gray-600 mb-3' htmlFor="email">Confirm New Password</label>
                                <input value={password.cpassword} onChange={updateChange} className='block border-b-black border-b outline-none mb-4 text-sm headin2 w-full text-gray-800' type="password" name='cpassword' required />
                                <button type='submit' className='btn block mt-4 w-full outline-none focus:bg-blue-600'>Continue</button>
                            </form>
                    }
                    {
                        mismatched && <p className='text-red-600 text-center text-sm mt-4'>***Password did not match!***</p>
                    }
                    <div className="relative flex items-center w-full my-6">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="mx-2 block text-md text-gray-900"> Go back to</div>
                        <Link href="/" className='font-medium text-blue-600 hover:underline'>Log In</Link>
                        <div className="mx-2 block text-md text-gray-900">page</div>
                    </div>

                </div>
            </div>

            <Footer />
        </section>
    )
}

export default page