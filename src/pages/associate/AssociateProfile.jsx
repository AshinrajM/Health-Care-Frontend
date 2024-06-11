import React, { useState, useEffect } from 'react';
import SideBarAssociate from '../../components/SideBarAssociate/SideBarAssociate';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input, Dialog, DialogFooter } from "@material-tailwind/react";
import homeCover from '../../assets/profile/user.jpg';
import { FaUserEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { BASE_URL } from '../../api/api'
import axios from 'axios';


const AssociateProfile = () => {

    const [user, setUser] = useState(null)
    const [associate, setAssociate] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [openPassDialog, setOpenPassDialog] = useState(false);
    const [location, setLocation] = useState('')
    const [profile_picture, setProfilePicture] = useState(null)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


    useEffect(() => {
        const userdata = localStorage.getItem('user')
        const associatedata = localStorage.getItem('associate')
        if (userdata) {
            const userDetails = JSON.parse(userdata)
            const associateDetails = JSON.parse(associatedata)
            setUser(userDetails)
            if (userDetails.location) {
                setLocation(userDetails.location)
                console.log(location)
                setAssociate(associateDetails)

            }
        }
    }, [])

    console.log(user, "user details")
    console.log(associate, "associate details")
    const handleOpen = () => setOpen(!open);

    const handlePassOpen = () => setOpenPassDialog(!openPassDialog)

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "location") {
            setLocation(e.target.value);
        } else if (name === 'profile_picture') {
            setProfilePicture(e.target.files[0]);
        } else if (name === "currentPassword") {
            setCurrentPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
        } else if (name === "confirmNewPassword") {
            setConfirmNewPassword(value);

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('location', location);
            formData.append('id', user.id)
            console.log(typeof (profile_picture), "hykjl")
            if (profile_picture) {
                formData.append('profile_picture', profile_picture)
            }

            const response = await axios.patch('http://127.0.0.1:8000/users/userslist', formData)
            console.log(response.data, "response data")
            handleOpen()
            setUser(response.data)

            if (response.data.profile_picture) {
                // Assuming the profile_picture field contains the URL of the updated image
                setUser(prevUser => ({
                    ...prevUser,
                    profile_picture: response.data.profile_picture
                }));

            }

            const updatedUserDetails = {
                ...user,
                profile_picture: response.data.profile_picture,
                location: response.data.location
            };
            if (JSON.stringify(updatedUserDetails) !== localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(updatedUserDetails));
                setUser(updatedUserDetails);
            }
            toast.success('profile updated')
        } catch (error) {
            handleOpen()
            console.log(error)
            toast.error('check credentials properly')
        }
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            if (newPassword !== confirmNewPassword) {
                toast.error("password not matching")
                handlePassOpen()
            } else {
                if (currentPassword && newPassword) {
                    const formData = new FormData();
                    formData.append('currentPassword', currentPassword);
                    formData.append('newPassword', newPassword);
                    formData.append('id', user.id)

                    const response = await axios.patch('http://127.0.0.1:8000/users/userslist', formData)
                    console.log(response.data, "response data , password changed")
                    handlePassOpen()
                    toast.success("password changed successfully")
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error)

        }
    }

    return (
        <div className='bg-brown-200 flex h-screen'>
            <div>
                <SideBarAssociate />
            </div>
            <div className='flex justify-center items-center md:mt-20 mb-10 mx-28 pl-64'>
                {(user &&
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
                            {associate && (
                                <>
                                    <Typography variant="h4" color="blue-gray" className="mb-8">
                                        {associate.name}
                                    </Typography>
                                    <Typography color="black" className="mb-4 font-normal">
                                        Certificate no&nbsp; : &nbsp; {associate.certificate_no}
                                    </Typography>
                                    <Typography color="black" className="mb-4 font-normal">
                                        Experience&nbsp; : &nbsp; {associate.experience}yr
                                    </Typography>
                                    <Typography color="black" className="mb-4 font-normal">
                                        Salary &nbsp;&nbsp;: &nbsp; ₹{associate.fee_per_hour}/hr
                                    </Typography>
                                    <Typography color="black" className="mb-4 font-normal">
                                        Location &nbsp;&nbsp; : &nbsp; {user.location ? user.location : "not provided"}
                                    </Typography>
                                    <Typography color="black" className="mb-4 font-normal">
                                        Wallet balance &nbsp;&nbsp;&nbsp;&nbsp; : ₹{user.wallet}
                                    </Typography>
                                    <CardFooter className='flex gap-2'>
                                        <Button variant="outlined" size='md' className="w-full xs:cover">
                                            Service History
                                        </Button>
                                        <Button variant='outlined' onClick={handleOpen}><FaUserEdit className=' size-5' /></Button>
                                        <Button variant='outlined' onClick={() => setOpenPassDialog(true)}>Change Password</Button>
                                    </CardFooter>
                                </>
                            )}
                        </CardBody>
                    </Card>
                )}
            </div>
            <Dialog open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit}>
                    <div className='flex-col m-5 space-y-5'>
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
            <Dialog open={openPassDialog} handler={() => setOpenPassDialog(false)}>
                <form onSubmit={handlePasswordChange}>
                    <div className='flex-col m-5 space-y-5'>
                        <div className="w-72">
                            <Input
                                label="Current Password"
                                name="currentPassword"
                                type="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-72">
                            <Input
                                label="New Password"
                                name="newPassword"
                                type="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-72">
                            <Input
                                label="Confirm New Password"
                                name="confirmNewPassword"
                                type="password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setOpenPassDialog(false)}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type='submit'>
                            <span>Change Password</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </div>
    )
}

export default AssociateProfile