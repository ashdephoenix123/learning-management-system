import React from 'react'
import { FcSpeaker } from 'react-icons/fc'

const Announcement = () => {
    return (
        <div className='card2'>
            <h3 className='heading2 mb-2'>Announcements</h3>
            <p className='flex items-center context1'><FcSpeaker className='mr-2' size={15} /> <span>
                None
            </span></p>
        </div>
    )
}

export default Announcement
