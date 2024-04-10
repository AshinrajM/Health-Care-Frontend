import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import Header from '../../components/Header/Header';

const BookingFinal = () => {

    const [finalData, setFinalData] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const bookingDatas = localStorage.getItem('bookingDetail')
        setFinalData(JSON.parse(bookingDatas))
    }, [])

    const cancelBooking = () => {
        localStorage.removeItem("bookingDetail");
        navigate('/secured/associate-list')
    }

    console.log(finalData, "final dataas of booking")
    return (
        <div className='bg-blue-50 h-screen'>
            <div className='bg-blue-100'>
                <Header />
            </div>
            <div className='mx-40'>
                <Card className="mt-10 w-full ">
                    <CardBody>
                        <div className='flex justify-center'>
                            <Typography variant="h3" color="blue-gray" className="mb-2">
                                Booking Confirm
                            </Typography>
                        </div>
                        <br />
                        {finalData && finalData.slot && finalData.slot.associate && (
                            <>
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Associate Name
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {finalData.slot.associate.name}
                                    </Typography>
                                </div>
                                {/* <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">

                                        User Name
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Shukkur
                                    </Typography>
                                </div> */}
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Location
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {finalData.location}
                                    </Typography>
                                </div>
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Date
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {finalData.slot.date}
                                    </Typography>
                                </div>
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Shift
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {finalData.shift}
                                    </Typography>
                                </div>
                                <br />
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Fee
                                    </Typography>
                                    <div className='flex'>
                                        <Typography variant="h6" color="blue-gray" className="">
                                            ₹{finalData.slot.associate.fee_per_hour}/Hr
                                        </Typography>
                                        <Typography variant="h6" color="red" className="mb-3 items-end ">
                                            &nbsp;x{finalData.shift === "full day" ? 8 : 4}
                                        </Typography>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Payable Amount
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        ₹{finalData.slot.associate.fee_per_hour * (finalData.shift === "full day" ? 8 : 4)}/-
                                    </Typography>

                                </div>
                            </>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0 w-full flex gap-4">
                        <Button className='w-full bg-red-700' onClick={cancelBooking} >CANCEL</Button>
                        <Button className='w-full bg-blue-800' >Confirm Booking</Button>
                    </CardFooter>
                </Card >
            </div>
        </div>
    )
}

export default BookingFinal