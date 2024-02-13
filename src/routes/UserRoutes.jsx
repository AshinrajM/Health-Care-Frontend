import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/user/SignIn'
import SignUp from '../pages/user/SignUp'
import Home from '../pages/user/Home'

export default function UserRoutes() {
  return (
    <Routes>
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='' element={<Home />}></Route>
    </Routes>
  )
}