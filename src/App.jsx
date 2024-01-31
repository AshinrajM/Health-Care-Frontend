import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Header from './components/Header/Header'
import AdminLogin from './pages/AdminLogin'



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
