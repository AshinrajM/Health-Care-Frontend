import { Routes, Route } from "react-router-dom"
import Login from '../pages/admin/AdminLogin'
import AdminHome from "../pages/admin/AdminHome"
import PrivateRouteAdmin from "../components/PrivateRoutes/PrivateRouteAdmin"
import AdminUsers from "../pages/admin/AdminUsers"
import { useSelector } from "react-redux"
import AdminAssociates from "../pages/admin/AdminAssociates"
import AddAssociates from "../pages/admin/AddAssociates"


export default function AdminRoutes() {
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="entry" element={<PrivateRouteAdmin />} >
                <Route path="dashboard" element={<AdminHome />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="associates" element={<AdminAssociates />} />
                <Route path="add-associates" element={<AddAssociates />} />
            </Route>
        </Routes>
    )
}
