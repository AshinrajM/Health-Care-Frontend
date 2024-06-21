import { useEffect, useState } from 'react'
import { Card, CardBody, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import Calendar from 'react-calendar';
import axios from 'axios';
import SideBarAssociate from '../../components/SideBarAssociate/SideBarAssociate';
import { toast } from 'react-toastify';
import { CiWallet } from "react-icons/ci";
import { RiUserStarLine } from "react-icons/ri";
import { MdMedicalServices } from "react-icons/md";
import axiosInstance from "../../api/api";
import 'react-calendar/dist/Calendar.css';
import '../../components/Cards/custom.css'
import moment from 'moment';





const AssociateDashboard = () => {

  const [user, setUser] = useState(null)
  const [associate, setAssociate] = useState(null);
  const [morningShift, setMorningShift] = useState(false);
  const [noonShift, setNoonShift] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [slot, setSlot] = useState('')
  // const [open, setOpen] = useState(false);
  const [slotDates, setSlotDates] = useState([]);
  const [services, setServices] = useState('')
  const [rating, setRating] = useState(null)



  // const handleOpen = () => {
  //   setOpen(!open);
  // }


  useEffect(() => {
    const userdata = localStorage.getItem('user')
    const associatedata = localStorage.getItem('associate')
    if (userdata) {
      const userDetails = JSON.parse(userdata)
      const associateDetails = JSON.parse(associatedata)
      setUser(userDetails)
      setAssociate(associateDetails)
      console.log(associateDetails.id)
      getAssociateUser()
    }
  }, [])

  // to get latest associateuser datas
  const getAssociateUser = async () => {

    const userdata = JSON.parse(localStorage.getItem('user'))
    const associateUserId = userdata.id
    try {
      // const response = await axios.get(`${BASE_URL}/users/get-user?userId=${associateUserId}`)
      const response = await axiosInstance.get(`/users/get-user?userId=${associateUserId}`)
      if (response.status === 200) {
        console.log(response.data, 'latest associate user data')
        setUser(response.data.user)
        const availableSlots = response.data.available_slots
        const extractedDates = availableSlots.map(slot => moment(slot.date).format('YYYY-MM-DD'));
        setSlotDates(extractedDates);
        setServices(response.data.count)
        setRating(response.data.average_rating)
      }
    } catch (error) {
      console.log("error found", error)
    }
  }

  console.log(selectedDate)

  const today = new Date();
  const startDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Start from tomorrow
  const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // End after 7 days
  const inputDate = selectedDate;
  const utcDate = moment(inputDate).format('YYYY-MM-DD');
  const actual = utcDate.toString().split('T')[0]
  console.log(actual, "utc date")



  const handleSubmit = async () => {
    let values = {
      associate: associate.id,
      date: actual,
      is_morning: morningShift,
      is_noon: noonShift,
    }
    console.log(values, "sending values")

    try {
      // const response = await axios.post(`${BASE_URL}/booking/slot/`, values)
      const response = await axiosInstance.post('/booking/slot/', values)

      if (response.data) {
        console.log(response.data, "res submit")
        toast.success("Slot Created")
        setMorningShift(false)
        setNoonShift(false)
        setSelectedDate(new Date())
        getAssociateUser();
      } else {
        toast.error("not found")
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("error found in catch")
        console.error("Error", error)
      }
    }
  }


  // Function to determine if a date should be marked
  const isDateMarked = (date) => {
    return slotDates.includes(moment(date).format('YYYY-MM-DD'));
  }

  // Custom class name for marked dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isDateMarked(date)) {
        return 'react-calendar__tile--highlight';
      }
    }
    return null;
  }

  console.log("slotDates", slotDates)

  console.log(selectedDate, "CHOOSEN DATE")

  return (
    <div className='bg-brown-200 flex h-full'>
      <div>
        <SideBarAssociate />
      </div>
      <div className='pl-64'>
        <div>
          <Card className="m-10 w-auto">
            <CardBody>
              <Typography>
                <div className='flex gap-2'>
                  <Typography>Hi</Typography>
                  <Typography variant='h6' color='brown'> {associate?.name},</Typography><br />
                </div>
                The place is close to Barceloneta Beach and bus stop just 2 min by
                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                night life in Barcelona.The place is close to Barceloneta Beach and
                bus stop just 2 min by  walk and near to &quot;Naviglio&quot; where
                you can enjoy the main night life in Barcelona.
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div>
          <div className='flex justify-around m-10 gap-8'>
            <div className='w-1/2'>
              <Card className="">
                <CardBody className='flex items-center'>
                  <CiWallet className='h-12 w-12 text-black' />
                  <Typography variant='h4' color='black'> &nbsp; ₹{user?.wallet}</Typography>
                </CardBody>
              </Card>
            </div>
            <div className='w-1/3'>
              <Card className="">
                <CardBody className='flex items-center'>
                  <RiUserStarLine className='h-12 w-12 text-black' />
                  <Typography variant='h4' color='black'> &nbsp;{rating?.average_rating}</Typography>
                </CardBody>
              </Card>
            </div>
            <div className='w-1/2'>
              <Card className="">
                <CardBody className='flex items-center'>
                  <MdMedicalServices className='h-12 w-12 text-black' />
                  <Typography variant='h4' color='black'>Services: &nbsp; {services}</Typography>
                </CardBody>
              </Card>
            </div>
          </div>
          <Card className="m-10 w-full sm:w-auto">
            <CardBody>
              <Typography variant='h2' className='mb-5'>
                Schedule Dates
              </Typography>
              <div className='flex flex-col sm:flex-row space-x-0 sm:space-x-6 justify-center'>
                <div className="w-full sm:w-96">
                  <Calendar minDate={startDate} maxDate={endDate} tileClassName={tileClassName}
                    onChange={(date) => setSelectedDate(date)} value={selectedDate}
                    style={{ height: '500px' }} />
                </div>
                <div className="w-full sm:w-96">
                  <Card className="w-full py-2 bg-pink-100">
                    <CardBody>
                      <h2 className="text-xl sm:text-2xl font-bold mb-4">Choose your Time Slot</h2>
                      <div className=''>
                        <div className='space-x-2'>
                          <label>08:00 AM to 12:00 PM</label>
                          <input type="checkbox" checked={morningShift}
                            onChange={() => setMorningShift(!morningShift)} />
                        </div>
                        <div className='space-x-2'>
                          <label>01:00 PM to 05:00 PM</label>
                          <input type="checkbox" checked={noonShift} onChange={() => setNoonShift(!noonShift)} />
                        </div>
                      </div>
                      <div className='py-4'>
                        <h1>Selected Date : {selectedDate.toDateString()}</h1>
                        <h1>Selected Shifts : {morningShift && 'Morning'} {morningShift && noonShift && '|'} {noonShift && 'Noon'}</h1>
                      </div>
                      <Button variant='outlined' className='hover:bg-white hover:text-red-900 hover:' onClick={handleSubmit} disabled={!morningShift && !noonShift}>
                        create availability</Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

    </div>

  )
}

export default AssociateDashboard
