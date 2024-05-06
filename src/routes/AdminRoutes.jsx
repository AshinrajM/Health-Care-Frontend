import { Routes, Route } from "react-router-dom"
import Login from '../pages/admin/AdminLogin'
import AdminHome from "../pages/admin/AdminHome"
import PrivateRouteAdmin from "../routes/PrivateRoutes/PrivateRouteAdmin"
import AdminUsers from "../pages/admin/AdminUsers"
import AdminAssociates from "../pages/admin/AdminAssociates"
import AddAssociates from "../pages/admin/AddAssociates"
import BookingsList from "../pages/admin/BookingsList"


export default function AdminRoutes() {

    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="entry" element={<PrivateRouteAdmin />} >
                <Route path="dashboard" element={<AdminHome />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="associates" element={<AdminAssociates />} />
                <Route path="add-associates" element={<AddAssociates />} />
                <Route path="bookings-list" element={<BookingsList />} />
            </Route>
        </Routes>
    )
}
