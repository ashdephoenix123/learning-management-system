'use client';

import { useRootContext } from '@/app/provider/RootProvider'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import _ from 'lodash'
import { FaPencilAlt } from 'react-icons/fa'

const page = () => {
    const allDetails = useRootContext();
    const { userDetails: { fname, lname, address, batchCode, city, coursecode, createdAt, dob, email, enrollmentNumber, fathername, gender, mothername, phone, pincode, state, image } } = allDetails || { userDetails: { fname: '', lname: '', address: '', batchCode: '', city: '', coursecode: '', createdAt: '', dob: '', email: '', enrollmentNumber: '', fathername: '', gender: '', mothername: '', phone: '', pincode: '', state: '', image: '' } };
    const { batchDetails: { batchFullName } } = allDetails || { batchDetails: { batchFullName: 'Batch Name' } };
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        if (!event.target.files[0]) return;
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('imageFile', file);
        formData.append('userEmail', email);


        try {

            const res = await fetch('/api/imageUpload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if(!data.added){
                console.log(data.error)
            } else {
                window.location.reload();
            }
            
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <div className='min-h-screen card2'>
            {/* <h3 className='fontsz1'>Profile</h3> */}
            <div className='mt-2 flex items-center max-[577px]:block '>
                {/* <p className='fontsz2'>This is your profile page.</p> */}
                <figure className='relative w-[200px] h-[200px] max-[577px]:w-[120px] max-[577px]:h-[120px]'>
                    {!image ? <Image alt='userImage' fill className='object-cover border-2 rounded-full' src={'/userImage.jpg'}></Image> : <Image alt='userImage' fill className='object-cover rounded-full' priority src={image}></Image>}
                    <span className='absolute right-5 border-2 border-white bottom-5 inline-block w-4 h-4 rounded-full bg-green-500 max-[577px]:right-0'></span>
                    <div className='absolute top-5 right-5 max-[577px]:top-2 max-[577px]:right-2 rounded p-0.5 bg-gray-100'>
                        <FaPencilAlt className='cursor-pointer text-gray-600' id="fileIcon" onClick={handleIconClick} size={15} />
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        name='imageFile'
                        accept='image/jpeg, image/png'

                        ref={fileInputRef}
                        className='hidden'
                        onChange={handleFileChange}
                    />
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
                        <li>&bull; &nbsp; Enrolled Course Code: {coursecode}</li>
                        <li>&bull; &nbsp; Birth Date: {new Date(dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</li>
                        <li>&bull; &nbsp; Enrollment Number: {enrollmentNumber}</li>
                        <li>&bull; &nbsp; Gender: {_.capitalize(gender)}</li>
                        <li>&bull; &nbsp; Address: {`${_.capitalize(address)}, ${_.capitalize(city)}, ${_.capitalize(state)}, ${pincode}`}</li>
                        <li>&bull; &nbsp; Enrolled on: {new Date(createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</li>

                    </ul>
                </div>
                <div className='mb-4'>
                    <p className='font-semibold mb-2'>Contact</p>
                    <ul>
                        <li>&bull; &nbsp; Phone: {phone}</li>
                    </ul>
                </div>
                <div className='mb-4'>
                    <p>To update any Information or have any query, Kindly raise a ticket from <Link className='underline text-blue-600' href='/support'>here</Link>.</p>
                </div>
            </div>

        </div>
    )
}

export default page
