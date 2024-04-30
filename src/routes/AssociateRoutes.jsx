import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AssociateLogin from '../pages/associate/AssociateLogin'
import AssociateDashboard from '../pages/associate/AssociateDashboard'
import PrivateRouteAssociate from '../routes/PrivateRoutes/PrivateRouteAssociate'
import AssociateProfile from '../pages/associate/AssociateProfile'
import Schedule from '../pages/associate/Schedule'
import Bookings from '../pages/associate/Bookings'

export default function AssociateRoutes() {
  return (
    <Routes>
      <Route path='login' element={<AssociateLogin />} />
      <Route path='check' element={<PrivateRouteAssociate />}>
        < Route path='associate-dashboard' element={< AssociateDashboard />} />
        < Route path='associate-profile' element={< AssociateProfile />} />
        < Route path='associate-schedules' element={< Schedule />} />
        < Route path='associate-bookings' element={< Bookings />} />
      </Route>
    </Routes >
  )
}
