import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import homeCover from '../../assets/cover/homeCover.png';
import Footer from '../../components/Footer/Footer';
import card from '../../assets/cover/2.jpg';
import cover from '../../assets/cover/cover.jpg'
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip, Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                // setLocation(position);
                try {
                    const apiKey = '9c09d04cf46241b98facdb7fd80de5a0'
                    const { latitude, longitude } = position.coords;
                    const response = await axios.get('https://api.geoapify.com/v1/geocode/reverse', {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            apiKey: apiKey
                        }
                    })
                    setAddress(response.data.features[0].properties.formatted);
                } catch (error) {
                    console.log("Geolocation is not supported by this browser.");
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const associtaList = () => {
        navigate('/secured/associate-list')
    }



    const headStyle = {
        fontFamily: 'Oswald'
    }

    const tailStyle = {
        fontFamily: 'Michroma'
    }
    return (
        <>
            <Header />
            <img className='w-full' src={homeCover} alt="home cover" />
            <div className='flex justify-center md:mt-5 sm:mt-1' >
                <p className='md:text-4xl sm:text-md font-serif font-semibold text-blue-900' style={headStyle}>WELCOME &nbsp; TO &nbsp;  HEALTH &nbsp; CARE &nbsp; SOLUTIONS &nbsp; WE &nbsp; CARE &nbsp; FOR &nbsp; YOUR &nbsp;HEALTH</p>
            </div>
            <div className='flex justify-center md:mt-2 sm:mt-1' >
                <p className='md:text-lg sm:text-md font-serif font-semibold text-blue-900' style={tailStyle}>Begin &nbsp; To &nbsp;  Care &nbsp; For &nbsp; Your &nbsp; Beloved &nbsp; One's &nbsp;</p>
            </div>

            <div className='flex flex-wrap md:flex-nowrap space-x-5 m-5 items-center'>
                <div className='w-full md:w-1/2'>
                    <CardHeader floated={false} className="h-auto mb-5">
                        <img src={card} alt="profile-picture" />
                    </CardHeader>
                </div>
                <div className='w-full md:w-1/2'>
                    <Card className="mt-6 w-full">
                        <CardBody>
                            <Typography>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                        </CardBody>
                        <div className='flex items-center mx-6 mb-8 hover:cursor-pointer' onClick={associtaList}>
                            <p className='font-semibold text-blue-900 text-lg'>Book Your Slot</p>
                            <FaArrowRightLong className='w-8 h-5 text-blue-900' />
                        </div>
                    </Card>
                </div>

            </div>
            <div className='flex justify-center md:mt-5 sm:mt-1 mb-3'>
                <p className='md:text-5xl sm:text-md font-serif font-semibold text-blue-900 ' style={headStyle}>PREMIUM &nbsp; CARE &nbsp; AT &nbsp; YOUR &nbsp;DOORSTEP</p>
            </div>
            <div className='flex justify-center md:mt-1 mb-10'>
                <p className='md:text-sm sm:text-md font-serif font-semibold text-blue-900' style={tailStyle}>START &nbsp;&nbsp; BOOKING &nbsp; TO &nbsp; EXPERIENCE &nbsp; THE &nbsp;&nbsp; PREMIUM &nbsp;CARE</p>
            </div>
            <div className='flex mx-10 justify-around gap-5 mb-5'>
                <div className='w-1/3'>
                    <h2 className="text-2xl font-bold text-indigo-800 mb-4" style={headStyle}>Our Service</h2>
                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span>
                </div>
                <div className='w-1/3'>
                    <img src={cover} alt="centre" className='rounded-none' />
                </div>
                <div className='w-1/3'>
                    <h2 className="text-2xl font-bold text-indigo-800 mb-4" style={headStyle}>Our Advice</h2>
                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
                </div>
            </div>
            {address && (
                <div>
                    <p>Address:{address}</p>
                </div>
            )}

            <Footer />

        </>
    )
}




