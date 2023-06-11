import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
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

    const currentChapter = data.chapters.filter((chapter) => {
        return chapter.chapternumber === Number(params.chapternumber)
    })[0];

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
                            currentChapter.topics.map((item, index) => {
                                return <li key={index} className='heading3 text-sm'>&bull; &nbsp;{_.capitalize(item)}</li>
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default page
