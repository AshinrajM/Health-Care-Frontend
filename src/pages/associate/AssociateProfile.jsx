import React, { useState, useEffect } from 'react'
import SideBarAssociate from '../../components/sideBarAssociate/sideBarAssociate'
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input, Dialog, DialogFooter } from "@material-tailwind/react";
import homeCover from '../../assets/profile/user.jpg';
import { FaUserEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';

const AssociateProfile = () => {


    const [user, setUser] = useState(null)
    const [associate, setAssociate] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = useState('')
    const [profile_picture, setProfilePicture] = useState(null)


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
            // if (userDetails.profile_picture) {
            //     setProfilePicture(userDetails.profile_picture)
            // }

        }
    }, [])
    console.log(user, "user details")
    console.log(associate, "associate details")

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "location") {
            setLocation(e.target.value);
        } else if (name === 'profile_picture') {
            setProfilePicture(e.target.files[0]);
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

    return (
        <div className='bg-brown-200 flex'>
            <div>
                <SideBarAssociate />
            </div>
            <div className='flex justify-center items-center md:mt-20 mb-10 mx-28'>
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
                            </CardFooter>
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
        </div>
    )
}

export default AssociateProfile