import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import { Button, Card, Typography } from '@material-tailwind/react'
import { BASE_URL } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const getBookings = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/booking/booking-list/`);
        // if (response.data && response.data.length > 0) {

        console.log(response.data, "data"); // Log the data received
        return response.data;

    } catch (error) {
        console.error("Error fetching bookings:", error); // Log the error
        throw error;
    }
};

const BookingsList = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['bookings'],
        queryFn: getBookings,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error has occurred: {error.message}</div>;
    if (!data || data.length === 0) {
        return (
            <div className='bg-blue-gray-500 flex flex-col lg:flex-row'>
                <div className='lg:w-64 flex-none'>
                    <SideBar />
                </div>
                <div className='flex-1 justify-center mx-16 mt-10'>
                    <Typography variant='h2' color='white' className='flex justify-center mb-6'>No Bookings Yet</Typography>
                </div>
            </div>

        )
    }

    return (

        <div className='bg-blue-gray-500 flex flex-col lg:flex-row h-screen'>
            
            <div className='md:w-64 md:fixed md:h-full'>
                <SideBar />
            </div>
            <div className='flex-1 overflow-auto p-4 lg:ml-64 md:ml-64'>
                <Typography variant='h2' color='white' className='mb-6 text-center lg:text-left'>Bookings</Typography>
                <Card className='rounded-none bg-gray-100 flex'>
                    <div className='overflow-x-auto'>
                        <table className='text-black w-full'>
                            <thead className='text-black'>
                                <tr className='text-black'>
                                    <th className='p-2'></th>
                                    <th className='p-2'>Booking Id</th>
                                    <th className='p-2'>User</th>
                                    <th className='p-2 hidden sm:table-cell'>Amount Paid</th>
                                    <th className='p-2 hidden sm:table-cell'>Date</th>
                                    <th className='p-2 hidden sm:table-cell'>Shift</th>
                                    <th className='p-2 hidden sm:table-cell'>Associate</th>
                                    <th className='p-2'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='text-black'>
                                {data.map((booking, index) => (
                                    <tr key={index} className='text-black'>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{booking.booking_id}</td>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{booking.user_email.split('@')[0]}</td>
                                        <td className='p-2 hidden sm:table-cell' style={{ textAlign: 'center' }}>{booking.amount_paid}</td>
                                        <td className='p-2 hidden sm:table-cell' style={{ textAlign: 'center' }}>{new Date(booking.date).toLocaleDateString('en-GB')}</td>
                                        <td className='p-2 hidden sm:table-cell' style={{ textAlign: 'center' }}>{booking.shift}</td>
                                        <td className='p-2 hidden sm:table-cell' style={{ textAlign: 'center' }}>{booking.associate_name}</td>
                                        <td className='p-2' style={{
                                            textAlign: 'center',
                                            color: booking.status === "completed" ? "green" :
                                                booking.status === "confirmed" ? "blue" : "red"
                                        }}>
                                            {booking.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BookingsList