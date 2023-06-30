'use client';

import { useRootContext } from '@/app/provider/RootProvider';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx';

const Page = () => {
    const allDetails = useRootContext();
    const { batchDetails: { batchCode } } = allDetails || { batchDetails: { batchCode: '' } };
    const { userDetails: { email } } = allDetails || { userDetails: { email: '' } };
    const [showModal, setShowModal] = useState(false);
    const [forums, setForums] = useState([]);

    const [form, setForm] = useState({
        title: '',
        description: ''
    })

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/forum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...form, batchCode, email })
        })
        const data = await res.json();
        if (data.status) {
            setShowModal(false)
            setForm({
                title: "",
                description: ""
            });
            allForum()
        } else {
            alert(data.error)
        }
    }

    const allForum = async () => {
        const res = await fetch(`/api/forum?batchCode=${batchCode}`);
        const data = await res.json();
        if (data.status) {
            setForums(data.allForums)
        }
    }
    useEffect(() => {
        allForum();
    }, [batchCode])


    return (
        <section className='min-h-screen'>
            <div className='flex justify-between'>
                <h3 className='text-3xl font-semibold'>Discussion Forum</h3>
                <button className='bg-blue-500 hover:bg-blue-600 px-1.5 outline-none focus:bg-blue-600 rounded text-white text-sm flex items-center gap-1' onClick={() => { setShowModal(true) }}><AiOutlinePlus />Add New</button>
            </div>
            <div className='mt-6'>
                {
                    forums?.map((forum) => {
                        return <Link key={forum._id} href={`/forum/${forum._id}`} className='bg-gray-200 rounded block mb-4 px-4 py-4 hover:bg-gray-300 transition-all relative'>
                            {forum.isOpen ? <span className='absolute -top-2 left-1 bg-green-500 rounded-lg px-1 text-xs text-white'>Open</span> : <span className='absolute -top-2 left-1 bg-red-500 rounded-lg px-1 text-xs text-white'>Closed</span>}

                            <h3 className='font-semibold'>{forum.title}.</h3>
                            <p className='text-sm'>{forum.description}</p>
                        </Link>
                    })
                }
            </div>

            {/* //showModal */}
            {
                showModal &&
                <div className='fixed top-0 left-0 w-full h-full'>
                    <div className='absolute inset-0 bg-slate-300 opacity-70'></div>
                    <div className='fixed w-[60%] max-[860px]:w-[90%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white'>
                        <h3 className='bg-blue-600 text-white px-2 py-1 flex justify-between items-center'>Add a Discussion Forum <RxCross2 className='cursor-pointer' onClick={() => { setShowModal(false) }} /></h3>
                        <form onSubmit={handleFormSubmit} className='px-2 py-4'>
                            <div className='flex items-center mb-2'>
                                <label htmlFor="title" className='text-gray-600 text-sm mr-2'>Title:</label>
                                <input type="text" required value={form.title} onChange={handleFormChange} name='title' id='title' className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1' />
                            </div>
                            <div className='flex mb-2'>
                                <label htmlFor="description" className='text-gray-600 text-sm mr-2'>Desccription:</label>
                                <textarea name="description" value={form.description} required onChange={handleFormChange} id="description" rows="5" className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1 w-full'></textarea>
                            </div>
                            <div className='flex flex-row-reverse'>
                                <button type='submit' className='btn outline-none'>Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            }
        </section>
    )
}

export default Page
