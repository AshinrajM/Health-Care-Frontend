import React, { useEffect, useState } from 'react'
import { Card, CardBody, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import { SlCalender } from "react-icons/sl";
import { FaStar } from "react-icons/fa6";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import { BASE_URL } from '../../api/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegMessage } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";



const BookingHistory = () => {


  const [user, setUser] = useState()
  const [bookings, setBookings] = useState(null)
  const [noBookings, setNoBookings] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  const navigate = useNavigate()

  const handleOpenAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleOpen = (booking) => {
    setSelectedBooking(booking)
    setOpen(!open);
  }

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

  const handleBookingCancel = async (booking_id) => {
    const bookingId = booking_id
    const userId = user.id
    const values = {
      bookingId: bookingId,
      userId: userId
    }
    try {
      const response = await axios.patch(`${BASE_URL}/booking/cancel-booking/`, values)
      if (response.status === 200) {
        console.log(response.data, "received response")
        getBookings(user.id)
      }
      setOpen(!open)
    } catch (error) {
      console.log("error found", error);
      setOpen(!open)
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

  const sendMessage = (id, role) => {
    console.log(id, role, "hey check")
    const url = `/secured/chat?id=${id}&role=${role}`;
    navigate(url);
  };




  const style = {
    fontFamily: "Cinzel",
    fontWeight: 400,

  }


  console.log(user, "details")
  console.log(bookings, 'booking datas')

  if (noBookings) {
    return (
      <div>
        <div><Header /></div>
        <div className='flex justify-center m-5'>
          {noBookings && (
            <div className='flex flex-col gap-5 '>
              <div className='self-center mb-6'>
                <SlCalender className='w-52 h-52 ' color='gray' />
              </div>
              <p className='text-2xl tracking-widest mb-2 text-gray-600' style={style}>There is no  bookings yet. Start Booking today</p>
              <Button className='mb-5 tracking-widest' color='gray' onClick={(e) => navigate('/secured/associate-list')}>Start Booking</Button>
            </div>

          )}
        </div>
        <div><Footer /></div>

      </div>
    );

  } else {

    return (
      <div className=''>
        <div className='shadow-md'>
          <Header />
        </div>

        <>
          <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-24 xl:mx-48 mb-5 mt-10 '>
            {bookings && bookings.map((booking, index) => (
              <Accordion
                key={index}
                open={openAccordion === index}
                className="mb-2 rounded-lg bg-blue-50 px-4"
              >
                <div className='flex flex-col sm:flex-row justify-between'>
                  <AccordionHeader className='flex justify-start'
                    onClick={() => handleOpenAccordion(index)}>
                    <Typography style={style} color='black'>
                      Booking ID :: {booking.booking_id}
                    </Typography>
                  </AccordionHeader>
                  <AccordionHeader className='flex justify-end items-center gap-2'
                    onClick={() => handleOpenAccordion(index)}>
                    <Typography color="black" className="mb-2 sm:mb-0" style={style}>
                      Associate : {booking.associate.name}
                    </Typography>
                    <p className='opacity-70'><FaDotCircle className='w-3 h-4' color={booking.status === 'confirmed' ? 'green' : 'red'} /></p>
                  </AccordionHeader>
                </div>
                <AccordionBody className="text-black flex flex-col sm:flex-row justify-between">
                  <div className='w-full sm:w-1/2 space-y-2'>
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
                  <div className='w-full sm:w-1/2 flex flex-col'>


                    <div className='flex justify-end items-center gap-2'>
                      <Typography className='flex items-center gap-1 text-black text-sm mb-2'>
                        <FaStar color='yellow' className='w-4 h-4' />
                        <FaStar color='yellow' className='w-4 h-4' />
                        <FaStar color='yellow' className='w-4 h-4' />
                        <FaStar color='yellow' className='w-4 h-4' />
                      </Typography>
                    </div>
                    <div className='flex justify-end items-center gap-2'>
                      <Typography variant="small" color="blue-gray" className="mb-1">
                        110 reviews, good
                      </Typography>
                    </div>
                    <div className='flex justify-end'>
                      <Typography className='mb-1 mt-4 sm:mt-0' variant='paragraph'
                        color={booking.status === 'confirmed' ? 'blue' : booking.status === 'completed' ? 'green' : 'red'}>
                        Booking {booking.status}
                      </Typography>
                    </div>
                    <div className='flex gap-2 mt-4 justify-end'>
                      {booking.status === 'confirmed' ? (
                        <>
                          <Button color='green' size='sm' className='rounded-md text-xs px-2'
                            onClick={() => sendMessage(booking.associate.user, 'associate')}>
                            <FaRegMessage className='w-6 h-6 p-1' />
                          </Button>
                          <Button color='red' variant='gradient' size='sm' className='rounded-md text-xs px-3' onClick={() => handleOpen(booking)}>Cancel Booking</Button>
                        </>
                      ) : null}

                      {/* <Button color='indigo' size='sm' className='rounded-md text-xs px-3'>Details</Button> */}

                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
            ))}
          </div>
        </>
        <div className='mt-20'>
          <Footer />
        </div>

        <>
          <Dialog open={open}>
            <DialogHeader>Are sure on Cancelling this Order</DialogHeader>
            <DialogBody>
              Twenty five years of {selectedBooking?.booking_id}
              blood sweat and tears, and I&apos;m never giving up, I&apos;m just
              getting started. I&apos;m up to something. Fan luv. <br />
              <p className='mt-10'>nb: 10% of the booking amount will be deducted</p>
            </DialogBody>
            <DialogFooter className='gap-5'>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1">
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green"
                onClick={() => handleBookingCancel(selectedBooking?.booking_id)}>
                <span>Confirm </span>
              </Button>
            </DialogFooter>
          </Dialog>
        </>

      </div >

    )
  }

}

export default BookingHistory


{/* <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-24 xl:mx-48 mb-2'>
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
                        <Typography className='mb-1 mt-4' variant='paragraph'
                          color={booking.status === 'confirmed' ? 'blue' : booking.status === 'completed' ? 'green' : 'red'}>
                          Booking {booking.status}
                        </Typography>
                      </div>
                    </div>
                    <div className='flex gap-2 mt-4 justify-end'>
                      {booking.status === 'confirmed' ? (
                        <>
                          <Button color='green' size='sm' className='rounded-md text-xs px-7'
                            onClick={() => sendMessage(booking.associate.user, 'associate')}>Message</Button>
                          <Button color='red' variant='gradient' size='sm' className='rounded-md
                           text-xs px-7' onClick={handleOpen}>Cancel Booking</Button>
                        </>
                      ) : (null)}
                      <Button color='indigo' size='sm' className='rounded-md text-xs px-4'>Booking Details</Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div> */}