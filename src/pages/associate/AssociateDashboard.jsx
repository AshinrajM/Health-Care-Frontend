import { useEffect, useState } from 'react'
import SideBarAssociate from '../../components/sideBarAssociate/sideBarAssociate';
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';

import { Calendar } from 'primereact/calendar';


const AssociateDashboard = () => {

  const [user, setUser] = useState(null)
  const [associate, setAssociate] = useState(null);


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


  return (
    <div className='bg-brown-200 flex'>
      <div>
        <SideBarAssociate />
      </div>
      <div>
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
          <Card className="m-10 w-auto">
            <CardBody>
              <Typography variant='h2'>
                Schedule Dates
              </Typography>
              {/* <div className="flex-auto">
                <label htmlFor="calendar-12h" className="font-bold block mb-2">
                  12h Format
                </label>
                <Calendar className='text-red-400' id="calendar-12h" value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
              </div> */}
            </CardBody>
          </Card>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default AssociateDashboard
