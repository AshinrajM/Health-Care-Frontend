import { useEffect, useState } from 'react'
import SideBarAssociate from '../../components/sideBarAssociate/sideBarAssociate';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Calendar from 'react-calendar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CiWallet } from "react-icons/ci";
import { RiUserStarLine } from "react-icons/ri";
import { MdMedicalServices } from "react-icons/md";
import { BASE_URL } from "../../api/api"
import moment from 'moment';





const AssociateDashboard = () => {

  const [user, setUser] = useState(null)
  const [associate, setAssociate] = useState(null);
  const [morningShift, setMorningShift] = useState(false);
  const [noonShift, setNoonShift] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState([]);



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
  console.log(selectedDate)

  const today = new Date()
  const startDate = new Date(today.setDate(today.getDate() + 1))
  const endDate = new Date(today.setDate(today.getDate() + 7))

  const inputDate = selectedDate

  const inputDateFormat = 'YYYY//MM/DD'

  const momentObject = moment(inputDate, inputDateFormat)
  const utcDate = momentObject.utc().format();

  const actual = utcDate.toString().split('T')[0]
  console.log(actual, "utc date")


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

  console.log(availabilityData, "full data")
  const handleSubmit = async () => {
    let values = {
      associate: associate.id,
      // date: selectedDate.toISOString().split('T')[0],
      date: actual,
      is_morning: morningShift,
      is_noon: noonShift,
    }
    console.log(values, "semding values")

    try {
      const response = await axios.post(`${BASE_URL}/booking/slot/`, values)

      if (response.data) {
        console.log(response.data, "res submit")
        const arr = [...availabilityData, response.data]
        setAvailabilityData(arr)
        toast.success("Slot Created")
        setMorningShift(false)
        setNoonShift(false)
        setSelectedDate(new Date())

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
            <div className='w-1/3'>
              <Card className="">
                <CardBody className='flex items-center'>
                  <CiWallet className='h-12 w-12 text-black' />
                  <Typography variant='h4' color='black'> &nbsp; $53435</Typography>
                </CardBody>
              </Card>
            </div>
            <div className='w-1/3'>
              <Card className="">
                <CardBody className='flex items-center'>
                  <RiUserStarLine className='h-12 w-12 text-black' />
                  <Typography variant='h4' color='black'> &nbsp; 4.5</Typography>
                </CardBody>
              </Card>
            </div>
            <div className='w-1/3'>
              <Card className="">
                <CardBody className='flex items-center'>
                  <MdMedicalServices className='h-12 w-12 text-black' />
                  <Typography variant='h4' color='black'>Services: &nbsp; 53</Typography>
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
                  <Calendar minDate={startDate} maxDate={endDate} onChange={(date) => setSelectedDate(date)} value={selectedDate} style={{ height: '500px' }} />
                </div>
                <div className="w-full sm:w-96">
                  <Card className="w-full py-2 bg-pink-100">
                    <CardBody>
                      <h2 className="text-xl sm:text-2xl font-bold mb-4">Choose your Time Slot</h2>
                      <div className=''>
                        <div className='space-x-2'>
                          <label>08:00 AM to 12:00 PM</label>
                          <input type="checkbox" checked={morningShift} onChange={() => setMorningShift(!morningShift)} />
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
                      <Button variant='outlined' className='hover:bg-white hover:text-red-900 hover:' onClick={handleSubmit} disabled={!morningShift && !noonShift}>create availability</Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className='mx-10 mb-10'>
            <div className='m-5'>
              <Typography variant='h2' className='mb-5'>
                Scheduled Dates
              </Typography>
              <div>
                {availabilityData.map((item, index) => (
                  <Card key={item} className=' p-5 bg-gray-500 mb-2'>
                    <div className='flex justify-between '>
                      <div>
                        <Typography variant='h6' color='black'>Date &nbsp; : {item.date}</Typography>
                        <Typography variant='h6' color='black'>Shifts :
                          {item.is_morning ? 'Morning' : null} {item.is_morning && item.is_noon ? "," : null} {item.is_noon ? 'Noon' : null}</Typography>
                      </div>
                      <div>
                        <Button variant='outlined' color='red'
                          className='hover:bg-red-500 hover:text-white'>Delete Schedule</Button>
                      </div>
                    </div>
                  </Card>
                ))}

              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AssociateDashboard
