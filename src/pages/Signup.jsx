import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { FaGooglePlusG } from "react-icons/fa";
import React from 'react'

export default function Signup() {
    return (
        // <Page backgroundImage="src/assets/abc/3.jpg">

        <div className='max-w-lg mx-auto bg-transparent backdrop-blur shadow-md rounded-2xl m-10 p-10'>
            <h1 className='text-3xl text-center text-light-blue-900 underline-offset-auto font-semibold my-5'>Sign Up</h1>
            <form className='flex flex-col gap-3'>
                <input type="text" placeholder='Enter Username' id='username' className='border border-gray-400 focus:ring-1 focus:outline-none focus:ring-orange-200 p-2 rounded-lg' />
                <input type="email" placeholder='Enter Email' id='email' className='border border-gray-400 focus:ring-1 focus:outline-none focus:ring-orange-200 p-2 rounded-lg' />
                <input type="password" placeholder='Enter password' id='password' className='border border-gray-400 focus:ring-1 focus:outline-none focus:ring-orange-200  p-2 rounded-lg' />
                <input type="password" placeholder='Confirm password' id='confirm_password' className='border border-gray-400 focus:ring-1 focus:outline-none focus:ring-orange-200 p-2 rounded-lg ' />
                <div className='flex justify-between space-x-5 mb-2'>
                    <Button className='bg-blue-700 rounded-3xl w-full'>Sign Up</Button>
                    <Button className='bg-red-800 rounded-3xl w-full flex items-center justify-center'><FaGooglePlusG size={20} /></Button>
                </div>

            </form>
            <div className='flex gap-3 my-3'>
                <p>Aleready have an account  ?</p>
                <Link to='/sign-in'>
                    <p className='text-primaryColor'>Log in</p>
                </Link>
            </div>
        </div>
        // </Page>
    )
}
