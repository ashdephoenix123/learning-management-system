'use client';

import { useRootContext } from '@/app/provider/RootProvider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { MdDownloadForOffline } from 'react-icons/md';

const page = () => {
    const allDetails = useRootContext();
    const { courseDetails: { programInfo: { handbook } } } = allDetails || { courseDetails: { programInfo: { handbook: '' } } };

    return (
        <section className='min-h-screen card2'>
            <h3 className='heading1'>Handbook</h3>
            <Link href={handbook} target='_blank' className='relative w-16 h-16 hover:cursor-pointer block mb-6'>
                <Image src='/pdfImage.png' fill alt='pdfImage'></Image>
                <MdDownloadForOffline className='absolute text-green-500 right-1 bottom-0 inline-block w-4 h-4 rounded-full bg-white max-[577px]:right-0' />
            </Link>
        </section>
    )
}

export default page
