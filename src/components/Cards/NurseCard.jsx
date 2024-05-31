import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faStar, faIndianRupee, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Select, Option, Dialog, DialogBody, DialogHeader, DialogFooter, Typography, Radio, Input, Button } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../api/api';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useNavigate } from 'react-router-dom';
import '../Cards/custom.css'

const InitialsAvatar = ({ name }) => {
    const getInitials = (name) => {
        const names = name.split(' ');
        const initials = names.map((n) => n[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <div className="w-14 h-14 rounded-full bg-cyan-900 flex items-center justify-center text-white text-xl font-thin">
            {getInitials(name)}
        </div>
    );
};


const NurseCard = () => {

    const [dates, setDates] = useState({});
    const [availabilityData, setAvailabilityData] = useState([])
    const [noSlot, setNoSlot] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showDialog, setShowDialog] = useState(false);
    const [selectedAssociate, setSelectedAssociate] = useState(null);
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedOption, setSelectedOption] = useState('');
    const [location, setLocation] = useState('')
    // const [phone, setPhone] = useState('')
    const [validationError, setValidationError] = useState('');

    const navigate = useNavigate('')


    useEffect(() => {
        const allAvailablilty = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/available-associates`);
                if (response.data && response.data.length > 0) {
                    setAvailabilityData(response.data)
                    toast.success("successfully rendered")
                    console.log(response.data.length, "repsonse data")
                } else {
                    setNoSlot(true)
                }
                setLoading(false);
            } catch (error) {
                toast.error("error found")
                console.log(error, "error")
                setLoading(false);
            }
        }
        allAvailablilty()
    }, [])

    const handleDateChange = (id, date) => {
        setDates((prevDates) => ({
            ...prevDates,
            [id]: date,
        }));
    };

    const handleBooking = (associate) => {
        const selectedDate = dates[associate.id];
        if (!selectedDate) {
            toast.error('Select a date');
        } else {
            setSelectedAssociate(associate);
            setSelectedDate(selectedDate);
            toast.success(`Booking for ${associate.id} on ${selectedDate}`);
            setShowDialog(true);
        }
    };

    const getSlotByDate = (slots, date) => {
        return slots.find((slot) => slot.date === date);
    };

    const handleOptionChange = (value) => {
        setSelectedOption(value)
    }

    const handleSubmit = () => {
        const { isValid, message } = isValidInput(location);
        if (!isValid) {
            setValidationError(message);
        } else {

            // here have to find whcih slot is selected using date

            const bookingDatas = {
                associate: selectedAssociate,
                shift: selectedOption,
                date: selectedDate,
                // phone: phone,
                location: location
            }

            navigate('/secured/checkout', { state: bookingDatas });
            setValidationError('');
            handleModalCancel();
        }
    }

    const isValidInput = (location) => {
        // Check if both fields are not empty
        if (!location.trim()) {
            return { isValid: false, message: 'Location and phone number cannot be empty' };
        }

        // Check if location contains only text
        const locationRegex = /^[a-zA-Z\s]+$/;
        if (!locationRegex.test(location.trim())) {
            return { isValid: false, message: 'Location should contain only text' };
        }

        // Check if phone number is a valid Indian number
        // const isValidNumber = isValidPhoneNumber(phone, 'IN');
        // if (!isValidNumber) {
        //     return { isValid: false, message: 'Please enter a valid Indian phone number' };
        // }

        // If all conditions are met, return isValid as true
        return { isValid: true };
    };


    const handleModalCancel = () => {
        setPhone('')
        setLocation('')
        setSelectedOption('')
        setShowDialog(false)
    }

    const textStyle = {
        fontFamily: "Afacad",
        fontSize: '18px',
        fontWeight: '550',
    }
    const dialogStyle = {
        fontFamily: "Jersey 25",
        fontSize: '20px',
        fontWeight: '550',
    }

    console.log("object", dates)
    console.log("datas", availabilityData)
    console.log(selectedAssociate, "checking selected")

    return (
        <>
            {loading ? (
                <div>Loading...</div> // Display loading message or spinner
            ) : (
                <div className="flex  justify-center gap-6 p-8 ">
                    {availabilityData.map((data, index) => (
                        <div key={index} className="w-full md:w-1/4 lg:w-1/4 p-2 bg-green-100
                        rounded-lg shadow-md overflow-hidden m-0 hover:shadow-xl hover:scale-105 duration-200">
                            <div className="flex items-center p-3">
                                <InitialsAvatar name={data.name} />
                                <div className="ml-4">
                                    <div className="flex items-center">
                                        <h2 className="text-xl text-gray-900 truncate" style={{ fontFamily: 'Krona One', textTransform: 'uppercase' }}>{data.name}</h2>
                                        <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-green-500" />
                                    </div>
                                    <p>{data.age} years old</p>
                                </div>
                            </div>
                            <div className="px-8 py-4">
                                <div className="flex items-center mb-4 text-black">
                                    <FontAwesomeIcon icon={faBriefcase} className="mr-4" />
                                    <p className='px-2' style={textStyle}>{data.experience} Years</p>
                                </div>
                                <div className="flex items-center mb-4 text-black">
                                    <FontAwesomeIcon icon={faIndianRupee} className="mr-4" />
                                    <p className='px-3' style={textStyle}>{data.fee_per_hour} / hr</p>
                                </div>
                                <div className="mb-4 flex">
                                    <div className="text-black mb-2">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-4"
                                            style={{ height: '30px', width: '28px' }} />
                                    </div>
                                    <div className="mb-1">
                                        <Select
                                            label="Select Date"
                                            color="lightBlue"
                                            size="lg"
                                            onChange={(val) => handleDateChange(data.id, val)}
                                            value={dates[data.id] || ''}
                                            className="border border-gray-700 rounded-md p-1
                                            text-black">
                                            {data.slots && data.slots.map((slot, slotIndex) => (
                                                <Option key={slotIndex} value={slot.date}>
                                                    {slot.date}
                                                </Option>
                                            ))}
                                        </Select>
                                        {/* <p className='text-xs mt-2 text-gray-600'>Nb : here you can see the available dates </p> */}
                                    </div>
                                </div>
                                <Button className="btn  w-full py-2 px-4 mb-3 "
                                    onClick={() => handleBooking(data)}>
                                    Book Appoinment
                                </Button>
                                <Button className="w-full py-2 px-4 bg-blue-gray-700 text-white rounded-md hover:bg-blue-gray-400 focus:outline-none">More Details</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Dialog open={showDialog} >
                {selectedAssociate && (
                    <>
                        <DialogHeader style={dialogStyle} >Confirm Selection</DialogHeader>
                        <DialogBody className='space-y-5 text-black'>
                            <div className='flex justify-between'>
                                <Typography variant=''>Associate:</Typography>
                                <Typography variant='h6' color='gray'>{selectedAssociate?.name}</Typography>
                            </div>
                            <div className='flex justify-between'>
                                <Typography>Date:</Typography>
                                <Typography variant='paragraph'>{selectedDate}</Typography>
                            </div>
                            <div className='flex justify-between'>
                                <Typography>Fee per hour </Typography>
                                <Typography>₹{selectedAssociate?.fee_per_hour}</Typography>
                            </div>

                            <div className='flex justify-between'>
                                <Typography>shift :</Typography>
                                <div className=''>
                                    <div className="flex items-center">
                                        {selectedAssociate.slots && (
                                            <>
                                                {getSlotByDate(selectedAssociate.slots, selectedDate)?.is_morning ? (
                                                    <Radio
                                                        color="green"
                                                        name="shift"
                                                        value="morning"
                                                        checked={selectedOption === "morning"}
                                                        onChange={() => handleOptionChange("morning")}
                                                        label="Morning"
                                                    />
                                                ) : null}
                                                {getSlotByDate(selectedAssociate.slots, selectedDate)?.is_noon ? (
                                                    <Radio
                                                        color="red"
                                                        name="shift"
                                                        value="noon"
                                                        checked={selectedOption === "noon"}
                                                        onChange={() => handleOptionChange("noon")}
                                                        label="Noon"
                                                    />
                                                ) : null}
                                                {getSlotByDate(selectedAssociate.slots, selectedDate)?.is_morning &&
                                                    getSlotByDate(selectedAssociate.slots, selectedDate)?.is_noon ? (
                                                    <Radio
                                                        color="indigo"
                                                        name="shift"
                                                        value="fullday"
                                                        checked={selectedOption === "fullday"}
                                                        onChange={() => handleOptionChange("fullday")}
                                                        label="Full Day"
                                                    />
                                                ) : null}
                                            </>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div>
                                <Input label='Enter location' value={location} onChange={(e) => setLocation(e.target.value)} required />
                                {validationError && <Typography className='text-xs' color="red">{validationError}</Typography>}
                            </div>
                            {/* <div>
                                <Input label='Enter mobile number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                {validationError && <Typography className='text-xs' color="red">{validationError}</Typography>}
                            </div> */}
                        </DialogBody>

                        <DialogFooter className='gap-5'>
                            <>
                                <Button variant="text" color="red" onClick={() => handleModalCancel()}>
                                    Cancel
                                </Button>
                                <Button variant="gradient" color="green" onClick={() => handleSubmit()} >
                                    Confirm Booking
                                </Button>
                            </>
                        </DialogFooter>
                    </>
                )}
            </Dialog >
        </>
    )
}

export default NurseCard