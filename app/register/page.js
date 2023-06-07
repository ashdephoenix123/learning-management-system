'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Footer from '../(dashboard)/components/Footer';

const page = () => {
    const [disabled, setDisabled] = React.useState(true);
    const [userDetails, setUserDetails] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        gender: '',
        dob: '',
        fathername: '',
        mothername: '',
        course: '',
        password: '',
        cpassword: ''
    });

    const updateChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //POST request to server//

        setUserDetails({
            fname: '',
            lname: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            gender: '',
            dob: '',
            fathername: '',
            mothername: '',
            course: '',
            password: '',
            cpassword: ''
        });
        //console.log(userDetails);
    }

    useEffect(() => {
        const { fname, lname, email, phone, address, gender, dob, fathername, mothername, course, password, cpassword, city, state, pincode } = userDetails;
        if (!fname || !lname || !email || !phone || !address || !gender || !dob || !fathername || !mothername || !course || !password || !cpassword || password !== cpassword || password.length < 8 || phone.length !== 10 || email.includes('@') === false || pincode.length !== 6 || !city || !state) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [userDetails])

    return (
        <section className=''>
            <nav className='px-6 bg-white shadow'>
                <Image src='/auvlogo2transparent.png' width={150} height={100} alt='univlogo'></Image>

            </nav>
            <div className='px-6 min-h-screen'>
                <h3 className='text-3xl text-center text-gray-600 font-semibold my-8'>Register for a <span className='text-purple-600 underline'>Course</span> </h3>
                <form onSubmit={handleSubmit} className='card2 w-[500px] mx-auto'>
                    <p className='mt-4 fontsz2 mb-2 font-semibold'>Enter your details:</p>
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>First Name<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.fname} type="text" name='fname' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Last Name<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.lname} type="text" name='lname' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    <div className='mb-2 flex justify-between items-center'>
                        <label className='fontsz2'>Email<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.email} type="email" name='email' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    {userDetails.email.length !== 0 && !userDetails.email.includes('@') &&
                        <div className='text-right -mt-2 mb-2 italic'>
                            <span className='text-red-600 text-xs'>**Please enter your correct Email address**</span>
                        </div>}
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Phone<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.phone} type="number" name='phone' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    {userDetails.phone.length !== 0 && userDetails.phone.length !== 10 &&
                        <div className='text-right -mt-2 mb-2 italic'>
                            <span className='text-red-600 text-xs'>**Please enter your 10 digit mobile number**</span>
                        </div>}
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Address<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.address} type="text" name='address' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>

                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>City<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.city} type="text" name='city' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>State<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.state} type="text" name='state' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Pincode<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.pincode} type="number" name='pincode' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    {userDetails.pincode.length!==0 && userDetails.pincode.length !== 6 &&
                        <div className='text-right -mt-2 mb-2 italic'>
                            <span className='text-red-600 text-xs'>**Please enter 6 digit area pincode**</span>
                        </div>}

                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Gender<span className='text-red-600'>*</span></label>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center mr-2'>
                                <input type="radio" name='gender' value='male' required checked={userDetails.gender === 'male'} onChange={updateChange} className='cursor-pointer mr-1 border border-gray-600 rounded' />
                                <p>Male</p>
                            </div>
                            <div className='flex items-center mr-2'>
                                <input type="radio" name='gender' value='female' required checked={userDetails.gender === 'female'} onChange={updateChange} className='cursor-pointer mr-1 border border-gray-600 rounded' />
                                <p>Female</p>
                            </div>
                            <div className='flex items-center'>
                                <input type="radio" name='gender' value='others' required checked={userDetails.gender === 'others'} onChange={updateChange} className='cursor-pointer mr-1 border border-gray-600 rounded' />
                                <p>Others</p>
                            </div>
                        </div>
                    </div>
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>D.O.B<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.dob} type="Date" name='dob' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>

                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Father's Name<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.fathername} type="text" name='fathername' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Mother's Name<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.mothername} type="text" name='mothername' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>

                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Course Interested In<span className='text-red-600'>*</span></label>
                        <select name="course" value={userDetails.course} onChange={updateChange} className='fontsz2 px-2 py-1 border border-gray-600 rounded' required>
                            <option value="" disabled>Select Course</option>
                            <option value="mca">Masters in Computer Application</option>
                            <option value="mba">Masters in Business Administration</option>
                        </select>
                    </div>
                    <div className="relative flex items-center w-full my-8">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <p className='mt-4 fontsz2 mb-2 font-semibold'>Set a strong password:</p>

                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Set password<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.password} type="password" name='password' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    <div className='mb-2 flex justify-between items-center'>

                        <label className='fontsz2'>Confirm password<span className='text-red-600'>*</span></label>
                        <input onChange={updateChange} value={userDetails.cpassword} type="password" name='cpassword' className='border border-gray-600 rounded px-2 py-1 fontsz2' required />
                    </div>
                    {userDetails.password !== userDetails.cpassword &&
                        <div className='text-right -mt-2 italic'>
                            <span className='text-red-600 text-xs'>**Password mismatched!**</span>
                        </div>}
                    {userDetails.password.length !== 0 && userDetails.password.length < 8 &&
                        <div className='text-right -mt-2 italic'>
                            <span className='text-red-600 text-xs'>**Password should be atleast 8 characters long!**</span>
                        </div>}
                    <div className="relative flex items-center w-full my-8">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className='my-4 flex justify-between items-center'>

                        <p className='fontsz2'>Total Course Fee:</p>
                        <div>
                            ₹ {'60,000'}
                        </div>
                    </div>
                    <div className='mb-4 flex justify-end mt-4'>
                        <button type='submit' className='btn ml-auto disabled:bg-blue-400 disabled:cursor-not-allowed outline-none' disabled={disabled}>Pay Course Fee</button>
                    </div>

                </form>
                <div className='w-[500px] mx-auto mt-8'>
                    {/* <div className="relative flex items-center w-full my-8">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div> */}
                    <div className='text-right mb-8'>
                        <Link href='/' className='text-sm underline text-blue-600'>&larr; Go back</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default page