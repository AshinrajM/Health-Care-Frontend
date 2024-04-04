import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import {
    Card, CardBody, CardFooter, Typography, Button, Input, Radio, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { BASE_URL } from '../../Api/Api';
import axios from 'axios';
import { toast } from 'react-toastify';


const AssociateList = () => {

    const [exp, setExp] = useState(0);
    const [fee, setFee] = useState(0);
    const [open, setOpen] = useState(false)
    const [availabilityData, setAvailabilityData] = useState([]);

    const handleOpen = () => setOpen(!open);

    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 1)
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7);




    useEffect(() => {
        const allAvailablilty = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/slot`);
                setAvailabilityData(response.data)
                toast.success("successfully rendered")
                console.log(response.data)
            } catch (error) {
                toast.error("error found")
            }
        }
        allAvailablilty()
    }, [])


    const textStyle = {
        fontFamily: "Afacad",
        fontSize: '14px',
        fontWeight: '550',
    }


    return (
        <>
            <div>
                <Header />
            </div>
            {/* {availabilityData.map((dataItem) => ( */}
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
                {/* {search && (
                    <p>
                        Search result: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla ac efficitur justo. Integer sit amet tincidunt urna, vel finibus orci.
                        <a className='text-blue-800' onClick={(e)=>{setSearch(!search)}}>Clear</a>
                    </p>
                )} */}
                <hr className='mt-5 mx-10' />
            </div>
            <div className="flex flex-wrap justify-center">
                {availabilityData.map((data) => (
                    <div key={data.id}>
                        <Card className="m-5 w-72  hover:shadow-xl hover:scale-110 duration-200" >
                            <CardBody>
                                <Typography variant="h5" color="indigo" className="mb-2" style={{ fontFamily: 'Krona One' }}>
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
                                            &nbsp; ${data.associate.fee_per_hour}
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
                                </div>

                            </CardBody>
                            <CardFooter className="pt-0 space-x-2 flex">
                                <Button variant='outlined' color='green' className='hover:bg-green-700 hover:text-white text-green-700 w-full'>Book</Button>
                                <Button variant='outlined' color='indigo' className='w-full hover:bg-indigo-700 hover:text-white' data-dialog-target="dialog" onClick={handleOpen}>Details</Button>
                            </CardFooter>
                        </Card>
                    </div >
                ))}
            </div >
            <Dialog open={open} handler={handleOpen}>
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
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm Booking</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default AssociateList