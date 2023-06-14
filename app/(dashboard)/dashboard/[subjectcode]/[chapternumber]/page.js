import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import _ from 'lodash'

async function getData(chapternumber) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/courses`)
    const data = await res.json()

    const chaptersByNumber = {}

    data.courses.forEach((course) => {
        course.semesters.forEach((semester) => {
            semester.subjects.forEach((subject) => {
                subject.chapters.forEach((chapter) => {
                    chaptersByNumber[chapter.chapternumber] = chapter
                })
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
    const currentChapter = await getData(params.chapternumber)

    return (
        <>
            <section className='min-h-screen'>
                <h3 className='heading1 mb-4'>{currentChapter.chaptername}</h3>
                <Link href={currentChapter.linktopdf} target='_blank' className='relative w-16 h-16 hover:cursor-pointer block mb-6'>
                    <Image src='/pdfImage.png' fill alt='pdfImage'></Image>
                    <MdDownloadForOffline className='absolute text-green-500 right-1 bottom-0 inline-block w-4 h-4 rounded-full bg-white max-[577px]:right-0' />
                </Link>
                <div>
                    <h3 className='heading2 italic inline-block bg-yellow-400 p-1 mb-2'>Topics Covered:</h3>
                    <ul>
                        {
                            currentChapter.topics.map((item, index) => (
                                <li key={index} className='heading3 text-sm'>&bull; &nbsp;{_.capitalize(item)}</li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Page
