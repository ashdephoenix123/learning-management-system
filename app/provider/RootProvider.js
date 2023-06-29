'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'


export const RootContextProvider = createContext();
// export const ShareProgress = createContext();

const Provider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [allDetails, setAllDetails] = useState(null);
    const [progress, setProgress] = useState(0)
    const [userDetailsFetched, setUserDetailsFetched] = useState(false);

    useEffect(() => {
        console.log(userDetailsFetched)
        const token = JSON.parse(localStorage.getItem('token'));
        setProgress(10)
        if (token) {
            //redirect to dashboard
            const checkUser = async () => {
                setProgress(20)
                const res = await fetch('/api/checkUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(token)
                });
                setProgress(40)
                const data = await res.json();

                setProgress(100)
                if (!data.status) {
                    localStorage.removeItem('token');
                    router.push('/');
                }
                if (data.status) {
                    if (pathname === '/' || pathname === '/register' || pathname === '/forgotPassword') {
                        router.push('/dashboard');
                    }
                    //fetch user info, batch info & course details and save it in context API
                    if (!userDetailsFetched) {
                        // Fetch user info, batch info & course details and save it in context API
                        setAllDetails(data.allDetails);
                        setUserDetailsFetched(true); // Set the state variable to indicate userDetails have been fetched
                    }
                }
            }
            checkUser();
        } else {
            setProgress(100)
            //redirect to login
            if (pathname === '/register' || pathname === '/forgotPassword') {

            } else {
                router.push('/');
            }
        }
    }, [pathname]);

    return (
        <RootContextProvider.Provider value={allDetails}>
            {/* <ShareProgress.Provider value={{progress, setProgress}} > */}
            <LoadingBar
                color='#fff'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            {children}
            {/* </ShareProgress.Provider> */}
        </RootContextProvider.Provider>
    )
}

export default Provider

export const useRootContext = () => {
    return useContext(RootContextProvider);
}

