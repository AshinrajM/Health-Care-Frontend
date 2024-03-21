import { useEffect, useState } from 'react'
import SideBarAssociate from '../../components/sideBarAssociate/sideBarAssociate';
import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Button
} from "@material-tailwind/react";
import Calendar from 'react-calendar';


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
    }
  }, [])

  const timeSlots = [
    '08.00AM-12.00PM',
    '01.00PM-05.00M',
  ];

  const handleTimeChange = (value) => {
    setSelectedTime(value);
    console.log(selectedTime, "choooosen time")
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(selectedDate, "choosen date")
  // };
  console.log(selectedDate)


  return (
    <div className='bg-brown-200 flex h-screen'>
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
          <Card className="m-10 w-full sm:w-auto">
            <CardBody>
              <Typography variant='h2' className='mb-5'>
                Schedule Dates
              </Typography>
              <div className='flex flex-col sm:flex-row space-x-0 sm:space-x-6'>
                <div className="w-full sm:w-96">
                  <Calendar onChange={(date) => setSelectedDate(date)} value={selectedDate} style={{ height: '500px' }} />
                </div>
                <div className="w-full sm:w-96">
                  <Card className="w-full">
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
                      <Button variant='outlined'>create availability</Button>
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
