import React, { useState, useEffect } from 'react'
import SideBarAssociate from '../../components/sideBarAssociate/sideBarAssociate'
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input, Dialog, DialogFooter } from "@material-tailwind/react";
import homeCover from '../../assets/profile/user.jpg';
import { FaUserEdit } from "react-icons/fa";


const AssociateProfile = () => {


    const [user, setUser] = useState(null)
    const [associate, setAssociate] = useState(null);
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        const userdata = localStorage.getItem('user')
        const associatedata = localStorage.getItem('associate')
        if (userdata) {
            const userDetails = JSON.parse(userdata)
            const associateDetails = JSON.parse(associatedata)
            setUser(userDetails)
            setAssociate(associateDetails)
            console.log(user, "user details")
            console.log(associate, "associate details")
        }
    }, [])

    const handleOpen = () => setOpen(!open);


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
                            <img
                                src={homeCover}
                                alt="card-image"
                                className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody className='w-full'>
                            <Typography variant="h4" color="blue-gray" className="mb-8">
                                {associate.name}
                            </Typography>
                            <Typography color="gray" className="mb-4 font-normal">
                                Date
                            </Typography>
                            <Typography color="gray" className="mb-4 font-normal">
                                Location :
                            </Typography>
                            <Typography color="gray" className="mb-4 font-normal">
                                Wallet balance
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
                <form>
                    <div className='flex-col m-5 space-y-5'>
                        <div className="w-72 ">
                            <Input
                                label="Date of birth"
                                type="date"
                                name="date_of_birth"

                            />
                        </div>
                        <div className="w-72">
                            <Input
                                label="location"
                                name="location"
                            />
                        </div>
                        {/* <div className="w-72">
                                <Input
                                    label="profile picture"
                                    name="profile_picture"
                                    type="file"
                                    onChange={handleChange}
                                />
                            </div> */}
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