'use client';

import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiFillPushpin } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

const Todo = () => {
    const [todo, setTodo] = useState([])
    const [todoInput, setTodoInput] = useState('')
    const [showInput, setShowInput] = useState(false)

    const todoInputValue = (e) => {
        const { value } = e.target;
        setTodoInput(value);
    }

    const deleteTodo = (index) => {
        const newTodo = [...todo].filter((_, i) => i !== index);
        setTodo(newTodo);
        localStorage.setItem('todo', JSON.stringify(newTodo));
    }

    const addToTodoList = () => {
        localStorage.setItem('todo', JSON.stringify([...todo, todoInput]));
        setTodo([...todo, todoInput]);
        setTodoInput('');
        setShowInput(false);
    }

    useEffect(() => {
        const todoList = localStorage.getItem('todo');
        if (todoList) {
            setTodo(JSON.parse(todoList));
        }
    }, [])
    return (
        <div className='card2 mb-4'>
            <div className='flex items-center justify-between'>
                <h3 className='heading2'>To-do</h3>
                <span className='rounded-full p-1 hover:bg-gray-200 cursor-pointer'>
                    <AiOutlinePlus onClick={() => setShowInput(prev => !prev)} />
                </span>
            </div>
            {
                showInput &&
                <>
                    <div className='flex flex-col mt-2'>
                        <input type="text" name='todoInput' value={todoInput} onChange={todoInputValue} className='w-full outline-none input1 text-black px-1.5 py-1' placeholder='Add a todo' />
                        <button className='btn2 self-end' onClick={addToTodoList}>Add</button>
                    </div>
                </>
            }
            <ul className='mt-2'>
                {
                    todo.length !== 0 ? todo.map((item, index) => {
                        return <li key={index} className='my-0.5 flex items-center group'><AiFillPushpin className='mr-2 text-red-600' />{item} <MdDelete className='ml-2 text-red-600 cursor-pointer hidden group-hover:block' onClick={() => deleteTodo(index)} /></li>

                    }) : <li className='my-0.5 flex items-center'>No Items.</li>
                }
            </ul>

        </div>
    )
}

export default Todo
