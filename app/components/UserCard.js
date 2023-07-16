import Image from 'next/image'
import React from 'react'
import _ from 'lodash'
import Link from 'next/link'

const UserCard = ({ userdata }) => {

    return (

        <>
            <div className="project-lists">

                {
                    userdata?.map((individual, index) => {
                        return <Link href={individual.enrollmentNumber ? `users/${individual._id}` : `teachers/${individual._id}`} key={index} className="card2 font1">
                            <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px] border border-gray-300">
                                {
                                    individual.image ?
                                        <Image className="card-img object-cover" src={individual.image} alt="userImage" fill></Image> : <Image className="card-img object-cover" src="/userImage.jpg" alt="proj9" fill></Image>
                                }
                            </figure>
                            <div className='pt-2'>
                                <p className='text-center text-sm'>{_.capitalize(individual.fname)} {_.capitalize(individual.lname)}</p>
                            </div>
                            
                            {
                                !userdata[0].enrollmentNumber && <div className='text-center '>
                                    <p className='font-bold'>Course Name</p>
                                </div>
                            }

                        </Link>
                    })
                }
            </div>
        </>

    )
}

export default UserCard