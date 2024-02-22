import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AssociateLogin from '../pages/associate/AssociateLogin'
import AssociateDashboard from '../pages/associate/AssociateDashboard'
import PrivateRouteAssociate from '../routes/PrivateRoutes/PrivateRouteAssociate'
export default function AssociateRoutes() {
  return (
    <Routes>
      <Route path='login' element={<AssociateLogin />} />
      <Route path='check' element={<PrivateRouteAssociate />}>
        < Route path='dashboard' element={< AssociateDashboard />} />
      </Route>
    </Routes >
  )
}
