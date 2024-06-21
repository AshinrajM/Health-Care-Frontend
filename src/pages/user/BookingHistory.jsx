import React, { useEffect, useState } from 'react'
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { SlCalender } from "react-icons/sl";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import axiosInstance from '../../api/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegMessage } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { toast } from "react-toastify";


const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '5rem',
    padding: '10px',
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};


function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};



const BookingHistory = () => {


  const [user, setUser] = useState()
  const [bookings, setBookings] = useState(null)
  const [noBookings, setNoBookings] = useState(false)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [rating, setRating] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const bookingsPerPage = 5;



  const navigate = useNavigate()

  const handleOpenAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleOpen = (booking) => {
    setSelectedBooking(booking)
    setOpen(!open);
  }

  const handleReviewModal = (booking) => {
    setSelectedBooking(booking)
    setOpen2(!open2);
  }
  const handleClose = () => {
    setRating(null)
    setOpen2(!open2);
  }

  const handleRating = async (bookingId) => {
    const datas = {
      bookingId: bookingId,
      rating: rating
    }
    try {
      // const response = await axios.post(`${BASE_URL}/booking/add-rating`, datas)
      const response = await axios.post('/booking/add-rating', datas)
      setOpen2(!open2)
      console.log("object", response.data)
      toast.success(response.data.message)
      getBookings(user.id)

    } catch (error) {
      setOpen2(!open2)
      console.log("object", error)
    }
  }

  const getBookings = async (userId, page = 1) => {
    console.log(userId, "active user")
    // const response = await axios.get(`${BASE_URL}/booking/bookings?userId=${userId}`)
    const response = await axiosInstance.get(`/booking/bookings?userId=${userId}&page=${page}`);
    console.log("check resaponse pagination", response.data)
    if (response.data) {
      setBookings(response.data.booking.results);
      setTotalPages(Math.ceil(response.data.booking.count / bookingsPerPage));
      setNoBookings(response.data.booking.results.length === 0);
    } else {
      setNoBookings(true)
    }

  }


  console.log("chek state bookings", bookings)

  const handleBookingCancel = async (booking_id) => {
    const bookingId = booking_id
    const userId = user.id
    const values = {
      bookingId: bookingId,
      userId: userId
    }
    try {
      // const response = await axios.patch(`${BASE_URL}/booking/cancel-booking/`, values)
      const response = await axiosInstance.patch('/booking/cancel-booking/', values)
      if (response.status === 200) {
        console.log(response.data, "received response")
        getBookings(user.id)
        console.log("response", response.data)
        toast.success(response.data.success)
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
      // getBookings(parsedUser.id)
      getBookings(parsedUser.id, currentPage)
    }

  }, [currentPage])


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


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
      <div>
        <div className='shadow-sm'>
          <Header />
        </div>

        <>
          <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-24 xl:mx-48 mb-12 mt-20 '>
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
                    <p className='opacity-70'>
                      <FaDotCircle
                        className='w-3 h-4'
                        style={{ color: booking.status === 'completed' ? 'green' : booking.status === 'confirmed' ? 'blue' : booking.status === 'cancelled' ? 'red' : 'gray' }}
                      />
                    </p>
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
                    </div>
                    <div className='self-end'>
                      {
                        booking.status === 'completed' && !booking.rating?.rating_value ? (
                          <Button
                            color='yellow'
                            className='rounded-md text-xs px-2 tracking-wider p-3'
                            onClick={() => handleReviewModal(booking)}
                          >
                            Add rating
                          </Button>
                        ) : null
                      }
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
            ))}
          </div>


          <div className='flex justify-center mt-2'>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1} className='rounded-full'>
              <GrLinkPrevious className='h-6 w-6' />
            </Button>
            <span className='mx-4 mt-2 text-center'>{currentPage} / {totalPages}</span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages} className='rounded-full'>
              <GrLinkNext className='h-6 w-6' />
            </Button>
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
                // onClick={handleOpen}
                onClick={() => setOpen(!open)}
                className="mr-1">
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green"
                onClick={() => handleBookingCancel(selectedBooking?.booking_id)}>
                <span>Confirm </span>
              </Button>
            </DialogFooter>
          </Dialog>
          <Dialog open={open2}>
            <DialogHeader>Rate the Service by {selectedBooking?.associate.name}</DialogHeader>
            <DialogBody className='flex flex-col gap-5'>
              <StyledRating className='self-center'
                name="highlight-selected-only"
                defaultValue={2}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
              />
              {/* <p>value:{rating}</p> */}
            </DialogBody>
            <DialogFooter className='gap-5'>
              <Button
                variant="text"
                color="red"
                onClick={() => handleClose()}
                className="mr-1">
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green"
                onClick={() => handleRating(selectedBooking?.booking_id)}>
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