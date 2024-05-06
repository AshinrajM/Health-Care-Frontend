import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Card, CardBody, CardFooter, Typography, Button, Input, Radio, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { BASE_URL } from "../../api/api";
import axios from 'axios';
import { toast } from 'react-toastify';
import backgroundImage from '../../assets/background/3.jpg'



const AssociateList = () => {

    const [exp, setExp] = useState(0);
    const [fee, setFee] = useState(0);
    const [openDetail, setOpenDetail] = useState(false)
    const [openBooking, setOpenBooking] = useState(false)
    const [availabilityData, setAvailabilityData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedOption, setSelectedOption] = useState('');
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [noSlot, setNoSlot] = useState(false)

    const navigate = useNavigate();



    const handleOpenBooking = (data) => {
        console.log(data, "data")
        setSelectedCard(data)
        setOpenBooking(!openBooking)

    }

    const handleOpenDetail = () => {
        setOpenDetail(!openDetail);
    }

    const currentDate = new Date();

    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 1)

    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };


    const isFormValid = location.trim() !== '' && phone.trim() !== '' && selectedOption !== '';

    const confirm = () => {
        if (!isFormValid) {
            return;
        }

        const bookingDetail = {
            location: location,
            phone: phone,
            shift: selectedOption,
            slot: selectedCard
        }
        localStorage.setItem("bookingDetail", JSON.stringify(bookingDetail));

        setOpenBooking(!openBooking)

        navigate('/secured/checkout');
    }

    useEffect(() => {
        const allAvailablilty = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/available-list/`);
                if (response.data && response.data.length > 0) {
                    setAvailabilityData(response.data)
                    toast.success("successfully rendered")
                    console.log(response.data.length, "repsonse data")
                } else {
                    setNoSlot(true)
                }
            } catch (error) {
                toast.error("error found")
            }
        }
        allAvailablilty()
    }, [])

    const dialogStyle = {
        fontFamily: "Jersey 25",
        fontSize: '20px',
        fontWeight: '550',
    }


    const textStyle = {
        fontFamily: "Afacad",
        fontSize: '14px',
        fontWeight: '550',
    }
    return (
        <>
            {noSlot ? (
                <>
                    <div><Header /></div>
                    <div className='flex justify-center m-5'>
                        {noSlot && (
                            <img src={backgroundImage} alt="No bookings yet" className='rounded-2xl' />
                        )}
                    </div>
                    {noSlot && (
                        <div className='absolute bottom-32 left-1/2 transform -translate-x-1/2 flex justify-center items-center'>
                            <p className='text-teal-800 text-center text-2xl tracking-widest'>Every One is taking Service <br /> Please wait.....</p>
                        </div>
                    )}
                    <div><Footer /></div>
                </>
            ) : (
                <>
                    <div className='shadow-md'>
                        <Header />
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <hr className='mt-5 mx-10' />
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {availabilityData.map((data) => (
                            <div key={data.id}>
                                <Card className="m-5 w-72  hover:shadow-xl hover:scale-110 duration-200" >
                                    <CardBody>
                                        <Typography variant="h5" color="indigo" className="mb-2"
                                            style={{ fontFamily: 'Krona One', textTransform: 'uppercase' }}>
                                            {data.associate.name}
                                        </Typography>
                                        <div className='px-3 ' >
                                            <div className='flex justify-between text-black'>
                                                <Typography className='self-end ' style={textStyle}>
                                                    Age
                                                </Typography>
                                                <Typography className='' style={textStyle}>
                                                    &nbsp; {data.associate.age}Yrs
                                                </Typography>
                                            </div>
                                            <div className='flex justify-between text-black'>
                                                <Typography className='self-end' style={textStyle}>
                                                    Experience
                                                </Typography>
                                                <Typography style={textStyle}>
                                                    &nbsp; {data.associate.experience}Yrs
                                                </Typography>
                                            </div>
                                            <div className='flex justify-between text-black' >
                                                <Typography className='self-end' style={textStyle}>
                                                    Fee per hour
                                                </Typography>
                                                <Typography style={textStyle}>
                                                    &nbsp; ₹{data.associate.fee_per_hour}
                                                </Typography>
                                            </div>
                                            <div className='flex justify-between text-black' >
                                                <Typography className='self-end' style={textStyle}>
                                                    Date
                                                </Typography>
                                                <Typography style={textStyle}>
                                                    &nbsp; {data.date}
                                                </Typography>
                                            </div>
                                            <div className='flex justify-between text-black' >
                                                <Typography className='self-end' style={textStyle}>
                                                    Morning(08:00-12:00)
                                                </Typography>
                                                <Typography style={textStyle}>
                                                    &nbsp; {data.is_morning ? "Available" : "Not Available"}
                                                </Typography>
                                            </div>
                                            <div className='flex justify-between text-black' >
                                                <Typography className='self-end' style={textStyle}>
                                                    Noon(01:00-05:00)
                                                </Typography>
                                                <Typography style={textStyle}>
                                                    &nbsp; {data.is_noon ? "Available" : "Not Available"}
                                                </Typography>
                                            </div>
                                            <div className='flex justify-between text-black' >
                                                <Typography className='self-end' style={textStyle}>
                                                    User rating
                                                </Typography>
                                                <Typography className='flex items-center'>
                                                    <FaStar color='yellow' className='w-4 h-4' />
                                                    <FaStar color='yellow' className='w-4 h-4' />
                                                    <FaStar color='yellow' className='w-4 h-4' />
                                                    <FaStar color='yellow' className='w-4 h-4' />
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <CardFooter className="pt-0 space-x-2 flex">
                                        <Button variant='outlined' color='green' className='hover:bg-green-700 hover:text-white text-green-700 w-full' onClick={() => handleOpenBooking(data)}>Book</Button>
                                        <Button variant='outlined' color='indigo' className='w-full hover:bg-indigo-700 hover:text-white' onClick={handleOpenDetail}>Details</Button>
                                    </CardFooter>
                                </Card>
                            </div >
                        ))}
                    </div >

                    <Dialog open={openDetail} handler={handleOpenDetail}>
                        <DialogHeader>Anwar Ali</DialogHeader>
                        <Typography>Description</Typography>
                        <DialogBody>
                            The key to more success is to have a lot of pillows. Put it this way,
                            it took me twenty five years to get these plants, twenty five years of
                            blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                            getting started. I&apos;m up to something. Fan luv.
                        </DialogBody>
                        <Typography>Service policy</Typography>
                        <DialogBody>
                            The key to more success is to have a lot of pillows. Put it this way,
                            it took me twenty five years to get these plants, twenty five years of
                        </DialogBody>
                        <hr className='mx-10 border border-black' />
                        <Typography>Ratings & Reviews</Typography>
                        <DialogBody>
                            The key to more success is to have a lot of pillows. Put it this way,
                            it took me twenty five years to get these plants, twenty five years of
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpenDetail}
                                className="mr-1"
                            >
                                <span>Close</span>
                            </Button>
                            {/* <Button variant="gradient" color="green" onClick={handleOpenDetail}>
                        <span>Confirm Booking</span>
                    </Button> */}
                        </DialogFooter>
                    </Dialog>

                    <Dialog open={openBooking}>
                        <DialogHeader style={dialogStyle}>Confirm Selection</DialogHeader>
                        <DialogBody className='space-y-5 text-black'>
                            <div className='flex justify-between'>
                                <Typography variant=''>Associate:</Typography>
                                <Typography variant='h6' color='gray'>{selectedCard?.associate.name}</Typography>
                            </div>
                            <div className='flex justify-between'>
                                <Typography>Date:</Typography>
                                <Typography variant='paragraph'>{selectedCard?.date}</Typography>
                            </div>
                            <div className='flex justify-between'>
                                <Typography>Fee per hour </Typography>
                                <Typography>{selectedCard?.associate.fee_per_hour}</Typography>
                            </div>
                            <div className='flex justify-between'>
                                <Typography>shift :</Typography>
                                <div className=''>
                                    <div className="flex items-center">
                                        {selectedCard?.is_morning ?
                                            <Radio
                                                color="green"
                                                name="shift"
                                                value="morning"
                                                checked={selectedOption === "morning"}
                                                onChange={() => handleOptionChange("morning")}
                                                label="Morning"
                                            />
                                            : null}
                                        {selectedCard?.is_noon ?
                                            <Radio
                                                color="red"
                                                name="shift"
                                                value="noon"
                                                checked={selectedOption === "noon"}
                                                onChange={() => handleOptionChange("noon")}
                                                label="Noon"
                                            />
                                            : null}
                                        {selectedCard?.is_morning && selectedCard?.is_noon ?
                                            <Radio
                                                color="indigo"
                                                name="shift"
                                                value="fullday"
                                                checked={selectedOption === "fullday"}
                                                onChange={() => handleOptionChange("fullday")}
                                                label="Full Day"
                                            />
                                            : null}
                                    </div>

                                </div>
                            </div>
                            {/* <Typography>{selectedCard?.is_morning ? "Morning" : null}{selectedCard?.is_morning && selectedCard?.is_noon ? "," : null}{selectedCard?.is_noon ? "Noon" : null}</Typography> */}

                            <div>
                                <Input label='Enter location' value={location} onChange={(e) => setLocation(e.target.value)} required />

                            </div>
                            <div>
                                <Input label='Enter mobile number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                        </DialogBody>
                        <DialogFooter className='gap-5'>
                            <Button variant="text" color="red" onClick={() => setOpenBooking(!openBooking)}>
                                Cancel
                            </Button>
                            {/* <Button variant="gradient" color="green" onClick={() => setOpenBooking(!openBooking)}> */}
                            <Button variant="gradient" color="green" onClick={confirm} disabled={!isFormValid}>
                                Confirm Booking
                            </Button>
                        </DialogFooter>
                    </Dialog>


                    <div className='mt-24'>
                        <Footer />
                    </div>
                </>
            )
            }
        </>
    )
    // }
}

export default AssociateList