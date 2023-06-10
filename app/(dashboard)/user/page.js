'use client';

import { useRootContext } from '@/app/provider/RootProvider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import _ from 'lodash'

const page = ({ userDetails }) => {
    const allDetails = useRootContext();
    const { userDetails: { fname, lname, address, batchCode, city, coursecode, createdAt, dob, email, enrollmentNumber, fathername, gender, mothername, phone, pincode, state } } = allDetails || { userDetails: { fname: '', lname: '', address: '', batchCode: '', city: '', coursecode: '', createdAt: '', dob: '', email: '', enrollmentNumber: '', fathername: '', gender: '', mothername: '', phone: '', pincode: '', state: '' } };
    const { batchDetails: { batchFullName } } = allDetails || { batchDetails: { batchFullName: 'Batch Name' } };
    return (
        <div className='min-h-screen card2'>
            {/* <h3 className='fontsz1'>Profile</h3> */}
            <div className='mt-2 flex items-center max-[577px]:block '>
                {/* <p className='fontsz2'>This is your profile page.</p> */}
                <figure className='relative w-[200px] h-[200px] max-[577px]:w-[120px] max-[577px]:h-[120px]'>
                    <Image alt='userImage' fill className='object-cover  rounded-full' src={'/me2.jpg'}></Image>
                    <span className='absolute right-5 border-2 border-white bottom-5 inline-block w-4 h-4 rounded-full bg-green-500 max-[577px]:right-0'></span>
                </figure>
                <div className='ml-6 max-[577px]:ml-0 max-[577px]:mt-2'>
                    <h3 className='heading1'>{_.capitalize(fname)} {_.capitalize(lname)}</h3>
                    <p>{batchFullName}</p>
                    <p className='text-gray-500 text-sm'>Anonymous University</p>
                </div>
            </div>
            <div className='text-sm'>
                <h3 className='heading1 mt-8'>Student Information</h3>
                <div className='mb-4'>
                    <p className='font-semibold mb-2'>Name</p>
                    <ul>
                        <li>&bull; &nbsp; Father's Name: {_.capitalize(fathername)}</li>
                        <li>&bull; &nbsp; Mother's Name: {_.capitalize(mothername)}</li>
                    </ul>
                </div>
                <div className='mb-4'>
                    <p className='font-semibold mb-2'>LogIn Credentials</p>
                    <ul>
                        <li>&bull; &nbsp; Email: {email}</li>
                    </ul>
                </div>
                <div className='mb-4'>
                    <p className='font-semibold mb-2'>General Information</p>
                    <ul>
                        <li>&bull; &nbsp; Batch Code: {batchCode}</li>
                        <li>&bull; &nbsp; Birth Date: {dob}</li>
                        <li>&bull; &nbsp; Enrollment Number: {enrollmentNumber}</li>
                        <li>&bull; &nbsp; Gender: {_.capitalize(gender)}</li>
                    </ul>
                </div>
                <div className='mb-4'>
                    <p className='font-semibold mb-2'>Contact</p>
                    <ul>
                        <li>&bull; &nbsp; Phone: {phone}</li>
                    </ul>
                </div>
                <div className='mb-4'>
                    <p>To update any Information, Kindly raise a ticket through POSH Portal <Link className='underline text-blue-600' href='/posh'>here</Link>.</p>
                </div>
            </div>

        </div>
    )
}

export default page
