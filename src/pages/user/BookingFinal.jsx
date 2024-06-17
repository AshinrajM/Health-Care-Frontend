import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();



    // here have to find whcih slot is selected using date

    useEffect(() => {
        const bookingDatas = location.state;
        console.log("datas", bookingDatas)
        const userDetailsString = localStorage.getItem('userDetails');
        const parsedUserData = userDetailsString ? JSON.parse(userDetailsString) : null;
        setUser(parsedUserData); // Set userData state

        if (bookingDatas) {
            setFinalData(bookingDatas);
        }
    }, [location.state])

    const cancelBooking = () => {
        navigate('/secured/associate-list')
    }


    console.log("final data and user", finalData, user)

    let payable_amount;
    if (finalData) {
        payable_amount = finalData.associate.fee_per_hour * (finalData.shift === "fullday" ? 8 : 4);
    }


    const date = finalData.date
    let slotId

    const handleDateClick = (date) => {
        if (finalData.associate && finalData.associate.slots) {
            const slotObj = finalData.associate.slots.find(slot => slot.date === date);
            if (slotObj) {
                slotId = slotObj.id
                console.log(slotObj, "show date with slot Object");
            } else {
                console.log('No slot found for the given date');
            }
        } else {
            console.log('Associate or slots are undefined');
        }
    };
    if (finalData) {
        handleDateClick(date)
    }
    console.log(slotId, "slotId")

    const values = {
        user_id: user ? user.id : null,
        slot_id: slotId,
        payable_amount: payable_amount,
        shift: finalData ? finalData.shift : null,
        location: finalData ? finalData.location : null,
        // phone: finalData ? finalData.phone : null
    };
    console.log(values, 'values sending')


    const BookingConfirm = async () => {

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
                        {/* {finalData && finalData.associate && finalData.associate.slot && ( */}
                        {finalData && (
                            <>
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Associate Name
                                    </Typography>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {finalData.associate.name}
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
                                        {finalData.date}
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
                                <hr className='border border-b-gray-900 mb-5' />
                                <div className='flex justify-between'>
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        Fee
                                    </Typography>
                                    <div className='flex'>
                                        <Typography variant="h6" color="blue-gray" className="">
                                            ₹{finalData.associate.fee_per_hour}/Hr
                                        </Typography>
                                        <Typography variant="h6" color="red" className="mb-3 items-end ">
                                            &nbsp;x{finalData.shift === "fullday" ? 8 : 4}
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
                        <Button className='w-1/2 bg-red-700 rounded-none' onClick={cancelBooking} >CANCEL</Button>
                        <button className="Btn2 w-1/2 " onClick={BookingConfirm}>
                            Pay
                            <svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                        </button>
                        {/* <Button className='w-full bg-green-900' onClick={BookingConfirm} >Confirm Booking</Button> */}

                    </CardFooter>
                </Card >
            </div>
        </div>
    )
}

export default BookingFinal