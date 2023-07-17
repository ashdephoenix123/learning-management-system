'use client';

import UserCard from '@/app/components/UserCard';
import { useRootContext } from '@/app/provider/RootProvider';
import React, { useEffect, useState } from 'react'
import Loading from '@/app/loading';

const page = () => {
    const allDetails = useRootContext();
    const { userDetails: { coursecode } } = allDetails || { userDetails: { coursecode: '' } };
    const { batchDetails: { batchCode } } = allDetails || { batchDetails: { batchCode: '' } };
    const [allBatchTeachers, setAllBatchTeachers] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (allBatchTeachers.length > 0) return;
        const fetchBatchUsers = async () => {
            const res = await fetch(`/api/findAllTeachers?coursecode=${coursecode}&batchcode=${batchCode}`);
            const data = await res.json();       
            if(data.status){
                console.log(data.teachers)
                setAllBatchTeachers(data.teachers)
            } else {
                console.log(data.error);
            }
        }
        fetchBatchUsers();
        setLoading(false)
    }, [allBatchTeachers])


    return (
        <div className='min-h-screen card2'>
            <h3 className='heading1'>Teachers</h3>

            {
                loading ? <Loading />
                    :

                    allBatchTeachers && <UserCard userdata={allBatchTeachers} />

            }
        </div>
    )
}

export default page
