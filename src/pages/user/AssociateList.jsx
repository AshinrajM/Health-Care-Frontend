import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import axiosInstance from "../../api/api";
import axios from 'axios';
import { toast } from 'react-toastify';
import backgroundImage from '../../assets/background/3.jpg'
import Skeleton from 'react-loading-skeleton';
import NurseCard from '../../components/Cards/NurseCard';
import { LiaWalkingSolid } from "react-icons/lia";


const AssociateList = () => {


    const [noSlot, setNoSlot] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const currentDate = new Date();

    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 1)

    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7);




    useEffect(() => {
        const allAvailablilty = async () => {
            try {
                // const response = await axios.get(`${BASE_URL}/booking/available-associates`);
                const response = await axiosInstance.get('/booking/available-associates');
                console.log(response.data, "repsonse data main")
                setLoading(false)
                if (response.data && response.data.length > 0) {
                    console.log(response.data.length, "repsonse data main2")
                } else {
                    console.log("check in else in main 3")
                    setNoSlot(true)
                }
            } catch (error) {
                setLoading(false)
                toast.error("error found")
            }
        }
        allAvailablilty()
    }, [])

    const textStyle = {
        fontFamily: "Afacad",
        fontSize: '16px',
        fontWeight: '550',
    }


    return (
        <>
            {loading ? (
                <>
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
                </>
            ) : (
                <>
                    {noSlot ? (
                        <>
                            <div><Header /></div>
                            <div className='flex justify-center m-5'>
                                {noSlot && (
                                    <>
                                        <div className='flex flex-col gap-5 '>
                                            <div className='flex mb-5'>

                                                <div className='self-center '>
                                                    <LiaWalkingSolid className='w-52 h-52 ' color='gray' />
                                                </div>
                                                <div className='self-center '>
                                                    <LiaWalkingSolid className='w-52 h-52 ' color='gray' />
                                                </div>
                                            </div>
                                            <p className='text-2xl tracking-widest mb-0 text-gray-600'
                                                style={textStyle}>There is no  slots available Everybody is busy. Try again Later</p>
                                            <Button className='mb-3 tracking-widest' color='gray'
                                                onClick={(e) => navigate('/')} style={{ wordSpacing: '1rem' }}
                                            >Try again later</Button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div><Footer /></div>
                        </>
                    ) : (
                        <>
                            <div className='shadow-md'>
                                <Header />
                            </div>
                            {/* <div>
                                <Card className="mt-6 bg-green-300  shadow-xl rounded-none">
                                    <CardBody className='flex space-x-5 items-center justify-center'>
                                        <div >
                                            <Input size="md" label="date" color='black' type='date'
                                                min={minDate.toISOString().split('T')[0]}
                                                max={maxDate.toISOString().split('T')[0]} />
                                        </div>
                                        <div >
                                            <p className='text-black'> Fee/Hour: ₹ {fee}</p>
                                            <input type="range" min={0} max={1000} value={fee} step={100} className='range range-primary' onChange={(e) => setFee(parseInt(e.target.value))} />
                                        </div>
                                        <div >
                                         <p className='text-black'>Experience : {exp}yrs</p>
                                            <input type="range" min={0} max={5} value={exp} step={1} className='range range-primary' onChange={(e) => setExp(parseInt(e.target.value))} />
                                        </div>
                                        <div className='flex space-x-2'>
                                            <Radio color='green' name='color' label="Morning" />
                                            <Radio color='red' name='color' label="Noon" />
                                            <Radio color='indigo' name='color' label="Fullday" />
                                        </div>
                                        <div className=''>
                                            <Button variant='outlined' className='hover:bg-black hover:text-white rounded-md' onClick={(e) => setSearch(!search)}>Search</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div> */}

                            <div >
                                <div className='ml-8 flex flex-col  justify-center mt-10'>
                                    <Typography variant='h2' color='indigo' className='text-center'>Associates Available</Typography>
                                    <Typography color='indigo' className='text-sm text-center'>Choose your dates & confirm your bookings</Typography>
                                </div>
                                <NurseCard />
                            </div>

                            <div className='mt-24'>
                                <Footer />
                            </div>
                        </>
                    )
                    }
                </>
            )}

        </>
    )
}

export default AssociateList