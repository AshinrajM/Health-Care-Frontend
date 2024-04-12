import React from 'react'
import { useSearchParams } from 'react-router-dom';
const BookingSuccess = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    let session_id = searchParams.get("session_id")
    console.log(searchParams.get("session_id"))


    return (
        <div className='w-full h-screen bg-green-500'>

            <div>BookingSuccess</div>

        </div>
    )
}

export default BookingSuccess