import React, { useEffect, useState } from 'react'
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Header from '../../components/Header/Header'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BASE_URL } from '../../api/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';



const BookingSuccess = () => {

    const navigate = useNavigate()

    const [booking, setBooking] = useState(null)
    const [secondsLeft, setSecondsLeft] = useState(20);


    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails')
        if (userDetails) {
            const user = JSON.parse(userDetails);
            console.log(user.id);
            bookingDetails(user.id)
        }
    }, [])

    const bookingDetails = async (userId) => {
        console.log(userId, "from useeff")
        try {
            const response = await axios.get(`${BASE_URL}/booking/latest-booking?userId=${userId}`)
            if (response.data) {
                console.log(response.data, "booking")
                setBooking(response.data.booking)
                // setSlot(response.data.slot)
                toast.success("success")

                const timer = setInterval(() => {
                    setSecondsLeft(prevSeconds => prevSeconds - 1);
                }, 1000);

                // Clear the interval when component unmounts
                return () => clearInterval(timer);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("failed")
        }
    }

    useEffect(() => {
        if (secondsLeft === 0) {
            navigate('/')
            setBooking(null);
        }
    }, [secondsLeft]);

    console.log(booking, "book")

    return (

        <div className=''>
            <div className='shadow-lg'>
                <Header />
            </div>
            {booking && (
                <div className='justify-center mx-40 mt-14'>
                    <Card className="w-full shadow-xl bg-gray-200">
                        <CardBody className=''>
                            <div className='flex justify-center'>
                                <Typography variant='h3'>
                                    Booking successful
                                </Typography>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <IoMdCheckmarkCircleOutline className='w-48 h-48 text-green-600' />
                            </div>
                            <div className='mt-10'>
                                <ul className='flex justify-around gap-5 list-none text-black'>
                                    <li>Service date: {format(new Date(booking.date), 'dd-MM-yyyy')}</li>
                                    <li>Associate:{booking?.associate_name}</li>
                                    <li>Amount paid: ₹{booking?.amount_paid}</li>
                                    <li>Shift:{booking?.shift}</li>
                                </ul>
                            </div>
                            <div className='flex justify-around gap-5 mt-5'>
                                <Button className='bg-red-700 rounded-none'>Home</Button>
                                <Button className='bg-green-700 rounded-none'>Booking History</Button>
                            </div>
                            <div className=' flex justify-around'>
                                <div className='flex justify-center mt-5'>
                                    <span>© copyright protected</span>
                                </div>
                                <div className='flex justify-center mt-5'>
                                    <span>redirecting to home in: {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft} seconds</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default BookingSuccess