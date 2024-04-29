import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AssociateLogin from '../pages/associate/AssociateLogin'
import AssociateDashboard from '../pages/associate/AssociateDashboard'
import PrivateRouteAssociate from '../routes/PrivateRoutes/PrivateRouteAssociate'
import AssociateProfile from '../pages/associate/AssociateProfile'
import Schedule from '../pages/associate/Schedule'

export default function AssociateRoutes() {
  return (
    <Routes>
      <Route path='login' element={<AssociateLogin />} />
      <Route path='check' element={<PrivateRouteAssociate />}>
        < Route path='dashboard' element={< AssociateDashboard />} />
        < Route path='associate-profile' element={< AssociateProfile />} />
        < Route path='associate-schedules' element={< Schedule />} />
      </Route>
    </Routes >
  )
}
