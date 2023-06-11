import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import _ from 'lodash'

async function getData(subjectcode) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/courses`)
    const data = await res.json()

    const AllChapters = data.courses[0].semesters.filter((item) => {
        return item.subjects.filter((item2) => {
            return item2.subjectcode === subjectcode
        }).length > 0
    })

    const thatSubject = AllChapters[0].subjects.filter((item) => {
        return item.subjectcode === subjectcode
    })

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return thatSubject[0];
}

const page = async ({ params }) => {
    const data = await getData(params.subjectcode)


    return (
        <>
            <section className='min-h-screen'>
                <h3 className='heading1'>All Chapters</h3>
                <main className="project-lists">

                    {
                        data.chapters.map((chapter, index) => {
                            return <Link href={`/dashboard/${params.subjectcode}/${chapter.chapternumber}`} className="card font1 relative">
                                <figure className="card-figure relative h-[10rem] w-full">
                                    <Image className="card-img" src='/14.jpg' alt="proj9" fill></Image>
                                </figure>
                                <div className="card-info tracking-tight mb-4">
                                    <h3 className="fontsz1 h-12"><span>{chapter.chapternumber}. </span>{chapter.chaptername}</h3>
                                    <p className='mb-1 text-gray-200'>{chapter.topics.map((topic, index) => {
                                        return <span className='text-xs mr-0.5'>{_.capitalize(topic)}{index !== chapter.topics.length - 1 && ','}</span>
                                    })}</p>
                                </div>
                                <p className='text-right absolute right-5 bottom-2 fontsz3 text-gray-200'>{chapter.topics.length} sections</p>
                            </Link>
                        })
                    }

                </main>
            </section>

        </>
    )
}

export default page
