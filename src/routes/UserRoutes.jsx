import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/user/SignIn'
import SignUp from '../pages/user/SignUp'
import Home from '../pages/user/Home'
import Profile from '../pages/user/profile'
import PrivateRouteUser from './PrivateRoutes/PrivateRouteUser'
import AssociateList from '../pages/user/AssociateList'
import BookingFinal from '../pages/user/BookingFinal'
import BookingSuccess from '../pages/user/BookingSuccess'
import BookingFailed from '../pages/user/BookingFailed'
import BookingHistory from '../pages/user/BookingHistory'
import Chat from '../pages/user/Chat'


export default function UserRoutes() {
  return (
    <Routes>
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='' element={<Home />} />
      <Route path='secured' element={<PrivateRouteUser />}>
        <Route path='profile' element={<Profile />} />
        <Route path='associate-list' element={<AssociateList />} />
        <Route path='checkout' element={< BookingFinal />} />
        <Route path='success' element={< BookingSuccess />} />
        <Route path='failed' element={< BookingFailed />} />
        <Route path='bookings' element={< BookingHistory />} />
        <Route path='chat' element={< Chat />} />
      </Route>
    </Routes>
  )
}
