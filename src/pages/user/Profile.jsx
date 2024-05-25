import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import {
    Card, CardHeader, CardBody, CardFooter, Typography, Button, Input, Dialog, DialogFooter
}
    from "@material-tailwind/react";
import homeCover from '../../assets/profile/user.jpg';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../api/api';


const Profile = () => {

    const [user, setUser] = useState(null);
    const [open, setOpen] = React.useState(false);

    const [dob, setDob] = useState('');
    const [location, setLocation] = useState('');
    const [profile_picture, setProfilePicture] = useState(null)




    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const data = localStorage.getItem('userDetails')
        if (data) {
            const userDetails = JSON.parse(data)
            setUser(userDetails)
            setDob(userDetails.date_of_birth);
            setLocation(userDetails.location);
        }

        getUser()

    }, [])
    // console.log(user, "check")

    const getUser = async () => {
        const userdata = JSON.parse(localStorage.getItem('userDetails'))
        const associateUserId = userdata.id
        try {
            const response = await axios.get(`${BASE_URL}/users/get-user?userId=${associateUserId}`)
            if (response.status === 200) {
                console.log(response.data, 'latest associate user data')
                setUser(response.data)
            }
        } catch (error) {
            console.log("error found", error)
        }

    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "date_of_birth") {
            setDob(e.target.value);
        } else if (name === 'location') {
            setLocation(e.target.value);
        } else if (name === 'profile_picture') {
            setProfilePicture(e.target.files[0]);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('date_of_birth', dob);
            formData.append('location', location);
            formData.append('id', user.id)
            if (profile_picture) {
                formData.append('profile_picture', profile_picture)
            }
            console.log('id', user.id)
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }

            const response = await axios.patch('http://127.0.0.1:8000/users/userslist', formData)
            console.log(response.data, "response data")
            handleOpen()
            setUser(response.data)

            if (response.data.profile_picture) {
                // Assuming the profile_picture field contains the URL of the updated image
                setUser(prevUser => ({ ...prevUser, profile_picture: response.data.profile_picture }));
            }


            const updatedUserDetails = {
                ...user, date_of_birth: dob,
                location: response.data.location,
                profile_picture: response.data.profile_picture,
            };
            if (JSON.stringify(updatedUserDetails) !== localStorage.getItem('userDetails')) {
                localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
                setUser(updatedUserDetails);
            }
            toast.success("profile updated")

        } catch (error) {
            console.error('Error:', error);
            handleOpen()
            toast.error("check credentials properly")
        }
    }

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
                                    src={`http://localhost:8000${user.profile_picture}`}
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
                            {/* <Typography color="gray" className="mb-8 font-normal">
                                date of birth : {user.date_of_birth}
                            </Typography> */}
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
            {/* {(user && */}
            <Dialog open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit}>
                    <div className='flex-col m-5 space-y-5'>
                        <div className="w-72 ">
                            <Input
                                label="Date of birth"
                                type="date"
                                name="date_of_birth"
                                value={dob}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-72">
                            <Input
                                label="location"
                                name="location"
                                value={location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-72">
                            <Input
                                label="profile picture"
                                name="profile_picture"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleChange}
                            />
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
            {/* )} */}
            <Footer />
        </>
    )
}

export default Profile
