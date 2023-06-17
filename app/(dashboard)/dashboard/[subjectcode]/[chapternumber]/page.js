import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import _ from 'lodash'

async function getData(subjectcode, chapternumber) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/courses`, { next: { revalidate: 3 } })
    const data = await res.json()

    const chaptersByNumber = {}

    data.courses.forEach((course) => {
        course.semesters.forEach((semester) => {
            semester.subjects.forEach((subject) => {
                if (subject.subjectcode === subjectcode) {
                    subject.chapters.forEach((chapter) => {
                        chaptersByNumber[chapter.chapternumber] = chapter
                    })
                }
            })
        })
    })


    const currentChapter = chaptersByNumber[Number(chapternumber)]

    if (!currentChapter) {
        throw new Error('Chapter not found')
    }

    return currentChapter
}

const Page = async ({ params }) => {

    const currentChapter = await getData(params.subjectcode, params.chapternumber)

    return (
        <>
            <section className='min-h-screen'>
                <h3 className='heading1 mb-4'>{currentChapter.chaptername}</h3>
                <Link href={currentChapter.linktopdf} target='_blank' className='relative w-16 h-16 hover:cursor-pointer block mb-6'>
                    <Image src='/pdfImage.png' fill alt='pdfImage'></Image>
                    <MdDownloadForOffline className='absolute text-green-500 right-1 bottom-0 inline-block w-4 h-4 rounded-full bg-white max-[577px]:right-0' />
                </Link>
                <div className='mb-4'>
                    <h3 className='heading2 italic inline-block bg-yellow-400 p-1 mb-2'>Topics Covered:</h3>
                    <ul>
                        {
                            currentChapter.topics?.map((item, index) => (
                                <li key={index} className='heading3 text-sm'>&bull; &nbsp;{_.capitalize(item)}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className='mb-4'>
                    <h3>Recorded Sessions:</h3>
                    <div>
                        {
                            currentChapter.recordedsessions?.map((item, index) => (
                                <div key={index}>
                                    &bull;&nbsp;<Link className='underline text-sm italic' target='_blank' href={item}>{`Session ${index + 1}`}</Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/7C2z4GqqS5E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </section>
        </>
    )
}

export default Page
