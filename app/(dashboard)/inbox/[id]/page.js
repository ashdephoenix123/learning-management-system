'use client';

import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useParams } from 'next/navigation'
import { MdDelete } from 'react-icons/md'
import { useRootContext } from '@/app/provider/RootProvider';
import { RxCross2 } from 'react-icons/rx';
import { set } from 'lodash';
import { useRouter } from 'next/navigation';

const page = () => {
    const allDetails = useRootContext();
    const { userDetails: { email } } = allDetails || { userDetails: { email: '' } };
    const param = useParams();
    const [showModal, setShowModal] = useState(false);
    const [recipientID, setRecipientID] = useState('');
    const router = useRouter();
    const [error, setError] = useState({
        status: false,
        message: ''
    });
    const [message, setMessage] = useState({
        from: "",
        subject: "",
        message: "",
        date: ""
    });

    const [allReplies, setAllReplies] = useState([])

    const [form, setForm] = useState({
        to: '',
        message: ''
    })

    const deleteThisInbox = async () => {
        const res = await fetch('/api/deleteThatInbox', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, _id: param.id })
        })
        const data = await res.json();
        if(data.status){
            router.replace('/inbox')
        }else {
            alert(data.error)
        }
    }

    const handleForm = (e) => {
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
        //code for calling the api which updates the repies section of the user inbox.
        const res = await fetch('/api/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...form, sender: email, _id: param.id, recipientID })
        })
        const data = await res.json();
        if (data.status) {
            //ending
            fetchInbox();
            setShowModal(false);
            setForm((prev) => {
                return {
                    ...prev,
                    message: ''
                }
            })
        } else {
            setShowModal(false);
            setForm((prev) => {
                return {
                    ...prev,
                    message: ''
                }
            })
            setError({
                status: true,
                message: data.error
            });
        }
    }

    const fetchInbox = async () => {
        const res = await fetch(`/api/userInbox?email=${email}`);
        const data = await res.json();
        if (data.status) {
            const inboxData = data.userInbox.filter(inbox => inbox._id == param.id);
            setMessage(...inboxData);
            setAllReplies(inboxData[0].replies);
            setRecipientID(inboxData[0].recipientID ? inboxData[0].recipientID : inboxData[0].senderID);
            setForm((prev) => {
                return {
                    ...prev,
                    to: data.userInbox[0].from === email ? data.userInbox[0].to : data.userInbox[0].from
                }
            })
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        if (!email) return;
        fetchInbox();
    }, [email, param.id])

    return (
        <div className='min-h-screen'>
            <h3 className='heading1'>{message.subject}</h3>
            <div className='text-sm text-gray-600 mb-4'>
                <div>
                    <p>
                        From:
                        <span className='mx-1 font-semibold text-black'>{message.from === email ? 'You' : message.from}</span>
                        <span className='italic'>on {new Date(message.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: "numeric", minute: "numeric", second: "numeric" })}</span>
                    </p>
                </div>
                <div>
                    <p>
                        To:
                        <span className='mx-1 font-semibold text-black'>{message.to === email ? 'You' : message.to}</span>
                    </p>
                </div>
                <div className='my-4'>
                    <p>{message.message}</p>
                </div>
                <hr />
            </div>

            {/* //replies */}

            {
                allReplies?.map((reply, index) => {
                    return <div key={index} className='text-sm text-gray-600 mb-4'>
                        <div>
                            <p>
                                From:
                                <span className='mx-1 font-semibold text-black'>{reply.sender === email ? 'You' : reply.sender}</span>
                                <span className='italic'>on {new Date(reply.repliedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: "numeric", minute: "numeric", second: "numeric" })}</span>
                            </p>
                        </div>
                        <div className='my-4'>
                            <p>{reply.body}</p>
                        </div>
                        <hr />
                    </div>
                })
            }
            {
                error.status && <div className='my-4 bg-red-500 py-1 text-center'>
                    <p className='text-white text-sm inline-block'>{error.message}</p>
                </div>}

            <div className='flex items-center fontsz2 mt-4'>
                <div className='cursor-pointer flex items-center px-2 py-0.5 border rounded-tl rounded-bl group' onClick={() => setShowModal(true)}><AiOutlinePlus className='mr-1 group-hover:text-green-600' size={12} />Reply</div>
                <div onClick={deleteThisInbox} className='cursor-pointer flex items-center px-2 py-0.5 rounded-tr rounded-br border group border-l-0'><MdDelete className='mr-1 group-hover:text-red-600' size={12} />Delete</div>
            </div>

            {
                showModal &&
                <div className='fixed top-0 left-0 w-full h-full'>
                    <div className='absolute inset-0 bg-slate-300 opacity-70'></div>
                    <div className='fixed w-[60%] max-[860px]:w-[90%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white'>
                        <h3 className='bg-blue-600 text-white px-2 py-1 flex justify-between items-center'>Send Message <RxCross2 className='cursor-pointer' onClick={() => setShowModal(false)} /></h3>
                        <form onSubmit={handleFormSubmit} className='px-2 py-4'>
                            <div className='flex items-center mb-2'>
                                <label htmlFor="to" className='text-gray-600 text-sm mr-2'>Reply To:</label>
                                <input type="email" name='from' id='to' required onChange={handleForm} value={form.to} className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1 cursor-not-allowed' />
                            </div>
                            <div className='flex mb-2'>
                                <label htmlFor="message" className='text-gray-600 text-sm mr-2'>Message:</label>
                                <textarea name="message" id='message' onChange={handleForm} value={form.message} rows="5" className='flex-1 outline-none border text-sm text-gray-700 px-2 py-1 w-full'></textarea>
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
