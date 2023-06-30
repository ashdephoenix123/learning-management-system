'use client';

import { useRootContext } from '@/app/provider/RootProvider';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;

const Page = ({ params }) => {

    const allDetails = useRootContext();
    const { batchDetails: { batchCode } } = allDetails || { batchDetails: { batchCode: '' } };
    const { userDetails: { image, email } } = allDetails || { userDetails: { image: '/userImage.jpg', email: '' } };

    const [message, setMessage] = useState('');
    const [userImages, setUserImages] = useState({});
    const [forum, setForum] = useState({});

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io(undefined, {
            path: '/api/socket',
        })

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('receive-message', (data) => {
            console.log('here at receive msg')
            fetchThatForum();
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return
        const res = await fetch('/api/forumReply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify({ email, reply: message, batchCode, id: params.id })
        });
        const data = await res.json();
        if (data.status) {
            socket.emit('send-message', { email, message });
            setMessage('')
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    const fetchUserImage = async (userEmail) => {
        const res = await fetch('/api/fetchUserImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail })
        });
        const data = await res.json();
        if (data.status) {
            return data.userImage
        }
    }

    const loadUserImages = async () => {
        const emails = forum.chats?.map((item) => item.email);
        const uniqueEmails = [...new Set(emails)];

        const userImagesData = {};

        for (const email of uniqueEmails) {
            const userImage = await fetchUserImage(email);
            userImagesData[email] = userImage;
        }

        setUserImages(userImagesData);
    };

    const fetchThatForum = async () => {
        const res = await fetch(`/api/fetchThatForum?id=${params.id}&batchCode=${batchCode}`);
        const data = await res.json();
        if (data.status) {
            setForum(data.thisForum)
        } 
    }

    const closeForum = async () => {
        const res = await fetch(`/api/closeForum?id=${params.id}&batchCode=${batchCode}`);
        const data = await res.json();
        if (data.status) {
            fetchThatForum();
            window.scrollTo(0, 0);
        }
    }

    useEffect(() => {
        socketInitializer();
        fetchThatForum();
    }, [batchCode])

    useEffect(() => {
        loadUserImages();
    }, [forum.chats]); // Add allMessages as a dependency

    return (
        <>
            {!forum.isOpen && <div className='bg-red-600 text-sm italic px-2 text-white py-2 mb-2'>
                This Forum has been Closed! You can however continue to chat!
            </div>}
            <div className='min-h-[90vh] relative py-1'>
                <h3 className='font-semibold text-xl  mb-1'>Topic: {forum.title}</h3>
                <p className='mb-4'>Description: {forum.description}</p>
                <div className='border border-gray-300 rounded py-2 mb-[3rem]'>
                    <div className='min-h-[72vh] relative'>

                        {
                            forum.chats?.map((item, index) => {

                                const userImage = item.email === email ? image : userImages[item.email];


                                return <div key={index} className={`rounded px-3 py-1 flex gap-3  ${item.email === email && 'flex-row-reverse'}`}>
                                    <Link href={'/dashboard'} className='rounded-full overflow-hidden self-start'>
                                        <Image src={userImage} alt='image user' width={500} height={500} className='w-10 h-10 object-cover'></Image>
                                    </Link>
                                    <div className='border border-gray-200 rounded bg-green-600 text-white max-w-[60%] text-sm px-2 py-0.5 flex items-center'>
                                        {item.reply}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <form onSubmit={handleSubmit} className='flex gap-2 mt-2 absolute bottom-2 w-full'>
                        <input name='message' value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className='border border-gray-300 rounded-lg px-2 py-2 outline-none text-gray-700 w-full text-sm' placeholder='Type here...' />
                        <button className='bg-gray-900 text-white px-2 py-1 rounded-lg text-sm'>Send</button>
                    </form>

                </div>
            </div>
            {
                forum.openedBy === email &&
                <div className='mt-8 text-right'>
                    <button className='bg-red-500 text-white text-sm px-1 py-0.5 rounded hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-400' onClick={closeForum} disabled={!forum.isOpen}>Close this Forum!</button>
                </div>
            }
        </>
    )
}

export default Page