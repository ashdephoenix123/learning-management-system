'use client';

import { useRootContext } from '@/app/provider/RootProvider'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import _ from 'lodash'
import { FaPencilAlt } from 'react-icons/fa'
import jsPDF from 'jspdf';
import { MdDownload } from 'react-icons/md';
import autoTable from 'jspdf-autotable'


const page = () => {
    const allDetails = useRootContext();
    const { userDetails: { fname, lname, address, batchCode, city, coursecode, createdAt, dob, email, enrollmentNumber, fathername, gender, mothername, phone, pincode, state, image, paymentDetails: { razorpay_payment_id } } } = allDetails || { userDetails: { fname: '', lname: '', address: '', batchCode: '', city: '', coursecode: '', createdAt: '', dob: '', email: '', enrollmentNumber: '', fathername: '', gender: '', mothername: '', phone: '', pincode: '', state: '', image: '', paymentDetails: { razorpay_payment_id: '' } } };
    const { batchDetails: { batchFullName } } = allDetails || { batchDetails: { batchFullName: 'Batch Name' } };
    const { courseDetails: { totalFee } } = allDetails || { courseDetails: { totalFee: 0 } };

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
            if (!data.added) {
                alert(data.error)
            } else {
                window.location.reload();
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDownload = () => {

        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set the font style and size for the text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        // Set the text color
        doc.setTextColor(0, 0, 0); // RGB color values (black in this case)

        // Set the title and position of the user details section
        const value = 50;

        // Add the image to the document
        const imgData = 'auvlogo2.png'; // Replace with the path or URL to your image
        doc.addImage(imgData, 'PNG', 10, 10, 50, 30);

        // Set the font style and size for the user details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');


        // Create the data array for the table
        const tableData = [
            ['Student Name:', `${fname} ${lname}`],
            ['Email:', email],
            ['Phone:', phone],
            ['Enrollment Number:', enrollmentNumber],
            ['Batch:', batchCode],
            ['Course Code:', `${coursecode} (Online Mode)`],
            ['Course Fees:', `Rs ${totalFee}`],
            ['Payment Reference ID:', razorpay_payment_id],
            ['Transaction date:', new Date(createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })],
        ];

        // Set the table position
        const tableX = 10;
        const tableY = value + 10;

        // Add the table to the document
        doc.autoTable({
            startY: tableY,
            head: [['Field', 'Value']],
            body: tableData,
        });

        // Set the font style, size, and position for the computer-generated text
        const compGenText = '***This is a computer-generated e-receipt. Does not require Signature & Seal***';
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        const textWidth = doc.getStringUnitWidth(compGenText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
        const textY = value + 120;

        // Add the computer-generated text to the document
        doc.text(compGenText, textX, textY);

        // Save the PDF file
        doc.save('payment_receipt.pdf');

    }

    return (
        <div className='min-h-screen card2'>
            {/* <h3 className='fontsz1'>Profile</h3> */}
            <div className='mt-2 flex items-center max-[577px]:block '>
                {/* <p className='fontsz2'>This is your profile page.</p> */}
                <figure className='relative w-[200px] h-[200px] max-[577px]:w-[120px] max-[577px]:h-[120px]'>
                    {!image ? <Image alt='userImage' fill className='object-cover border-2 rounded-full' src={'/userImage.jpg'}></Image> : <Image alt='userImage' fill className='object-cover rounded-full' priority src={image}></Image>}
                    <span className='absolute right-5 border-2 border-white bottom-5 inline-block w-4 h-4 rounded-full bg-green-500 max-[577px]:right-0'></span>
                    <div className='absolute top-5 right-5 max-[577px]:top-2 max-[577px]:right-2 rounded p-0.5 bg-gray-100 hover:scale-110 hover:bg-gray-200 transition-all'>
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
                <div>
                    <a href="#" className='px-2 py-1 bg-slate-200 rounded group' onClick={handleDownload}><MdDownload className='inline' /> <span className='group-hover:underline'>Download Payment Receipt</span></a>
                </div>
            </div>

        </div>
    )
}

export default page
