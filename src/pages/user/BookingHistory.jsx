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
import backgroundImage from '../../assets/background/3.jpg'

const BookingHistory = () => {

  const [user, setUser] = useState()
  const [bookings, setBookings] = useState(null)
  const [noBookings, setNoBookings] = useState(false)


  const getBookings = async (userId) => {
    console.log(userId, "active user")
    const response = await axios.get(`${BASE_URL}/booking/bookings?userId=${userId}`)
    if (response.data && response.data.booking.length > 0) {
      console.log(response.data)
      setBookings(response.data.booking)
    } else {
      setNoBookings(true)
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

  const style = {
    fontFamily: "Platypi"
  }


  console.log(user, "details")
  console.log(bookings, 'booking datas')

  if (noBookings) {
    return (
      <div>
        <div><Header /></div>
        <div className='flex justify-center m-5'>
          {noBookings && (
            <img src={backgroundImage} alt="No bookings yet" className='rounded-2xl' />
          )}
        </div>
        {noBookings && (
          <div className='absolute bottom-32 left-1/2 transform -translate-x-1/2 flex justify-center items-center'>
          <p className='text-teal-800 text-center text-2xl tracking-widest' style={style}>Start booking for your Loved One's</p>
        </div>
        )}
        <div><Footer /></div>

      </div>
    );

  } else {

    return (
      <div className=''>
        <div className='shadow-md'>
          <Header />
        </div>
        <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-24 xl:mx-48 mb-2'>
          {bookings && bookings.map(booking => (
            <Card key={booking.id} className="w-full sm:w-auto mt-8 bg-blue-50">
              <CardBody>
                <div className='flex justify-end'>
                  <Typography variant="h5" color="blue-gray" className="mb-2" style={style}>
                    Associate: {booking.associate.name}
                  </Typography>
                </div>
                <div className='flex flex-col sm:flex-row justify-between'>
                  <div className='mb-4 sm:mb-0'>
                    <div className='space-y-2 text-black'>
                      <div className='flex justify-between'>
                        <Typography variant='paragraph'>
                          Booking ID
                        </Typography>
                        <Typography variant='paragraph'>
                          {booking.booking_id}
                        </Typography>
                      </div>
                      <div className='flex justify-between'>
                        <Typography variant='paragraph'>
                          Date
                        </Typography>
                        <Typography variant='paragraph'>
                          {formatDate(booking.date)}
                        </Typography>
                      </div>
                      <div className='flex justify-between'>
                        <Typography variant='paragraph'>
                          Time slot
                        </Typography>
                        <Typography variant='paragraph'>
                          {booking.shift === 'morning' ? '08:00AM - 12:00PM' : booking.shift === 'noon' ? '01:00PM - 05:00PM' : '08:00AM - 05:00PM'}
                        </Typography>
                      </div>
                      <div className='flex justify-between'>
                        <Typography variant='paragraph'>
                          Fee
                        </Typography>
                        <Typography variant='paragraph'>
                          ₹{booking.amount_paid}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <div className='mb-4'>
                      <div className='flex justify-end items-center gap-2'>
                        <Typography variant="small" color="blue-gray" className="mb-1">
                          110 reviews, good
                        </Typography>
                        <Typography className='flex items-center gap-1 text-black text-sm mb-2'>
                          <FaStar color='yellow' className='w-4 h-4' />
                          <FaStar color='yellow' className='w-4 h-4' />
                          <FaStar color='yellow' className='w-4 h-4' />
                          <FaStar color='yellow' className='w-4 h-4' />
                        </Typography>
                      </div>
                      <div className='flex justify-end'>
                        <Typography className='mb-1 mt-4' variant='paragraph' color={booking.status === 'confirmed' ? 'blue' : booking.status === 'completed' ? 'green' : 'red'}>
                          Booking {booking.status}
                        </Typography>
                      </div>
                    </div>
                    <div className='flex gap-2 mt-4 justify-end'>
                      <Button color='green' size='sm' className='rounded-md text-xs px-7'>Message</Button>
                      <Button color='indigo' size='sm' className='rounded-md text-xs px-4'>Booking Details</Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className='mt-24'>
          <Footer />
        </div>
      </div>

    )
  }

}

export default BookingHistory
