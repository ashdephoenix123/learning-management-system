import Link from 'next/link'
import React from 'react'

const Support = () => (
    <div className='card2 mb-4'>
        <h3 className='heading2 mb-2'>Help & Support</h3>
        <p className='flex items-center context1 mb-4'>For any queries, You can raise a ticket from ECS portal.</p>
        {/* <button className='btn w-full '>Launch ECS</button> */}
        <Link href={'/support'} className='btn w-full block text-center'>Launch ECS</Link>
    </div>
)

export default Support
