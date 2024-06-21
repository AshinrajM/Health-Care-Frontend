
import { useState } from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import { Button, Card, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import axiosInstance from '../../api/api'


const getBookings = async () => {
    try {
        // const response = await axios.get(`${BASE_URL}/booking/booking-list/`);
        const response = await axiosInstance.get('/booking/booking-list/');
        console.log(response.data, "data"); // Log the data received
        return response.data;

    } catch (error) {
        console.error("Error fetching bookings:", error); // Log the error
        throw error;
    }
};

const BookingsList = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
                    <Typography variant='h2' color='white' className='flex justify-center mb-6'>
                        No Bookings Yet</Typography>
                </div>
            </div>

        )
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    return (

        <div className='bg-blue-gray-500 flex flex-col lg:flex-row h-screen'>

            <div className='md:w-64 md:fixed md:h-full'>
                <SideBar />
            </div>
            <div className='flex-1 overflow-auto p-4 lg:ml-64 md:ml-64'>
                <Typography variant='h2' color='white' className='mb-6 text-center 
                lg:text-left'>Bookings</Typography>
                <Card className='rounded-none bg-gray-100 flex'>
                    <div className='overflow-x-auto '>
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
                                {currentData.map((booking, index) => (
                                    <tr key={index} className='text-black'>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{startIndex + index + 1}</td>
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
                    <div className='flex justify-between px-2 mt-6 mb-2 items-center'>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <GrFormPrevious className='h-6 w-6' />
                        </Button>
                        <Typography variant='body1' color='black' className='mx-4'>
                            {currentPage}/{totalPages}
                        </Typography>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <MdNavigateNext className='h-6 w-6' />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BookingsList