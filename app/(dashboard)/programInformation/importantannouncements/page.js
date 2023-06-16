'use client';

import { useRootContext } from '@/app/provider/RootProvider';
import Link from 'next/link';
import React from 'react'

const page = () => {
    const allDetails = useRootContext();
    const { courseDetails: { programInfo: { importantAnnouncements } } } = allDetails || { courseDetails: { programInfo: { importantAnnouncements: [] } } };

    return (
        <section className='min-h-screen card2'>
            <h3 className='heading1'>Important Announcements</h3>
            {
                importantAnnouncements?.map((announcement, index) => {
                    return <div className='mb-1'  key={index}>
                        <Link href={announcement.linkToPDF} target='_blank' className='underline italic text-sm'>{announcement.title}</Link>
                    </div>
                })
            }
        </section>
    )
}

export default page
