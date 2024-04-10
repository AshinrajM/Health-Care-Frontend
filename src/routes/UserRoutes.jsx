import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/user/SignIn'
import SignUp from '../pages/user/SignUp'
import Home from '../pages/user/Home'
import Profile from '../pages/user/profile'
import PrivateRouteUser from './PrivateRoutes/PrivateRouteUser'
import AssociateList from '../pages/user/AssociateList'
import BookingFinal from '../pages/user/BookingFinal'

export default function UserRoutes() {
  return (
    <Routes>
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='' element={<Home />} />
      <Route path='secured' element={<PrivateRouteUser />}>
        <Route path='profile' element={<Profile />} />
        <Route path='associate-list' element={<AssociateList />} />
        <Route path='booking-confirm' element={< BookingFinal />} />
      </Route>
    </Routes>
  )
}
