import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className='py-4 primary text-white'>
            <div className='flex justify-end container2 mb-4 fontsm max-[677px]:block max-[677px]:text-center mt-12'>
                <div className='flex items-center mr-2 max-[677px]:block'>
                    <div className=' max-[677px]:text-center'>&copy;  {year-1} - {year} Anonymous University</div>
                </div>
                <span className='after bg-gray-400 max-[394px]:hidden'></span>
                <span className='ml-2'>All Rights Reserved</span>
            </div>
        </footer>
    )
}

export default Footer