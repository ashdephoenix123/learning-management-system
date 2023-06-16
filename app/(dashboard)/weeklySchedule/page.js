'use client';

import { useRootContext } from '@/app/provider/RootProvider';
import Link from 'next/link';
import React from 'react'

const page = () => {
  const allDetails = useRootContext();
  const { courseDetails: {  weeklySchedule  } } = allDetails || { courseDetails: {  weeklySchedule: []  } };

  return (
    <section className='min-h-screen card2'>
      <h3 className='heading1'>Weekly Schedule</h3>
      {
        weeklySchedule?.map((week) => {
          return <div className='mb-2' key={week.weekNumber}>
            <p className='text-sm inline-block mr-2'>Week {week.weekNumber}:</p>
            <Link href={week.linkToPDF} target='_blank' className='inline-block italic text-sm btn3'>download</Link>
          </div>
        })
      }
    </section>
  )
}

export default page
