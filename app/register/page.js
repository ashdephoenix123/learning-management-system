'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Footer from '../(dashboard)/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
    const [disabled, setDisabled] = React.useState(true);
    const [courses, setCourses] = useState([]);
    const [courseFee, setCourseFee] = useState(0);
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
        if (name === 'course') {
            const selectedCourse = courses.filter((course) => course.coursecode === value);
            setCourseFee(selectedCourse[0].totalFee);
        }

    }


    const registerUser = async (razorpay_payment_id, razorpay_order_id, razorpay_signature, orderID) => {
        const res = await fetch('/api/registeruser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...userDetails, razorpay_payment_id, razorpay_order_id, razorpay_signature, orderID })
        })
        const data = await res.json();
        if (data.registered) {
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

        } else {
            alert('User not registered!');
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //POST request to server//
        const res = await fetch('/api/createorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userDetails.email, courseFee })
        })
        const data = await res.json();
        if (data.created) {
            let orderID = data.resp.id;
            var options = {
                "key_id": process.env.NEXT_PUBLIC_RAZORPAY_KEYID, // Enter the Key ID generated from the Dashboard
                "amount": courseFee, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Anonymous University",
                "description": "Course Fee",
                "image": "/auvlogo2.png",
                "order_id": orderID,
                "handler": function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                    registerUser(razorpay_payment_id, razorpay_order_id, razorpay_signature, orderID);
                },
                "prefill": {
                    "name": userDetails.fname + ' ' + userDetails.lname,
                    "email": userDetails.email,
                    "contact": userDetails.phone
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#0070f3"
                }
            };

            var rzp1 = new Razorpay(options);
            rzp1.open();

        } else {
            toast.error('Some error occured, Please try again later!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    useEffect(() => {
        const { fname, lname, email, phone, address, gender, dob, fathername, mothername, course, password, cpassword, city, state, pincode } = userDetails;
        if (!fname || !lname || !email || !phone || !address || !gender || !dob || !fathername || !mothername || !course || !password || !cpassword || password !== cpassword || password.length < 8 || phone.length !== 10 || email.includes('@') === false || pincode.length !== 6 || !city || !state) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }

        const fetchCourses = async () => {
            const res = await fetch('/api/courses')
            const data = await res.json();
            setCourses(data.courses);
        }
        fetchCourses();
    }, [userDetails])

    return (
        <>
            <section className=''>
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
                <nav className='px-6 bg-white shadow max-[516px]:px-2'>
                    <Image src='/auvlogo2transparent.png' width={150} height={100} alt='univlogo' className='max-[516px]:w-[80px]'></Image>
                </nav>
                <div className='px-6 min-h-screen max-[486px]:px-2'>
                    <h3 className='text-3xl text-center text-gray-600 font-semibold my-8 max-[486px]:text-xl max-[486px]:mt-2 max-[486px]:mb-6'>Register for a <span className='text-purple-600 underline'>Course</span> </h3>
                    <form onSubmit={handleSubmit} className='card2 w-[550px] max-[600px]:w-full mx-auto'>
                        <p className='mt-4 fontsz2 mb-2 font-semibold'>Enter your details:</p>
                        <div className='mb-2 flex justify-between items-center  max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>First Name<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.fname} type="text" name='fname' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Last Name<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.lname} type="text" name='lname' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>
                            <label className='fontsz2 max-[486px]:block'>Email<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.email} type="email" name='email' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        {userDetails.email.length !== 0 && !userDetails.email.includes('@') &&
                            <div className='text-right -mt-2 mb-2 italic'>
                                <span className='text-red-600 text-xs'>**Please enter your correct Email address**</span>
                            </div>}
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Phone<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.phone} type="number" name='phone' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        {userDetails.phone.length !== 0 && userDetails.phone.length !== 10 &&
                            <div className='text-right -mt-2 mb-2 italic'>
                                <span className='text-red-600 text-xs'>**Please enter your 10 digit mobile number**</span>
                            </div>}
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Address<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.address} type="text" name='address' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>

                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>City<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.city} type="text" name='city' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>State<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.state} type="text" name='state' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Pincode<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.pincode} type="number" name='pincode' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        {userDetails.pincode.length !== 0 && userDetails.pincode.length !== 6 &&
                            <div className='text-right -mt-2 mb-2 italic'>
                                <span className='text-red-600 text-xs'>**Please enter 6 digit area pincode**</span>
                            </div>}

                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Gender<span className='text-red-600'>*</span></label>
                            <div className='flex items-center justify-between max-[486px]:block'>
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
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>D.O.B<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.dob} type="Date" name='dob' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>

                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Father's Name<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.fathername} type="text" name='fathername' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Mother's Name<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.mothername} type="text" name='mothername' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>

                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 mr-2 max-[486px]:block'>Course Interested In<span className='text-red-600'>*</span></label>
                            <select name="course" value={userDetails.course} onChange={updateChange} className='fontsz2 px-2 py-1 border border-gray-600 rounded  max-[486px]:w-full overflow-hidden' required>
                                <option value="" disabled className='max-[486px]:text-sm'>Select Course</option>
                                {
                                    courses.map((course) => {
                                        return <option value={course.coursecode} className='max-[486px]:text-sm max-[486px]:w-full'>{course.name}</option>
                                    })
                                }
                                {/* <option value="mca">Masters in Computer Application</option>
                            <option value="mba">Masters in Business Administration</option> */}
                            </select>
                        </div>
                        <div className="relative flex items-center w-full my-8">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <p className='mt-4 fontsz2 mb-2 font-semibold'>Set a strong password:</p>

                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Set password<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.password} type="password" name='password' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
                        </div>
                        <div className='mb-2 flex justify-between items-center max-[486px]:block'>

                            <label className='fontsz2 max-[486px]:block'>Confirm password<span className='text-red-600'>*</span></label>
                            <input onChange={updateChange} value={userDetails.cpassword} type="password" name='cpassword' className='border border-gray-600 rounded px-2 py-1 fontsz2  max-[486px]:w-full' required />
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
                                ₹ {courseFee}
                            </div>
                        </div>
                        <div className='mb-4 flex justify-end mt-4'>
                            <button type='submit' className='btn ml-auto disabled:bg-blue-400 disabled:cursor-not-allowed outline-none' disabled={disabled}>Pay Course Fee</button>
                        </div>

                    </form>
                    <div className='w-[500px] mx-auto mt-8 max-[600px]:w-full'>
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
        </>
    )
}

export default page