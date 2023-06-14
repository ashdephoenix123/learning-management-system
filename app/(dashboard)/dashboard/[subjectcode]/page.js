import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import _ from 'lodash'

async function getData(subjectcode) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/courses`)
    const data = await res.json()

    const chaptersBySubjectCode = {}

    data.courses.forEach((course) => {
        course.semesters.forEach((semester) => {
            semester.subjects.forEach((subject) => {
                const subjectCode = subject.subjectcode
                if (!chaptersBySubjectCode[subjectCode]) {
                    chaptersBySubjectCode[subjectCode] = []
                }
                chaptersBySubjectCode[subjectCode].push(...subject.chapters)
            })
        })
    })

    const chapters = chaptersBySubjectCode[subjectcode]

    if (!chapters) {
        throw new Error('Subject not found')
    }

    return chapters
}

const Page = async ({ params }) => {
    const chapters = await getData(params.subjectcode)

    return (
        <>
            <section className='min-h-screen'>
                <h3 className='heading1'>All Chapters</h3>
                <main className="project-lists">
                    {
                        chapters.map((chapter, index) => (
                            <Link key={index} href={`/dashboard/${params.subjectcode}/${chapter.chapternumber}`} className="card font1 relative">
                                <figure className="card-figure relative h-[10rem] w-full">
                                    <Image className="card-img" src='/14.jpg' alt="proj9" fill />
                                </figure>
                                <div className="card-info tracking-tight mb-4">
                                    <h3 className="fontsz1 h-12"><span>{chapter.chapternumber}. </span>{chapter.chaptername}</h3>
                                    <p className='mb-1 text-gray-200'>{chapter.topics.map((topic, index) => (
                                        <span key={index} className='text-xs mr-0.5'>{_.capitalize(topic)}{index !== chapter.topics.length - 1 && ','}</span>
                                    ))}</p>
                                </div>
                                <p className='text-right absolute right-5 bottom-2 fontsz3 text-gray-200'>{chapter.topics.length} sections</p>
                            </Link>
                        ))
                    }
                </main>
            </section>
        </>
    )
}

export default Page
