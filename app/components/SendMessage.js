'use client';

import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useRootContext } from '../provider/RootProvider';
import { useRouter } from 'next/navigation';

const SendMessage = ({ recipientEmail }) => {
    const [showModal, setShowModal] = useState(false);

    const allDetails = useRootContext();
    const { userDetails: { email } } = allDetails || { userDetails: { email: '' } };

    const [form, setForm] = useState({
        to: recipientEmail,
        from: email,
        subject: '',
        message: ''
    })

    const router = useRouter();

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await res.json();
        if (data.status) {
            setShowModal(false);
            setForm({
                to: '',
                from: email,
                subject: '',
                message: ''
            })
            router.push('/inbox')
        } else {
            alert(data.error)
        }
    }

    return (
        <>
            <button onClick={() => { setShowModal(true) }} className='bg-blue-600 text-sm text-white px-1.5 py-0.5 mt-4 rounded hover:bg-blue-700'>
                Send a Message
            </button>
            {
                showModal &&
                <div className='fixed top-0 left-0 w-full h-full'>
                    <div className='absolute inset-0 bg-slate-300 opacity-70'></div>
                    <div className='fixed w-[60%] max-[860px]:w-[90%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white'>
                        <h3 className='bg-blue-600 text-white px-2 py-1 flex justify-between items-center'>Send Message <RxCross2 className='cursor-pointer' onClick={() => { setShowModal(false) }} /></h3>
                        <form onSubmit={handleFormSubmit} className='px-2 py-4'>
                            <div className='flex items-center mb-2'>
                                <label htmlFor="to" className='text-gray-600 text-sm mr-2'>To:</label>
                                <input type="email" required value={form.to} onChange={handleFormChange} name='to' id='to' className='flex-1 outline-none border text-sm text-gray-500 px-2 py-1' disabled />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label htmlFor="from" className='text-gray-600 text-sm mr-2'>From:</label>
                                <input type="email" value={form.from} disabled onChange={handleFormChange} name='from' id='from' className='flex-1 outline-none border text-sm text-gray-500 px-2 py-1 cursor-not-allowed' />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label htmlFor="subject" className='text-gray-600 text-sm mr-2'>Subject:</label>
                                <input type="text" value={form.subject} required onChange={handleFormChange} name='subject' id='subject' className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1' />
                            </div>
                            <div className='flex mb-2'>
                                <label htmlFor="message" className='text-gray-600 text-sm mr-2'>Message:</label>
                                <textarea name="message" value={form.message} required onChange={handleFormChange} id="message" rows="5" className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1 w-full'></textarea>
                            </div>
                            <div className='flex flex-row-reverse'>
                                <button type='submit' className='btn outline-none'>Send</button>
                            </div>

                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default SendMessage
