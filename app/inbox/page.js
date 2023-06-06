'use client';

import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { VscSearch } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx'

const page = () => {
    const [searchInput, setSearchInput] = useState('')
    const [showInput, setShowInput] = useState(false)

    const searchInputValue = (e) => {
        const { value } = e.target;
        setSearchInput(value);
        //search based on input value
    }

    const stri = 'This is a subject of the Inbox where I can write anything and everything I want.';

    return (
        <div className='min-h-screen'>
            <div className='flex items-center fontsz2 border-b-2 pb-1'>
                <h3 className='mr-2 cursor-pointer'>Inbox <span className='bg-gray-400 fontsz3 p-1 text-white'>100</span></h3>
                <h3 className='mr-2 cursor-pointer text-gray-400 hover:text-inherit'>Sent Mail</h3>
                <div className='card3 ml-auto mr-1 group'><AiOutlinePlus className='mr-1 group-hover:text-green-600' size={12} />New message</div>
                <div className='card3 group'><MdDelete className='mr-1 group-hover:text-red-600' size={12} />Clear inbox</div>
            </div>
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
                <div className='cursor-pointer flex items-center px-2 py-0.5 border group border-l-0'><AiOutlinePlus className='mr-1 group-hover:text-green-600' size={12} />Mark as read</div>
                <div className='cursor-pointer flex items-center px-2 py-0.5 border group border-l-0'><RxCross2 className='mr-1 group-hover:text-red-600' size={12} />Mark as unread</div>
                <div className='cursor-pointer flex items-center px-2 py-0.5 rounded-tr rounded-br border group border-l-0'><MdDelete className='mr-1 group-hover:text-red-600' size={12} />Delete</div>
            </div>
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
                    <tr className="border-b border-b-gray-200">
                        <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">Akash</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">{stri}</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden text-right">{new Date().toDateString()}</td>
                    </tr>
                    <tr className="border-b border-b-gray-200">
                        <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">Akash</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">{stri}</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden text-right">{new Date().toDateString()}</td>
                    </tr>
                    <tr className="border-b border-b-gray-200">
                        <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">Akash</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">{stri}</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden text-right">{new Date().toDateString()}</td>
                    </tr>
                    <tr className="border-b border-b-gray-200">
                        <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">Akash</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">{stri}</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden text-right">{new Date().toDateString()}</td>
                    </tr>
                    <tr className="border-b border-b-gray-200">
                        <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">Akash</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">{stri}</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden text-right">{new Date().toDateString()}</td>
                    </tr>
                    <tr className="border-b border-b-gray-200">
                        <td className="whitespace-nowrap px-6 py-2 font-medium"><input type="checkbox" name="" id="" /></td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">Akash</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden">{stri}</td>
                        <td className="whitespace-nowrap px-6 py-2 text-ellipsis overflow-hidden text-right">{new Date().toDateString()}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default page
