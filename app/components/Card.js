import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Card = ({ subjectDetails }) => {

    return (
        <>
            <main className="project-lists">
                <Link href='/programInformation' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/1.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>01. </span>Program Information</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>
                <Link href='/courseMatrixAndSyllabus' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/2.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>02. </span>Course Matrix and Syllabus</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>
                <Link href='/weeklySchedule' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/3.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>03. </span>Weekly Schedule</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>

                {
                    subjectDetails?.subjects?.map((item, index) => {
                        return (
                            <Link key={item.subjectcode} href={`/dashboard/${item.subjectcode}`} className="card font1">
                                <figure className="card-figure relative h-[15rem] w-full">
                                    <Image className="card-img" src={item.subjectimage} alt="proj9" fill></Image>
                                </figure>
                                <div className="card-info tracking-tight">
                                    <h3 className="fontsz1 min-h-12"><span>0{index+4}. </span>{item.subjectname}</h3>
                                    <p className='mb-1 text-gray-200'>{item.subjectcode}</p>
                                    <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                                    <p className='text-right fontsz3 text-gray-200'>{item.chapters.length} lesson</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </main>
        </>
    )
}

export default Card
