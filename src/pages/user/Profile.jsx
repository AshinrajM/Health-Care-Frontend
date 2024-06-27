import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import {
    Card, CardHeader, CardBody, CardFooter, Typography, Button,
    Input, Dialog, DialogFooter
} from "@material-tailwind/react";
import { ClipLoader } from 'react-spinners';
import homeCover from '../../assets/profile/user.jpg';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import axiosInstance from '../../api/api';
import { toast } from 'react-toastify';


const Profile = () => {

    const [user, setUser] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [openPassDialog, setOpenPassDialog] = useState(false);
    const [dob, setDob] = useState('');
    const [location, setLocation] = useState('');
    const [profile_picture, setProfilePicture] = useState(null)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('')
    const [isLoading, setIsLoading] = useState(false)



    const handleOpen = () => setOpen(!open);
    const handlePassOpen = () => setOpenPassDialog(!openPassDialog)

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
    console.log(user, "check")

    const getUser = async () => {
        const userdata = JSON.parse(localStorage.getItem('userDetails'))
        const associateUserId = userdata.id
        try {
            // const response = await axios.get(`${BASE_URL}/users/get-user?userId=${associateUserId}`)
            const response = await axiosInstance.get(`/users/get-user?userId=${associateUserId}`)
            if (response.status === 200) {
                console.log(response.data, 'latest associate user data')
                setUser(response.data)
            }
        } catch (error) {
            console.log("error found", error)
        }

    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    const handleChange = (e) => {

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        const { name, value } = e.target;
        if (name === "date_of_birth") {
            setDob(e.target.value);
        } else if (name === 'location') {
            setLocation(e.target.value);
        } else if (name === 'profile_picture') {
            setProfilePicture(e.target.files[0]);
        } else if (name === "currentPassword") {
            if (!passwordRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.',
                }));
            }
            setCurrentPassword(value);
        } else if (name === "newPassword") {
            if (!passwordRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.',
                }));
            }
            setNewPassword(value);
        } else if (name === "confirmNewPassword") {
            if (value !== newPassword) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Passwords arent matching.',
                }));
            }
            setConfirmNewPassword(value);

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
            const response = await axiosInstance.patch('/users/userslist', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data, "response data")
            handleOpen()
            setUser(response.data)

            if (response.data.profile_picture) {
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

    const handlePasswordChange = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {

            if (currentPassword && newPassword) {
                const formData = new FormData();
                formData.append('currentPassword', currentPassword);
                formData.append('newPassword', newPassword);
                formData.append('id', user.id)

                const response = await axiosInstance.patch('/users/userslist', formData)
                console.log(response.data, "response data , password changed")
                handlePassOpen()
                toast.success("password Updated")
            }
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error.response.data.message, "check")
            setServerError(error.response.data.message)
        }

    }

    const handleStates = () => {
        setErrors({})
        setServerError('')
        setOpenPassDialog(false)
    }

    return (
        <>
            <Header />
            {(user &&
                <div className='flex justify-center items-center md:mt-20 mb-6 mx-2'>
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
                            <Typography color="gray" className="mb-8 font-normal">
                                Location : {user.location}
                            </Typography>
                            <Typography color="gray" className="mb-8 font-normal">
                                Wallet balance : {user.wallet}
                            </Typography>
                            <CardFooter className='flex gap-3'>
                                <Button variant="outlined" >
                                    <span className='text-xs'>Bookings</span>
                                </Button>
                                <Button variant='outlined' onClick={handleOpen}>
                                    <FaUserEdit className=' size-5' /></Button>
                                {user.is_google ? null :
                                    <Button variant='outlined' onClick={handlePassOpen}>Change Password</Button>}
                            </CardFooter>
                        </CardBody>
                    </Card>
                </div>
            )}
            {/* {(user && */}
            <Dialog open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit} >
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
                            className="mr-1">
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type='submit'>
                            <span>Update</span>
                        </Button>
                    </DialogFooter>
                </form >

            </Dialog>
            <Dialog open={openPassDialog} className='w-full'>
                <form onSubmit={handlePasswordChange}>
                    <div className='flex-col m-5 space-y-3'>
                        <div className="w-96">
                            <Input
                                label="Current Password"
                                name="currentPassword"
                                type="password"
                                onChange={handleChange}
                                error={errors.currentPassword}
                            />
                        </div>
                        <div className="w-96">
                            <Input
                                label="New Password"
                                name="newPassword"
                                type="password"
                                onChange={handleChange}
                                error={errors.newPassword}
                            />
                        </div>
                        <div className="w-96">
                            <Input
                                label="Confirm New Password"
                                name="confirmNewPassword"
                                type="password"
                                onChange={handleChange}
                                error={errors.confirmNewPassword}
                            />

                        </div>
                        <>
                            {errors.currentPassword && <p className="text-red-500 text-xs mb-1 w-96">
                                {errors.currentPassword}</p>}
                            {!errors.currentPassword && (
                                <>{errors.newPassword && (
                                    <p className="text-red-500 text-xs mb-1 w-96">{errors.newPassword}</p>
                                )}</>
                            )}
                            {errors.confirmNewPassword && <p className="text-red-500 text-xs w-96">
                                {errors.confirmNewPassword}</p>}
                            {serverError && <p className="text-red-500 text-xs w-96">
                                {serverError}Try again</p>}
                        </>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => handleStates()}
                            className="mr-1">
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type='submit'>
                            {isLoading ? <ClipLoader size={12} color={"green"} /> : 'Change Password'}
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
            {/* )} */}
            <Footer />
        </>
    )
}

export default Profile
