'use client';

import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { VscSearch } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx'
import { useRootContext } from '@/app/provider/RootProvider';
import Link from 'next/link';

const page = () => {
    const [searchInput, setSearchInput] = useState('')
    const [showInput, setShowInput] = useState(false);
    const [inbox, setInbox] = useState([]); // [{from, subject, message}]
    const [outgoing, setOutGoing] = useState([]); // [{from, subject, message}]
    const [showModal, setShowModal] = useState(false);
    const [whichOne, setWhichOne] = useState(0);
    const allDetails = useRootContext();
    const { userDetails: { email } } = allDetails || { userDetails: { email: '' } };
    const [form, setForm] = useState({
        to: '',
        from: email,
        subject: '',
        message: ''
    })

    const searchInputValue = (e) => {
        const { value } = e.target;
        setSearchInput(value);
        //search based on input value
    }
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
            setWhichOne(1);
            fetchInbox();
        } else {
            alert(data.error)
        }
    }

    const clearInbox = async () => {
        const res = await fetch(`/api/clearInbox`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        const data = await res.json();
        if (data.status) {
            fetchInbox();
        } else {
            alert(data.error)
        }
    }

    const updateIsRead = async (eachInbox) => {

        const res = await fetch(`/api/updateIsRead`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eachInbox })
        })
    }

    const fetchInbox = async () => {
        const res = await fetch(`/api/userInbox?email=${email}`);
        const data = await res.json();

        if (data.status) {
            const incoming = data.userInbox.filter(item => item.isIncoming);
            const outgoing = data.userInbox.filter(item => !item.isIncoming);

            setInbox(incoming);
            setOutGoing(outgoing)
        } else {
            alert(data.error)
        }
    }
    useEffect(() => {
        if (!email) return;
        fetchInbox();
    }, [email])

    return (
        <div className='min-h-screen'>
            <div className='flex items-center fontsz2 border-b-2 pb-1'>
                <h3 className={`mr-2 cursor-pointer ${whichOne !== 0 && 'text-gray-400 hover:text-inherit'}`} onClick={() => setWhichOne(0)}>Inbox <span className='bg-gray-400 fontsz3 p-1 text-white'>{inbox.length}</span></h3>
                <h3 className={`mr-2 cursor-pointer ${whichOne !== 1 && 'text-gray-400 hover:text-inherit'}`} onClick={() => setWhichOne(1)}>Sent Mail <span className='bg-gray-400 fontsz3 p-1 text-white'>{outgoing.length}</span></h3>
                <div className='card3 ml-auto mr-1 group' onClick={() => setShowModal(true)}><AiOutlinePlus className='mr-1 group-hover:text-green-600' size={12} />New message</div>
                <div onClick={clearInbox} className='card3 group'><MdDelete className='mr-1 group-hover:text-red-600' size={12} />Clear All</div>
            </div>
            {
                whichOne === 0 ?
                    <>
                        <h3 className='heading3 my-4'>
                            Inbox
                        </h3>
                        <div className='flex items-center fontsz2'>
                            {
                                showInput ?
                                    <>
                                        <div className='cursor-pointer flex items-center px-2 py-0.5 rounded-tl rounded-bl border group'>
                                            <input type="text" name='searchInput' value={searchInput} onChange={searchInputValue} className='outline-none' placeholder='Search' />
                                            <button onClick={() => setShowInput(prev => !prev)}><RxCross2 className='hover:text-red-600' /></button>
                                        </div>
                                    </> :
                                    <>
                                        <div onClick={() => setShowInput(prev => !prev)} className='cursor-pointer flex items-center px-2 py-0.5 rounded-tl rounded-bl border group'><VscSearch className='mr-1 group-hover:text-purple-600' size={12} />Search</div>
                                    </>
                            }
                            {/* <div className='cursor-pointer flex items-center px-2 py-0.5 border group border-l-0'><AiOutlinePlus className='mr-1 group-hover:text-green-600' size={12} />Mark as read</div> */}
                            {/* <div className='cursor-pointer flex items-center px-2 py-0.5 border group border-l-0'><RxCross2 className='mr-1 group-hover:text-red-600' size={12} />Mark as unread</div> */}
                            <div className='cursor-pointer flex items-center px-2 py-0.5 rounded-tr rounded-br border group border-l-0'><MdDelete className='mr-1 group-hover:text-red-600' size={12} />Delete</div>
                        </div>
                        {
                            inbox.length !== 0 ?
                                <table className="my-2 text-left text-sm font-light w-full table-fixed">
                                    <thead className="border-b font-medium bg-gray-200">
                                        <tr>
                                            <th scope="col" className="px-6 py-2 w-16"><input type="checkbox" name="" id="" /></th>
                                            <th scope="col" className="px-6 py-2">From</th>
                                            <th scope="col" className="px-6 py-2">Subject</th>
                                            <th scope="col" className="px-6 py-2 text-right">Sent</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {
                                            inbox?.map((eachInbox, index) => {
                                                return <tr key={index} className={`border-b border-b-gray-200 hover:bg-gray-50 transition-all ${!eachInbox.isRead && 'font-semibold bg-gray-50'}`} onClick={() => updateIsRead(eachInbox)}>
                                                    <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                                                    <td className="whitespace-nowrap text-ellipsis overflow-hidden"><Link className='block px-6 py-2' href={`/inbox/${eachInbox._id}`}>{eachInbox.from}</Link></td>
                                                    <td className="whitespace-nowrap text-ellipsis overflow-hidden"><Link className='block px-6 py-2' href={`/inbox/${eachInbox._id}`}>{eachInbox.subject}</Link></td>
                                                    <td className="whitespace-nowrap text-ellipsis overflow-hidden text-right"><Link className='block px-6 py-2' href={`/inbox/${eachInbox._id}`}>{new Date(eachInbox.date).toDateString()}</Link></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>

                                : <div className='mt-4'>No Message to display!</div>
                        }

                    </>
                    :
                    <>
                        <h3 className='heading3 my-4'>
                            Sent Mail
                        </h3>
                        <div className='flex items-center fontsz2'>
                            {
                                showInput ?
                                    <>
                                        <div className='cursor-pointer flex items-center px-2 py-0.5 rounded-tl rounded-bl border group'>
                                            <input type="text" name='searchInput' value={searchInput} onChange={searchInputValue} className='outline-none' placeholder='Search' />
                                            <button onClick={() => setShowInput(prev => !prev)}><RxCross2 className='hover:text-red-600' /></button>
                                        </div>
                                    </> :
                                    <>
                                        <div onClick={() => setShowInput(prev => !prev)} className='cursor-pointer flex items-center px-2 py-0.5 rounded-tl rounded-bl border group'><VscSearch className='mr-1 group-hover:text-purple-600' size={12} />Search</div>
                                    </>
                            }
                            {/* <div className='cursor-pointer flex items-center px-2 py-0.5 border group border-l-0'><AiOutlinePlus className='mr-1 group-hover:text-green-600' size={12} />Mark as read</div> */}
                            {/* <div className='cursor-pointer flex items-center px-2 py-0.5 border group border-l-0'><RxCross2 className='mr-1 group-hover:text-red-600' size={12} />Mark as unread</div> */}
                            <div className='cursor-pointer flex items-center px-2 py-0.5 rounded-tr rounded-br border group border-l-0'><MdDelete className='mr-1 group-hover:text-red-600' size={12} />Delete</div>
                        </div>
                        {
                            outgoing.length !== 0 ?
                                <table className="my-2 text-left text-sm font-light w-full table-fixed">
                                    <thead className="border-b font-medium bg-gray-200">
                                        <tr>
                                            <th scope="col" className="px-6 py-2 w-16"><input type="checkbox" name="" id="" /></th>
                                            <th scope="col" className="px-6 py-2">To</th>
                                            <th scope="col" className="px-6 py-2">Subject</th>
                                            <th scope="col" className="px-6 py-2 text-right">Sent</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {
                                            outgoing?.map((eachInbox, index) => {
                                                return <tr key={index} className={`border-b border-b-gray-200 hover:bg-gray-50 transition-all ${!eachInbox.isRead && 'font-semibold bg-gray-50'}`} onClick={() => updateIsRead(eachInbox)}>
                                                    <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                                                    <td className="whitespace-nowrap text-ellipsis overflow-hidden"><Link className='block px-6 py-2' href={`/inbox/${eachInbox._id}`}>{eachInbox.to}</Link></td>
                                                    <td className="whitespace-nowrap text-ellipsis overflow-hidden"><Link className='block px-6 py-2' href={`/inbox/${eachInbox._id}`}>{eachInbox.subject}</Link></td>
                                                    <td className="whitespace-nowrap text-ellipsis overflow-hidden text-right"><Link className='block px-6 py-2' href={`/inbox/${eachInbox._id}`}>{new Date(eachInbox.date).toDateString()}</Link></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>

                                : <div className='mt-4'>No Message to display!</div>
                        }
                    </>
            }
            {
                showModal &&
                <div className='fixed top-0 left-0 w-full h-full'>
                    <div className='absolute inset-0 bg-slate-300 opacity-70'></div>
                    <div className='fixed w-[60%] max-[860px]:w-[90%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white'>
                        <h3 className='bg-blue-600 text-white px-2 py-1 flex justify-between items-center'>Send Message <RxCross2 className='cursor-pointer' onClick={() => { setShowModal(false) }} /></h3>
                        <form onSubmit={handleFormSubmit} className='px-2 py-4'>
                            <div className='flex items-center mb-2'>
                                <label htmlFor="to" className='text-gray-600 text-sm mr-2'>To:</label>
                                <input type="email" required value={form.to} onChange={handleFormChange} name='to' id='to' className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1' />
                            </div>
                            <div className='flex items-center mb-2'>
                                <label htmlFor="from" className='text-gray-600 text-sm mr-2'>From:</label>
                                <input type="text" value={form.from} disabled onChange={handleFormChange} name='from' id='from' className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1 cursor-not-allowed' />
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


        </div>
    )
}

export default page
