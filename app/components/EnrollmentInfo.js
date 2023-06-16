import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

const EnrollmentInfo = ({ enrolledOn = "Enrolled Date" }) => {
    return (
        <div className='card2 mb-4'>
            <h3 className='heading2 mb-2'>Status</h3>
            <p className='flex items-center context1'><FaUserAlt className='mr-2' size={10} /> <span>
                Enrolled: {new Date(enrolledOn).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span></p>
        </div>
    )
}

export default EnrollmentInfo
