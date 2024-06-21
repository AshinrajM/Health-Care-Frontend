import React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardBody, Typography, Button, Dialog, DialogHeader, DialogFooter } from "@material-tailwind/react";
import axios from 'axios'
// import { BASE_URL } from '../../api/api'
import axiosInstance from '../../api/api'
import { toast } from 'react-toastify';
import SideBarAssociate from '../../components/SideBarAssociate/SideBarAssociate'
import '../../components/Cards/custom.css'


const Schedule = () => {

    const [user, setUser] = useState(null)
    const [associate, setAssociate] = useState(null);
    const [availabilityData, setAvailabilityData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState(null);


    const handleOpen = (slotId) => {
        setOpen(!open);
        setSelectedSlotId(slotId)
    }

    console.log("id of slot", selectedSlotId)
    const scheduledDates = async (associateId) => {
        try {
            // const res = await axios.get(`${BASE_URL}/booking/slot/?associate_id=${associateId}`)
            const res = await axiosInstance.get(`/booking/slot/?associate_id=${associateId}`)
            if (res.data) {
                setAvailabilityData(res.data)
                toast.success("availibility get data of slot")
            }
        } catch (error) {
            toast.error("found error")
        }
    }

    const handleSlot = async () => {
        try {
            // const res = await axios.delete(`${BASE_URL}/booking/slot/?slotId=${selectedSlotId}`)
            const res = await axiosInstance.delete(`/booking/slot/?slotId=${selectedSlotId}`)
            if (res.status === 200) {
                const updatedAvailabilityData = availabilityData.filter(
                    (item) => item.id !== selectedSlotId);
                setAvailabilityData(updatedAvailabilityData);
                toast.success("Slot deleted")
                handleOpen(!open)
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
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left"></th>
                                        <th className="py-2 px-4 text-left">Date</th>
                                        <th className="py-2 px-4 text-left">Shift</th>
                                        <th className="py-2 px-4 text-left">Active</th>
                                        <th className="py-2 px-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availabilityData.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 bg-white">
                                            <td className="py-2 px-4">{index + 1}</td>
                                            <td className="py-2 px-4">{item.date}</td>
                                            <td className="py-2 px-4">
                                                {item.is_morning ? 'Morning' : null}{' '}
                                                {item.is_morning && item.is_noon ? "," : null}{' '}
                                                {item.is_noon ? 'Noon' : null}
                                            </td>
                                            <td className="py-2 px-4">{item.status}</td>
                                            <td className="py-2 px-4">
                                                {item.status === 'active' ? (
                                                    <button class="button" onClick={() => handleOpen(item.id)}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 69 14"
                                                            class="svgIcon bin-top"
                                                        >
                                                            <g clip-path="url(#clip0_35_24)">
                                                                <path
                                                                    fill="black"
                                                                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                                                                ></path>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_35_24">
                                                                    <rect fill="white" height="14" width="69"></rect>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 69 57"
                                                            class="svgIcon bin-bottom"
                                                        >
                                                            <g clip-path="url(#clip0_35_22)">
                                                                <path
                                                                    fill="black"
                                                                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                                                                ></path>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_35_22">
                                                                    <rect fill="white" height="57" width="69"></rect>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                    <Button variant="gradient" color="red" onClick={handleSlot}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default Schedule