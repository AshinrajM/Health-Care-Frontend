import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import {
    Card, CardHeader, CardBody, CardFooter, Typography, Button, Input, Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";
import homeCover from '../../assets/profile/user.jpg';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';



const Profile = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('userDetails')
        // console.log(data, "storage")
        if (data) {
            const userDetails = JSON.parse(data)
            setUser(userDetails)
            // console.log(userDetails, "user detail from profile")
        }
    }, [])
    console.log(user, "check")
    return (
        <>
            <Header />
            {(user &&
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
                                {user.email}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                date of birth:{user.date_of_birth}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                Date Joined :{user.location}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                Wallet :{user.wallet}
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
            <Dialog open={open} handler={handleOpen}>
                <div className='flex-col m-5 space-y-5'>
                    <div className="w-72 ">
                        <Input label="Email" />
                    </div>
                    <div className="w-72">
                        <Input label="Username" />
                    </div>
                    <div className="w-72">
                        <Input label="Username" />
                    </div>
                    <div className="w-72">
                        <Input label="Username" />
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
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <Footer />
        </>
    )
}

export default Profile
