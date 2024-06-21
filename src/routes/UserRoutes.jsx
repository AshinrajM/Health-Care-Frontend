import { Route, Routes } from 'react-router-dom'

import SignIn from '../pages/user/Signin';
import SignUp from '../pages/user/Signup';
import Home from '../pages/user/Home'
import PrivateRouteUser from './PrivateRoutes/PrivateRouteUser'
import AssociateList from '../pages/user/AssociateList'
import BookingFinal from '../pages/user/BookingFinal'
import BookingSuccess from '../pages/user/BookingSuccess'
import BookingFailed from '../pages/user/BookingFailed'
import BookingHistory from '../pages/user/BookingHistory'
import UserChat from '../pages/user/UserChat'
import Profile from "../pages/user/Profile"
import NotFound from '../components/NotFound';


export default function UserRoutes() {
  return (
    <Routes>
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='' element={<Home />} />
      <Route path="*" element={<NotFound />} />

      <Route path='secured' element={<PrivateRouteUser />}>
        <Route path='profile' element={<Profile/>} />
        <Route path='associate-list' element={<AssociateList />} />
        <Route path='checkout' element={< BookingFinal />} />
        <Route path='success' element={< BookingSuccess />} />
        <Route path='failed' element={< BookingFailed />} />
        <Route path='bookings' element={< BookingHistory />} />
        <Route path='chat' element={< UserChat />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
