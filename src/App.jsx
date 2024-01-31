import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/user/Home'
import Signin from './pages/user/Signin'
import Signup from './pages/user/Signup'
import Header from './components/Header/Header'
import AdminLogin from './pages/admin/AdminLogin'



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/admin-log-in' element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  )
}
