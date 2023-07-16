import React from 'react'
import _ from 'lodash'
import ProfileCard from '@/app/components/profileCard'
import connectDB from '@/app/database/connection'
import Teacher from '@/app/database/model/teachersmodel';

async function getData(id) {
    await connectDB();
    const fetchTeacher = await Teacher.findOne({ id })
    return fetchTeacher;
}

const page = async ({ params }) => {
    const fetchUserData = await getData(params.userid)
    const { fname, lname, image,  email, designation } = fetchUserData;

    return (
        <div className='min-h-screen rounded'>
            <ProfileCard fname={fname} lname={lname} image={image} designation={designation} batchFullName={"batchFullName"} email={email} />
        </div>
    )
}

export default page
