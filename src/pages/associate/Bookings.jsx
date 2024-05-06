import React, { useEffect, useState } from 'react'
import { Card, Typography, useAccordion } from "@material-tailwind/react";
import SideBarAssociate from '../../components/SideBarAssociate/SideBarAssociate';
import axios from 'axios';
import { BASE_URL } from '../../api/api';

const Bookings = () => {

    const [bookings, setBookings] = useState(null)
    const [noBooking, setNoBooking] = useState(false)

    const TABLE_HEAD = ['', "Booking Id", "Username", "Date", "Shift", "Location", 'status'];

    const getBookings = async (Id) => {
        console.log("object", Id)
        try {
            const response = await axios.get(`${BASE_URL}/booking/associate-booking?associateId=${Id}`)
            console.log(response, "sacgub")
            if (response.data && response.data.length > 0) {
                console.log(response.data, "booking data")
                setBookings(response.data)
            } else {
                setNoBooking(true)
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }

    useEffect(() => {
        const data = localStorage.getItem('associate')
        const associate = JSON.parse(data)
        if (associate) {
            console.log(associate.id, "data")
            getBookings(associate.id)
        }

    }, [])

    return (
        <div className='bg-brown-200 w-full flex h-screen'>
            <div className=''>
                <SideBarAssociate />
            </div>
            {noBooking ? (
                <div className='pl-64 w-full justify-center mx-5 mt-5 flex justify-center'>
                    <Typography variant='h2' color='black' className='mt-7 mb-5'>No BOOKINGS Yet</Typography>
                </div>
            ) : (


                <div className='pl-64 w-full justify-center mx-5 mt-5'>
                    <Typography variant='h2' color='black' className='mt-7 mb-5'>BOOKINGS</Typography>
                    <div className='overflow-y-auto max-h-96'>

                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {bookings && bookings.map(({ user_email, status, date, shift, location, booking_id }, index) => {
                                    const isLast = index === bookings.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    const nameBeforeAt = user_email.split('@')[0];

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {index + 1}
                                                    {/* Displaying serial number (index + 1) */}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {booking_id}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {nameBeforeAt}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {date}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {shift}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {location}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {status}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}

        </div>
    )
}

export default Bookings