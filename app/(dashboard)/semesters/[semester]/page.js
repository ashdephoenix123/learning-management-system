import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import _ from 'lodash'

async function getData(semesterNumber) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/courses`, { cache: 'no-store' })
    const data = await res.json()

    const subjectsBySemester = {}

    data.courses.forEach((course) => {
        course.semesters.forEach((semester) => {
            const semNumber = semester.semester
            if (!subjectsBySemester[semNumber]) {
                subjectsBySemester[semNumber] = []
            }
            subjectsBySemester[semNumber].push(...semester.subjects)
        })
    })

    const subjects = subjectsBySemester[semesterNumber]

    if (!subjects) {
        throw new Error('Semester not found')
    }

    return subjects
}

const Page = async ({ params }) => {
    const subjects = await getData(params.semester)

    return (
        <>
            <section className='min-h-screen'>
                <h3 className='heading1'>All Subjects</h3>
                <main className="project-lists">

                    {
                        subjects?.map((item, index) => {
                            return (
                                <Link key={item.subjectcode} href={`/dashboard/${item.subjectcode}`} className="card font1">
                                    <figure className="card-figure relative h-[15rem] w-full">
                                        <Image className="card-img" src={item.subjectimage} alt="proj9" fill></Image>
                                    </figure>
                                    <div className="card-info tracking-tight">
                                        <h3 className="fontsz1 h-12"><span>04. </span>{item.subjectname}</h3>
                                        <p className='mb-1 text-gray-200'>{item.subjectcode}</p>
                                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                                        <p className='text-right fontsz3 text-gray-200'>{item.chapters.length} lesson</p>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </main>
            </section>
        </>
    )
}

export default Page
