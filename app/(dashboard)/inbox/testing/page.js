'use client';

import React, { useState } from 'react'

const page = () => {

    const [form, setForm] = useState({
        from: '',
        message: ''
    })

    const handleForm = (e)=> {
        const { name, value } = e.target;
        setForm((prev)=> {
            return {
                ...prev,
                [name]: value
            }
        })
    }

  return (
    <form action="">
        <input type="text" name='from' onChange={handleForm} value={form.from} className='border-2'/>
        <input type="text" name='message' onChange={handleForm} value={form.message} className='border-2'/>
    </form>
  )
}

export default page
