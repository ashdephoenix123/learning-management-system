import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import _ from 'lodash'

async function getData(semesterNumber, coursecode) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/courses`)
    const data = await res.json()

    const subjectsBySemester = {}

    const filteredCourse = data.courses.filter((course) => {
        return course.coursecode === coursecode
    })

    filteredCourse[0].semesters.forEach((semester) => {
        const semNumber = semester.semester
        if (!subjectsBySemester[semNumber]) {
            subjectsBySemester[semNumber] = []
        }
        subjectsBySemester[semNumber].push(...semester.subjects)
    })


    const subjects = subjectsBySemester[semesterNumber]

    if (!subjects) {
        throw new Error('Semester not found')
    }

    return subjects
}

const Page = async ({ params }) => {
    const subjects = await getData(params.semester, params.coursecode)

    
    return (
        <>
            <section className='min-h-screen'>
                <h3 className='heading1'>All Subjects</h3>
                <main className="project-lists">

                    {
                        subjects?.map((item, index) => {
                            return (
                                <Link key={item.subjectcode} href={`${params.semester}/${item.subjectcode}`} className="card font1">
                                    <figure className="card-figure relative h-[10rem] w-full">
                                        <Image className="card-img" src={item.subjectimage} alt="proj9" fill></Image>
                                    </figure>
                                    <div className="card-info tracking-tight">
                                        <h3 className="fontsz1 h-12"><span>{index + 1}. </span>{item.subjectname}</h3>
                                        <p className='my-1 text-sm text-gray-200'>{item.subjectcode}</p>
                                        {/* <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p> */}
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
