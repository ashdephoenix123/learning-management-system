import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = () => {

    return (
        <section className='min-h-screen'>
            <div className="project-lists2">
                <Link href='/programInformation/handbook' className="card font1">
                    <figure className="card-figure relative h-[10rem] w-full">
                        <Image className="card-img" src="/15.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12">Handbook</h3>
                    </div>
                </Link>

                <Link href='/programInformation/calendarofevents' className="card font1">
                    <figure className="card-figure relative h-[10rem] w-full">
                        <Image className="card-img" src="/15.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12">Calendar of Events</h3>
                    </div>
                </Link>

                <Link href='/programInformation/faqs' className="card font1">
                    <figure className="card-figure relative h-[10rem] w-full">
                        <Image className="card-img" src="/15.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12">FAQs</h3>
                    </div>
                </Link>

                <Link href='/programInformation/importantannouncements' className="card font1">
                    <figure className="card-figure relative h-[10rem] w-full">
                        <Image className="card-img" src="/15.jpg" alt="proj9" fill></Image>
                    </figure>
                    <div className="card-info tracking-tight">
                        <h3 className="fontsz1 h-12">Important Announcements</h3>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default page
