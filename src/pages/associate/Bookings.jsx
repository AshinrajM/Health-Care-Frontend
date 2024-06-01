import React, { useEffect, useState } from 'react'
import {
    Button, Typography, Dialog, DialogHeader, DialogBody,
    DialogFooter, Radio
} from "@material-tailwind/react";
import { LuMessagesSquare } from "react-icons/lu";
import SideBarAssociate from '../../components/SideBarAssociate/SideBarAssociate';
import axios from 'axios';
import { BASE_URL } from '../../api/api';
import outlined from '@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Bookings = () => {

    const [bookings, setBookings] = useState(null)
    const [noBooking, setNoBooking] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = useState('confirmed');

    const navigate = useNavigate()



    const TABLE_HEAD = ['', "Booking Id", "Username", "Date", "Shift", "Chat", 'status', "update status"];

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

    const sendMessage = (id, role) => {
        console.log(id, role, "user id and role")
        navigate(`/associates/check/associate-chat?id=${id}&role=${role}`)
    }


    const handleUpdateStatus = async (booking_id) => {

        const values = {
            bookingId: booking_id,
            updatedStatus: selectedStatus
        }
        console.log(values, "sending values")
        try {
            const response = await axios.patch(`${BASE_URL}/booking/associate-booking`, values)
            if (response.status === 200) {
                setOpen(!open)
                toast.success("booking updated")
            }

        } catch (error) {
            console.log(error)
            setOpen(!open)
            toast.error("found error, try again")

        }
    }

    const handleCancel = () => {
        setSelectedStatus('confirmed');
        setOpen(!open)
    }

    return (
        <div className='bg-brown-200 w-full flex h-screen'>
            <div className=''>
                <SideBarAssociate />
            </div>
            {noBooking ? (
                <div className='pl-64 w-full justify-center mx-5 mt-5 flex '>
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
                                {bookings && bookings.map(({ user_email, status, date, shift, user, booking_id }, index) => {
                                    const isLast = index === bookings.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                    const nameBeforeAt = user_email.split('@')[0];

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal "
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

                                            {status === 'confirmed' ? (
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        <Button color='green' size='sm' variant={outlined}
                                                            onClick={(e) => sendMessage(user, 'user')}><LuMessagesSquare className='w-8 h-5' /></Button>
                                                    </Typography>
                                                </td>
                                            ) : (
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal">Session completed
                                                    </Typography>
                                                </td>
                                            )}

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {status}
                                                </Typography>
                                            </td>
                                            {status === 'confirmed' ? (
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        <Button variant='outlined'
                                                            onClick={() => setOpen(!open)}>Update status</Button>

                                                    </Typography>

                                                </td>
                                            ) : (<td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    NA
                                                </Typography>

                                            </td>

                                            )}

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>

                </div>
            )}
            {bookings && bookings.map(({ booking_id }, index) => (

                <div key={index}>
                    <Dialog open={open} >
                        <DialogHeader>Update Booking Status</DialogHeader>
                        <DialogBody>
                            This is the final procedure about bookings <br />
                            {booking_id} - update booking status here
                            <div className="flex gap-10">
                                <Radio name="type" label="confirmed" color='blue'
                                    onChange={() => setSelectedStatus('confirmed')} defaultChecked />
                                <Radio name="type" label="completed" color='green'
                                    onChange={() => setSelectedStatus('completed')} />
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="outlined"
                                color="red"
                                onClick={handleCancel}
                                className="mr-2 hover:bg-red-700 hover:text-white"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="outlined" color="green"
                                className='hover:bg-green-700 hover:text-white'
                                onClick={() => handleUpdateStatus(booking_id)}
                                disabled={selectedStatus !== 'completed'}>
                                <span>Update</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </div>

            ))}

        </div>

    )
}

export default Bookings