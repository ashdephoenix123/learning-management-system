'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;

const Page = ({ params }) => {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [email, setEmail] = useState('');

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io(undefined, {
            path: '/api/socket_io'
        })

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('receive-message', (data) => {
            setAllMessages((prev) => [...prev, data]);

        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
        socket.emit('send-message', { email, message });
        setMessage('')
        window.scrollTo(0, document.body.scrollHeight);

    }

    useEffect(() => {
        socketInitializer()
    }, [])

    return (
        <div className='my-4 min-h-screen'>
            <h3 className='font-semibold text-xl  mb-4'>Topic: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore optio minima ipsam nihil magnam officia itaque nisi a enim praesentium.</h3>
            <p>Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, alias iure. Velit, impedit natus earum eos quisquam animi dolore sed a optio quia aliquid, nihil, in nemo tempore? Laudantium, sunt.</p>
            <input type="email" required value={email} className='border border-black' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
            {
                email &&
                <div className='border border-gray-300 rounded py-2'>
                    {
                        allMessages?.map((item, index) => {
                            return <div key={index} className={`rounded px-3 py-1 flex gap-3  ${item.email === email && 'flex-row-reverse'}`}>
                                <Image src={'/me.jpg'} alt='image user' width={500} height={500} className='w-10 h-10 object-cover rounded-full'></Image>
                                <div className='border border-gray-200 rounded bg-green-600 text-white max-w-[60%] text-sm px-2 py-0.5 flex items-center'>
                                    {item.message}
                                </div>
                            </div>
                        })
                    }

                    <form onSubmit={handleSubmit} className='flex gap-2 mt-4 px-3'>
                        <input name='message' value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className='border border-gray-300 rounded-lg px-2 py-2 outline-none text-gray-700 w-full text-sm' placeholder='Type here...' />
                        <button className='bg-gray-900 text-white px-2 py-1 rounded-lg text-sm'>Send</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Page
