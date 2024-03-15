import React from 'react'
import { FaUserEdit } from "react-icons/fa";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import homeCover from '../../assets/profile/user.jpg';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';



const Profile = () => {

     

    return (
        <>
            <Header />
            <div className='flex justify-center items-center md:mt-20 mb-10 mx-2'>
                <Card className="w-full max-w-[42rem] flex  md:flex-row mx-6   hover:shadow-2xl border border-gray-400">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-full  md:w-3/5 md:rounded-r-none"
                    >
                        <img
                            src={homeCover}
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                    <CardBody className='w-full'>
                        <Typography variant="h4" color="blue-gray" className="mb-4">
                            Daisy Joe
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                            Date Joined :
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                            Date Joined :
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                            Date Joined :
                        </Typography>
                        <CardFooter className='flex gap-2'>
                            <Button variant="outlined" size='md' className="w-full xs:cover">
                                My bookings
                            </Button>
                            <Button variant='outlined'><FaUserEdit className=' size-5' /></Button>
                        </CardFooter>
                    </CardBody>
                </Card>
            </div>
            <Footer />
        </>
    )
}

export default Profile
