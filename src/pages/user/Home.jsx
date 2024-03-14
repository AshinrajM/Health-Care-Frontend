import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import homeCover from '../../assets/cover/homeCover.png';
import Footer from '../../components/Footer/Footer';
import card from '../../assets/cover/2.jpg';
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip, Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {

    return (
        <>
            <Header />
            <img className='w-full' src={homeCover} alt="home cover" />
            <div className='flex justify-center md:mt-5 sm:mt-1'>
                <p className='md:text-2xl sm:text-md font-serif font-semibold text-blue-900'>WELCOME &nbsp; TO &nbsp;  HEALTH &nbsp; CARE &nbsp; SOLUTIONS &nbsp; WE &nbsp; CARE &nbsp; FOR &nbsp; YOUR &nbsp;HEALTH</p>
            </div>
            <div className='flex space-x-5 m-5 items-center'>
                <div className='w-1/2'>
                    <CardHeader floated={false} className="h-auto mb-5">
                        <img src={card} alt="profile-picture" />
                    </CardHeader>
                </div>
                <div className='w-1/2'>
                    <Card className="mt-6 w-full">
                        <CardBody>
                            <Typography>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                        </CardBody>
                        <div className='flex items-center mx-6 mb-8 '>
                            <p className='font-semibold text-blue-900 text-lg'>Book Your Slot</p>
                            <FaArrowRightLong className='w-8 h-5 text-blue-900' />
                        </div>
                    </Card>
                </div>

            </div>
            <div className='flex justify-center md:mt-5 sm:mt-1'>
                <p className='md:text-2xl sm:text-md font-serif font-semibold text-blue-900'>PREMIUM &nbsp;&nbsp; CARE &nbsp; CARE &nbsp; AT &nbsp; WE &nbsp;&nbsp; YOUR &nbsp;DOORSTEP</p>
            </div>
            <div className='flex justify-center md:mt-1'>
                <p className='md:text-md sm:text-md font-serif font-semibold text-blue-900'>START &nbsp;&nbsp; BOOKING &nbsp; TO &nbsp; EXPERIENCE &nbsp; THE &nbsp;&nbsp; PREMIUM &nbsp;CARE</p>
            </div>
            <div className='flex mx-12 gap-5 space-x-8 m-10'>
                <div className='w-1/3'>
                    <CardHeader floated={false} className="h-auto mb-5">
                        <img src={card} alt="profile-picture" />
                    </CardHeader>
                </div>
                <div className='w-1/3'>
                    <CardHeader floated={false} className="h-auto mb-5">
                        <img src={card} alt="profile-picture" />
                    </CardHeader>
                </div>
                <div className='w-1/3'>
                    <CardHeader floated={false} className="h-auto mb-5">
                        <img src={card} alt="profile-picture" />
                    </CardHeader>
                </div>
            </div>
            <Footer />

        </>
    )
}




