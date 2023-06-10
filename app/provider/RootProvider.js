'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const RootContextProvider = createContext();

const Provider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [allDetails, setAllDetails] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            //redirect to dashboard
            const checkUser = async () => {
                const res = await fetch('/api/checkUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(token)
                });
                const data = await res.json();
                if (!data.status) {
                    localStorage.removeItem('token');
                    router.push('/');
                }
                if (data.status) {
                    //fetch user info, batch info & course details and save it in context API
                    setAllDetails(data.allDetails);
                    if(pathname === '/' || pathname === '/register' || pathname === '/forgotPassword') {
                        router.push('/dashboard');
                    }
                }
            }
            checkUser();
        } else {
            //redirect to login
            if (pathname === '/register' || pathname === '/forgotPassword') {

            } else {
                router.push('/');
            }
        }
    }, [pathname]);

    // useEffect(() => {
    //     if (allDetails !== null && Object.keys(allDetails).length > 0) {
    //         router.push('/dashboard');
    //     }
    // }, [allDetails]);

    return (
        <RootContextProvider.Provider value={allDetails}>
            {children}
        </RootContextProvider.Provider>
    )
}

export default Provider

export const useRootContext = () => {
    return useContext(RootContextProvider);
}
