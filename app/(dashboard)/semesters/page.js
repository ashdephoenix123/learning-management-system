'use client';

import SemesterCard from '@/app/components/semesterCard';
import { useRootContext } from '@/app/provider/RootProvider';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = async () => {
    const allDetails = useRootContext();
    const [otherSemesters, setOtherSemesters] = useState([])

    const { batchDetails: { semester } } = allDetails || { batchDetails: { semester: null } };
    const { courseDetails: { semesters } } = allDetails || { courseDetails: { semesters: [] } };


    useEffect(() => {
        const otherSemesters = semesters.filter((item) => {
            return item.semester !== semester
        })
        setOtherSemesters(otherSemesters)
    }, [])

    return (
        <div className='min-h-screen card2'>
            <h3 className='heading1 mb-2'>Other Semester Details</h3>
            <div className="project-lists2">

                {
                    otherSemesters.map((item) => {
                        return <SemesterCard key={item.semester} item={item} />
                    })
                }


            </div>
        </div>
    )
}

export default page
