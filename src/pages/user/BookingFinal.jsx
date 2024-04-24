import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import Header from '../../components/Header/Header';
import { BASE_URL } from '../../api/api'
import { API_URL } from '../../Config/config';
import { toast } from 'react-toastify';
import axios from 'axios';



const BookingFinal = () => {

    const [finalData, setFinalData] = useState('')
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const bookingDatas = localStorage.getItem('bookingDetail')
        const userDatas = localStorage.getItem('userDetails')
        setFinalData(JSON.parse(bookingDatas))
        setUser(JSON.parse(userDatas))
    }, [])


    const cancelBooking = () => {
        localStorage.removeItem("bookingDetail");
        navigate('/secured/associate-list')
    }


    let payable_amount;
    if (finalData && finalData.slot && finalData.slot.associate) {
        payable_amount = finalData.slot.associate.fee_per_hour * (finalData.shift === "full day" ? 8 : 4);
    }

    const values = {
        user_id: user ? user.id : null,
        slot_id: finalData && finalData.slot ? finalData.slot.id : null,
        payable_amount: payable_amount,
        shift: finalData ? finalData.shift : null
    };

    const BookingConfirm = async () => {
        console.log(values, 'values')

        try {
            const response = await axios.post(`${BASE_URL}/booking/checkout`, values)
            const checkoutUrl = response.data.url;
            window.location.href = checkoutUrl;

        } catch (error) {
            toast.error(error, "error found")
        }

    }

    // console.log(userDatas, 'storge')
    console.log(user, "user data")
    console.log(finalData, "final dataas of booking")
    return (
        <div className=''>
            <div className='shadow-md'>
                <Header />
            </div>
            <div className='mx-56'>
                <Card className="mt-10 w-full bg-blue-gray-100 shadow-xl hover:cursor-pointer">
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
                                        {/* {finalData.slot.id} */}
                                    </Typography>
                                </div>
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
                                        User Contact no.
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {finalData.phone}
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
                                        ₹{payable_amount}/-
                                    </Typography>

                                </div>
                            </>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0 w-full flex gap-4">
                        <Button className='w-full bg-red-700' onClick={cancelBooking} >CANCEL</Button>
                        <Button className='w-full bg-blue-800' onClick={BookingConfirm} >Confirm Booking</Button>
                    </CardFooter>
                </Card >
            </div>
        </div>
    )
}

export default BookingFinal