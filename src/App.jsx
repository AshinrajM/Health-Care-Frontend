import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import AssociateRoutes from './routes/AssociateRoutes'



export default function App() {
  return (
    <Routes>
      <Route path='/*' element={<UserRoutes />} />
      <Route path='/admin/*' element={<AdminRoutes />} />
      <Route path='/associates/*' element={<AssociateRoutes />} />
    </Routes>
  )
}
