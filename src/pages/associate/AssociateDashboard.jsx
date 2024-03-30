import { useEffect, useState } from 'react'
import SideBarAssociate from '../../components/sideBarAssociate/sideBarAssociate';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Calendar from 'react-calendar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CiWallet } from "react-icons/ci";
import { RiUserStarLine } from "react-icons/ri";
import { MdMedicalServices } from "react-icons/md";
import { BASE_URL } from "../../Api/Api";




const AssociateDashboard = () => {

  const [user, setUser] = useState(null)
  const [associate, setAssociate] = useState(null);
  const [morningShift, setMorningShift] = useState(false);
  const [noonShift, setNoonShift] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


  useEffect(() => {
    const userdata = localStorage.getItem('user')
    const associatedata = localStorage.getItem('associate')
    if (userdata) {
      const userDetails = JSON.parse(userdata)
      const associateDetails = JSON.parse(associatedata)
      setUser(userDetails)
      setAssociate(associateDetails)
      console.log(associateDetails.id)
    }
  }, [])
  console.log(selectedDate)

  const today = new Date()
  const startDate = new Date(today.setDate(today.getDate() + 1))
  const endDate = new Date(today.setDate(today.getDate() + 7))

  const handleSubmit = async () => {

    let values = {
      associate_id: associate.id,
      date: selectedDate.toISOString().split('T')[0],
      is_morning: morningShift,
      is_noon: noonShift,
    }

    try {
      const response = await axios.post(`${BASE_URL}/booking/slot`, values)

      if (response.data) {
        toast.success("Slot Created")
        setMorningShift(false)
        setNoonShift(false)
        setSelectedDate(new Date())

      } else {
        toast.error("not found")
      }

    } catch (error) {
      toast.error("error found in catch")
      console.error("Error", error)
    }
  }


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
                Hi,<br />
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
              <div className='flex flex-col sm:flex-row space-x-0 sm:space-x-6'>
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
                      <Button variant='outlined' onClick={handleSubmit}>create availability</Button>
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
