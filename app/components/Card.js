import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Card = () => {
    return (
        <>
            <main className="project-lists">
                <Link href='/' className="card font1">
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
                <Link href='/' className="card font1">
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
                <Link href='/' className="card font1">
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
                <Link href='/' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/4.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>04. </span>IT Project Management</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>
                <Link href='/' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/8.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>05. </span>Artificial Intelligence & Machine Learning</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>
                <Link href='/' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/6.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>06. </span>Defensive Cyber Security Technologies</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>
                <Link href='/' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/10.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>07. </span>Big Data Analytics</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>

                <Link href='/' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/11.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>08. </span>Internet of Things</h3>
                        <p className='mb-1 text-gray-200'>COMAS23</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>
                <Link href='/' className="card font1">
                    <figure className="card-figure relative h-[15rem] w-full">
                        <Image className="card-img" src="/12.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12"><span>09. </span>Webinar</h3>
                        <p className='mb-1 text-gray-200'>WEBINAR</p>
                        <p className='mb-2 text-gray-200'>When: 1 Apr - 31 Dec 2023</p>
                        <p className='text-right fontsz3 text-gray-200'>1 lesson</p>
                    </div>
                </Link>
            </main>
        </>
    )
}

export default Card
