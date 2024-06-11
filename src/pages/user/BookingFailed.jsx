import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { FcCancel } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const BookingFailed = () => {

    navigate = useNavigate()


    return (
        <>
            <div className='flex flex-col'>
                <div><Header /></div>
                <div className='flex flex-col'>
                    <FcCancel className='h-24 w-24' />
                    <Button onClick={() => navigate('/')} variant='filled' color='blue-gray' >Home</Button>
                </div>
                <div><Footer /></div>
            </div>

        </>
    )
}

export default BookingFailed