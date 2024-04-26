import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaStar } from "react-icons/fa6";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import { BASE_URL } from '../../api/api';
import axios from 'axios';

const BookingHistory = () => {

  const [user, setUser] = useState()
  const [bookings, setBookings] = useState(null)


  const getBookings = async (userId) => {
    console.log(userId, "active user")
    const response = await axios.get(`${BASE_URL}/booking/bookings?userId=${userId}`)
    if (response.data) {
      console.log(response.data)
      setBookings(response.data.booking)
    }

  }

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      setUser(parsedUser);
      getBookings(parsedUser.id)
    }

  }, [])

  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  console.log(user, "details")
  console.log(bookings, 'booking datas')

  return (
    <div className=''>
      <Header />
      <div className='mx-48 mb-16'>
        {bookings && bookings.map(booking => (
          <Card key={booking.id} className="w-auto mt-12 bg-blue-50">
            <CardBody>
              <div className='flex justify-between mx-5'>
                <Typography variant="h5" color="blue-gray" className="mb-2 ">
                  Associate Name : {booking.associate.name}
                </Typography>
              </div>
              <div className='flex justify-between'>
                <div className='mx-5'>
                  <div className='space-y-2 text-black'>
                    <div className='flex justify-between gap-8'>
                      <Typography variant='paragraph'>
                        Booking ID
                      </Typography>
                      <Typography variant='paragraph'>
                        {booking.booking_id}
                      </Typography>
                    </div>
                    <div className='flex justify-between gap-8'>
                      <Typography variant='paragraph'>
                        Date
                      </Typography>
                      <Typography variant='paragraph'>
                        {formatDate(booking.date)}
                      </Typography>
                    </div>
                    <div className='flex justify-between gap-8'>
                      <Typography variant='paragraph'>
                        Time slot
                      </Typography>
                      <Typography variant='paragraph'>
                        {booking.shift === 'morning' ? '08:00AM - 12:00PM' : booking.shift === 'noon' ? '01:00PM - 05:00PM' : '08:00AM - 05:00PM'}
                      </Typography>
                    </div>
                    <div className='flex justify-between gap-8'>
                      <Typography variant='paragraph'>
                        Fee
                      </Typography>
                      <Typography variant='paragraph'>
                        ₹{booking.amount_paid}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <div className='mx-5'>
                    <div className='flex justify-end items-center gap-2'>
                      <Typography variant="small" color="blue-gray" className="mb-2 ">
                        110 reviews,good
                      </Typography>
                      <Typography className='flex items-center gap-1 text-black text-sm mb-2 '>
                        <FaStar color='yellow' className='w-4 h-4' />
                        <FaStar color='yellow' className='w-4 h-4' />
                        <FaStar color='yellow' className='w-4 h-4' />
                        <FaStar color='yellow' className='w-4 h-4' />
                      </Typography>
                    </div>
                    <div className='flex justify-end'>
                      <Typography className='mb-1 mt-8' variant='paragraph' color='black'>
                        status : confirmed
                      </Typography>
                    </div>
                    <div className='flex gap-3'>
                      <Button color='green' size='sm' className='rounded-xl text-xs px-7'>Message</Button>
                      <Button color='indigo' size='sm' className='rounded-xl text-xs px-4'>Booking Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Footer />
    </div >
  )
}

export default BookingHistory
