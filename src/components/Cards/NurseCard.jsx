import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiLocationOn } from "react-icons/ci";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Select, Option, Dialog, DialogBody, DialogHeader, DialogFooter, Typography, Radio, Input, Button } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import axios from 'axios';
// import { BASE_URL } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import '../Cards/custom.css'
import icon from '../../assets/homePageIcons/bill.png'
import axiosInstance from '../../api/api';


const InitialsAvatar = ({ name }) => {
    const getInitials = (name) => {
        const names = name.split(' ');
        const initials = names.map((n) => n[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <div className="w-10 h-10 p-6 rounded-full bg-cyan-900 flex items-center justify-center text-white text-xl font-thin">
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
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate('')


    useEffect(() => {
        const allAvailablilty = async () => {
            try {
                // const response = await axios.get(`${BASE_URL}/booking/available-associates`);
                const response = await axiosInstance.get('/booking/available-associates');
                console.log("API Response:", response.data);
                if (response.data && response.data.length > 0) {
                    setAvailabilityData(response.data)
                    console.log(response.data.length, "repsonse data")
                } else {
                    console.log("object chceking else")
                    setNoSlot(true)
                }
                setLoading(false);
            } catch (error) {
                console.log("in error section")
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
            return { isValid: false, message: 'Location cannot be empty' };
        }

        // Check if location contains only text
        const locationRegex = /^[a-zA-Z\s]+$/;
        if (!locationRegex.test(location.trim())) {
            return { isValid: false, message: 'Location should contain only text' };
        }
        return { isValid: true };
    };


    const handleModalCancel = () => {
        setLocation('')
        setSelectedOption('')
        setShowDialog(!showDialog)
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
                <div>Loading...</div>
            ) : (
                <div className="flex  justify-start gap-6 p-8 ">
                    {availabilityData.map((data, index) => (
                        <div key={index} className="w-full md:w-1/4 lg:w-1/4 p-2 bg-green-100
                        rounded-lg shadow-md overflow-hidden m-0 hover:shadow-xl hover:scale-105 duration-200">
                            <div className="flex items-center p-1">
                                <InitialsAvatar name={data.name} />
                                <div className="ml-4">
                                    <div className="flex items-center">
                                        <h2 className="text-lg text-gray-900 truncate" style={{ fontFamily: 'Krona One', textTransform: 'uppercase' }}>{data.name}</h2>
                                        <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-green-500" />
                                    </div>
                                    <p>{data.age} years old</p>
                                </div>
                            </div>
                            <div className="px-8 py-4">
                                <div className="flex items-center mb-4 gap-2  text-black">
                                    <FaSuitcaseMedical className="h-6 w-6 self-start" />
                                    <p className='px-2' style={textStyle}>{data.experience} Years</p>
                                </div>
                                <div className="flex items-center mb-4 gap-2  text-black">
                                    <img className='h-6 w-6' src={icon} alt="" />
                                    <p className='px-2' style={textStyle}>₹  {data.fee_per_hour}/hr </p>
                                </div>
                                <div className="flex items-center mb-4 gap-2  text-black">
                                    <CiLocationOn className="h-6 w-6 self-start" />
                                    <p className='px-2' style={textStyle}>{data.user.location} </p>
                                </div>
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="text-black mb-2">
                                        <BsCalendarDate className="h-6 w-6 self-start" />
                                    </div>
                                    <div className="mb-1">
                                        <Select
                                            label="Select Date"
                                            color="lightBlue"
                                            size="md"
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
                                    </div>
                                </div>
                                <Button className="btn  w-full py-2 px-4 mb-3 "
                                    onClick={() => handleBooking(data)}>
                                    Book Appoinment
                                </Button>

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