import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from '../../components/Header/Header'
import homeCover3 from '../../assets/cover/3.jpg'
import homeCover13 from '../../assets/cover/13.jpg'

import homeCover10 from '../../assets/cover/cover1.webp'
import homeCover11 from '../../assets/cover/cover2.webp'
import homeCover12 from '../../assets/cover/cover3.webp'


import Skeleton from 'react-loading-skeleton'
import icon from '../../assets/homePageIcons/landing-custom-icon-1.png'
import icon2 from '../../assets/homePageIcons/landing-custom-icon-2.png'
import icon3 from '../../assets/homePageIcons/landing-custom-icon-5.png'
import Footer from '../../components/Footer/Footer';

import axios from 'axios';

export default function Home() {

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const apiKey = '9c09d04cf46241b98facdb7fd80de5a0';
                    const { latitude, longitude } = position.coords;
                    const response = await axios.get('https://api.geoapify.com/v1/geocode/reverse', {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            apiKey: apiKey
                        }
                    });
                    setAddress(response.data.features[0].properties.formatted);
                    setLoading(false);
                } catch (error) {
                    console.log("Geolocation is not supported by this browser.");
                    setLoading(false);
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            setLoading(false);
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

    const mapStyle = {
        border: 0,
        width: '100%',
        height: '450px',
    };


    if (loading) {
        return (
            <div >
                <div className='relative'>
                    <div className='absolute inset-0 z-10'>
                        <Header />
                    </div>
                    <Skeleton height={100} width="100%" />
                </div>
                <div className='flex justify-center mt-1 md:mt-5'>
                    <Skeleton height={50} width={300} />
                </div>
                <div className='flex justify-center mt-1 md:mt-2'>
                    <Skeleton height={20} width={200} />
                </div>
                <div className='flex flex-wrap md:flex-nowrap space-x-5 m-5 items-center'>
                    <div className='w-full md:w-1/2'>
                        <Skeleton height={300} />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <Card className="mt-6 w-full">
                            <CardBody>
                                <Skeleton count={5} />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }



    return (
        <div >
            <div className='relative' >
                <div className='absolute inset-0 z-10'>
                    <Header />
                </div>

                <Carousel showThumbs={false} infiniteLoop autoPlay>
                    <div>
                        <img className='object-cover w-full' style={{ height: '100vh' }} src={homeCover10} alt="home cover 1" />
                    </div>
                    <div>
                        <img className='object-cover w-full ' style={{ height: '100vh' }} src={homeCover11} alt="home cover 2" />
                    </div>
                    <div>
                        <img className='object-cover w-full' style={{ height: '100vh' }} src={homeCover12} alt="home cover 3" />
                    </div>
                </Carousel>

            </div>
            <div className='flex justify-center mt-1 md:mt-5'>
                <p className='text-md md:text-4xl font-serif font-semibold text-blue-900' style={headStyle}>
                    <span className='mx-1 md:mx-2'>WELCOME</span>
                    <span className='mx-1 md:mx-2'>TO</span>
                    <span className='mx-1 md:mx-2'>HEALTH</span>
                    <span className='mx-1 md:mx-2'>CARE</span>
                    <span className='mx-1 md:mx-2'>SOLUTIONS</span>
                    <span className='mx-1 md:mx-2'>WE</span>
                    <span className='mx-1 md:mx-2'>CARE</span>
                    <span className='mx-1 md:mx-2'>FOR</span>
                    <span className='mx-1 md:mx-2'>YOUR</span>
                    <span className='mx-1 md:mx-2'>HEALTH</span>
                </p>
            </div>

            <div className='flex justify-center mt-1 md:mt-2'>
                <p className='text-xs md:text-lg font-serif font-semibold text-blue-900' style={tailStyle}>
                    Begin &nbsp; To &nbsp; Care &nbsp; For &nbsp; Your &nbsp; Beloved &nbsp; One's &nbsp;
                </p>
            </div>

            <div className='flex flex-wrap md:flex-nowrap space-x-5 m-5 items-center'>
                <div className='w-full md:w-1/2'>
                    <CardHeader floated={false} className=" mb-5 ">
                        <img src={homeCover3} alt="profile-picture" className='opacity-90' />
                    </CardHeader>
                </div>
                <div className='w-full md:w-1/2'>
                    <Card className="mt-6 w-full">
                        <CardBody>
                            <Typography className='text-xl' style={{ fontFamily: 'Playball' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Typography>
                        </CardBody>
                        <div className='flex items-center mx-6 mb-8 hover:cursor-pointer' onClick={associtaList}>
                            <p className='font-semibold text-blue-900 text-xl' style={{ fontFamily: 'Playball' }}>Book Your Slot</p>
                            <FaArrowRightLong className='w-8 h-5 text-blue-900' />
                        </div>
                    </Card>
                </div>

            </div>

            <div className="min-h-screen flex flex-col lg:flex-row items-center p-12"
                style={{ backgroundColor: 'rgb(0,36,107)' }}>
                <div className="max-w-4xl mx-auto text-left lg:w-1/2 w-full mb-8 lg:mb-0">
                    <div className='container flex flex-col items-center text-left gap-y-5'>
                        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Book Your Slot Today </h1>
                        <p className="text-white text-xl mb-8" style={{ fontFamily: 'Playball' }}>
                            Build your online store with WooCommerce — the most popular WordPress plugin that lets you create a digital shop for free!
                            Build your online store with WooCommerce — the most popular WordPress plugin that lets you create a digital shop for free!
                        </p>
                        <Button variant='text' size='lg' color='white' className='bg-white
                         text-blue-900  rounded-none hover:bg-blue-gray-200' onClick={associtaList}>
                            start booking
                        </Button>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full px-5">
                    <img src={homeCover13} alt="" className="w-full h-full object-contain opacity-70 rounded-sm" />
                </div>
            </div>



            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold text-blue-900 mb-6" style={headStyle}>OUR SERVICES</h1>
                        <p className="text-blue-900 mb-8 text-2xl" style={{ fontFamily: 'Playball' }}>
                            Full of flexible options and practical elements, HouseMed lets you effortlessly customize and control each and every detail of your website with complete ease.
                            Full of flexible options and practical elements, HouseMed lets you effortlessly customize and control each and every detail of your website with complete ease.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-transparent rounded-lg p-6 flex flex-col items-center">
                            <img src={icon} alt="Friendly Support" className="w-28 h-28 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900">Friendly Support</h3>
                            <p className="text-blue-900 text-center">In case you have any questions or In case you have any questio</p>
                        </div>
                        <div className="bg-transparent rounded-lg p-6 flex flex-col items-center">
                            <img src={icon2} alt="SEO Optimized" className="w-28 h-28 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900">SEO Optimized</h3>
                            <p className="text-blue-900 text-center">Made using the best coding practices.Made using the best coding practices</p>
                        </div>
                        <div className="bg-transparent rounded-lg p-6 flex flex-col items-center">
                            <img src={icon3} alt="Drag-And-Drop" className="w-28 h-28 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900">Drag-And-Drop</h3>
                            <p className="text-blue-900 text-center">WPBakery Page Builder plugin included WPBakery Page Builder plugin included</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* {address && (
                <div>
                    <p>Address:{address}</p>
                </div>
            )} */}


            <div className='flex flex-col md:flex-row '>
                <div className='w-full md:w-1/2 p-6 md:p-14' style={{ backgroundColor: 'rgb(154,0,1)' }}>
                    <h2 className="text-2xl font-bold text-white mb-4 leading-tight tracking-wider"
                        style={headStyle}>OUR PHILOSOPHY</h2>
                    <div className='mt-5'>
                        <span className='text-white py-5 text-xl leading-relaxed tracking-wider'
                            style={{ fontFamily: 'Playball' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </span><br />
                    </div>
                    <div className='mt-5'>
                        <span className='text-white leading-relaxed text-xl tracking-wider'
                            style={{ fontFamily: 'Playball' }}>
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </span>
                    </div>
                </div>
                <div className='w-full md:w-1/2'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3904.8586291483566!2d75.53919308650603!3d11.845167850562483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1716487828123!5m2!1sen!2sin"
                        style={{ border: 0, width: '100%', height: '100%', minHeight: '450px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>


            <Footer />

        </div>
    )
}




