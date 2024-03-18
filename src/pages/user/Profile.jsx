import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import {
    Card, CardHeader, CardBody, CardFooter, Typography, Button, Input, Dialog, DialogFooter
}
    from "@material-tailwind/react";
import homeCover from '../../assets/profile/user.jpg';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';



const Profile = () => {

    const [user, setUser] = useState(null);
    const [dob, setDob] = useState('')
    const [location, setLocation] = useState('')
    const [picture, setPicture] = useState(null)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "date_of_birth") {
            setDob(value)
        } else if (name === 'location') {
            setLocation(value)
        } else if (name === 'profile_picture') {
            setPicture(files[0])
        }
    }
    const handleSubmit = (e) => {
        console.log(dob, picture, location, "form data on updating")
    }

    useEffect(() => {
        const data = localStorage.getItem('userDetails')
        if (data) {
            const userDetails = JSON.parse(data)
            setUser(userDetails)
            setDob(userDetails.date_of_birth)
            setLocation(userDetails.location)
            setPicture(userDetails.profile_picture)
        }
    }, [])
    console.log(user, "check")
    return (
        <>
            <Header />
            {(user &&
                <div className='flex justify-center items-center md:mt-20 mb-10 mx-2'>
                    <Card className="w-full max-w-[42rem] flex  md:flex-row mx-6 hover:shadow-2xl border border-gray-400">
                        <CardHeader
                            shadow={false}
                            floated={false}
                            className="m-0 w-full  md:w-3/5 md:rounded-r-none"
                        >
                            {user.profile_picture ? (
                                <img
                                    src={user.profile_picture}
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />) : (
                                <img
                                    src={homeCover}
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </CardHeader>
                        <CardBody className='w-full'>
                            <Typography variant="h4" color="blue-gray" className="mb-4">
                                {user.email}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                date of birth : {user.date_of_birth}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                Location : {user.location}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                Wallet balance : {user.wallet}
                            </Typography>
                            <CardFooter className='flex gap-2'>
                                <Button variant="outlined" size='md' className="w-full xs:cover">
                                    My bookings
                                </Button>
                                <Button variant='outlined' onClick={handleOpen}><FaUserEdit className=' size-5' /></Button>
                            </CardFooter>
                        </CardBody>
                    </Card>
                </div>
            )}
            {(user &&
                <Dialog open={open} handler={handleOpen}>
                    <form onSubmit={handleSubmit}>
                        <div className='flex-col m-5 space-y-5'>
                            <div className="w-72 ">
                                <Input label="Date of birth" type='date' name='date_of_birth' value={dob} onChange={handleChange} />
                            </div>
                            <div className="w-72">
                                <Input label="location" name='location' value={location}
                                    onChange={handleChange} />
                            </div>
                            <div className="w-72">
                                <Input label="profile picture" name='profile_picture' type='file' value={user.profile_picture} onChange={picture} />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" type='submit'>
                                <span>Update</span>
                            </Button>
                        </DialogFooter>
                    </form >

                </Dialog>
            )}
            <Footer />
        </>
    )
}

export default Profile
