import React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardBody, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

import axios from 'axios'
import { BASE_URL } from '../../api/api'
import SideBarAssociate from '../../components/SideBarAssociate/SideBarAssociate'


const Schedule = () => {

    const [user, setUser] = useState(null)
    const [associate, setAssociate] = useState(null);
    const [availabilityData, setAvailabilityData] = useState([]);
    const [open, setOpen] = useState(false);




    const handleOpen = () => {

        setOpen(!open);
    }

    // const TABLE_HEAD = ['', "Booking Id", "Username", "Date", "Shift", "Location", 'status'];


    const scheduledDates = async (associateId) => {
        try {

            const res = await axios.get(`${BASE_URL}/booking/slot/?associate_id=${associateId}`)
            if (res.data) {
                setAvailabilityData(res.data)
                toast.success("availibility get data of slot")
            }
        } catch (error) {
            toast.error("found error")
        }
    }

    useEffect(() => {
        const userdata = localStorage.getItem('user')
        const associatedata = localStorage.getItem('associate')
        if (userdata) {
            const userDetails = JSON.parse(userdata)
            const associateDetails = JSON.parse(associatedata)
            setUser(userDetails)
            setAssociate(associateDetails)
            console.log(associateDetails.id)
            scheduledDates(associateDetails.id)
        }
    }, [])


    return (
        <div className='bg-brown-200 flex h-full'>
            <div>
                <SideBarAssociate />
            </div>
            <div className='pl-64 w-full'>
                <div className='mx-5 mb-10 h-screen '>
                    <div className='m-5'>
                        <Typography variant='h2' className='mb-5'>
                            Scheduled Dates
                        </Typography>
                        <div className='grid grid-cols-2 gap-5'>
                            {availabilityData.map((item, index) => (
                                <Card key={item} className=' p-5 bg-gray-50 mb-2'>
                                    <div className='flex justify-between '>
                                        <div>
                                            <Typography variant='h6' color='black'>Date &nbsp; : {item.date}</Typography>
                                            <Typography variant='h6' color='black'>Shifts :
                                                {item.is_morning ? 'Morning' : null} {item.is_morning && item.is_noon ? "," : null} {item.is_noon ? 'Noon' : null}</Typography>
                                        </div>
                                        <div>
                                            <Button variant='outlined' color='red'
                                                className='hover:bg-red-500 hover:text-white'
                                                onClick={handleOpen}>Delete Schedule</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Are sure You want to delete this slot</DialogHeader>

                <DialogFooter>
                    <Button
                        variant="text"
                        color="blue"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default Schedule