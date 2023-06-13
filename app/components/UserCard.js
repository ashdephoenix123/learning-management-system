import Image from 'next/image'
import React from 'react'
import _ from 'lodash'

const UserCard = ({ students }) => {

    return (

        <>
            <div className="project-lists">

                {
                    students?.map((eachStudent, index) => {
                        return <div key={index} className="card2 font1">
                            <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px]">
                                <Image className="card-img object-cover" src="/me2.jpg" alt="proj9" fill></Image>
                            </figure>
                            <div className='py-2'>
                                <p className='text-center text-sm'>{_.capitalize(eachStudent.fname)} {_.capitalize(eachStudent.lname)}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </>

    )
}

export default UserCard

/* <Link key={index} href={`/users/${eachStudent.enrollmentNumber}`} className="card2 font1">
                            <figure className="mx-auto my-3 relative overflow-hidden rounded-full h-[150px] w-[150px] max-[577px]:w-[120px] max-[577px]:h-[120px]">
                                <Image className="card-img object-cover" src="/me2.jpg" alt="proj9" fill></Image>
                            </figure>
                            <div className='py-2'>
                                <p className='text-center text-sm'>{eachStudent.fname} {eachStudent.lname}</p>
                            </div>
                        </Link> */