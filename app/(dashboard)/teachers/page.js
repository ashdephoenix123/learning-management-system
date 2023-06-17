'use client';

import UserCard from '@/app/components/UserCard';
import { useRootContext } from '@/app/provider/RootProvider';
import React, { useEffect, useState } from 'react'
import Loading from '@/app/loading';

const page = () => {
    const allDetails = useRootContext();
    const { batchDetails: { batchCode } } = allDetails || { batchDetails: { batchCode: '' } };
    const [allBatchUsers, setAllBatchUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (allBatchUsers.length > 0) return;
        const fetchBatchUsers = async () => {
            const res = await fetch('/api/fetchAllUsers', { cache: 'no-store' });
            const data = await res.json();
            const filteredUsers = data.users?.filter((batchUsers) => {
                return batchUsers.batchCode === batchCode
            })
            setAllBatchUsers(filteredUsers)
        }
        fetchBatchUsers();
        setLoading(false)
    }, [allBatchUsers])


    return (
        <div className='min-h-screen card2'>
            <h3 className='heading1'>Teachers</h3>

            {
                loading ? <Loading />
                    :

                    allBatchUsers && <UserCard students={allBatchUsers} />

            }
        </div>
    )
}

export default page
