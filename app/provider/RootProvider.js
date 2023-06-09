'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const Provider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

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
                if(data.status && (pathname === '/' || pathname === '/register' || pathname === '/forgotPassword')){
                    router.push('/dashboard');
                }
            }
            checkUser();
        } else {
            //redirect to login
            if(pathname === '/register' || pathname === '/forgotPassword'){
                
            } else {
                router.push('/');
            }
        }
    }, [pathname])
    return (
        <>
            <section>
                {children}
            </section>
        </>
    )
}

export default Provider
