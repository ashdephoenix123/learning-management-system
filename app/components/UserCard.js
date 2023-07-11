import Image from 'next/image'
import React from 'react'
import _ from 'lodash'
import Link from 'next/link'

const UserCard = ({ students }) => {

    return (

        <>
            <div className="project-lists">

                {
                    students?.map((eachStudent, index) => {
                        return <Link href={`users/${eachStudent._id}`} key={index} className="card2 font1">
                            <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px] border border-gray-300">
                                {
                                    eachStudent.image ?
                                        <Image className="card-img object-cover" src={eachStudent.image} alt="userImage" fill></Image> : <Image className="card-img object-cover" src="/userImage.jpg" alt="proj9" fill></Image>
                                }
                            </figure>
                            <div className='py-2'>
                                <p className='text-center text-sm'>{_.capitalize(eachStudent.fname)} {_.capitalize(eachStudent.lname)}</p>
                            </div>
                        </Link>
                    })
                }
            </div>
        </>

    )
}

export default UserCard