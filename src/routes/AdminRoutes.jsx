import { Routes, Route } from "react-router-dom"
import Login from '../pages/admin/AdminLogin'
import AdminHome from "../pages/admin/AdminHome"
import PrivateRoute from "../components/PrivateRoute"
import AdminUsers from "../pages/admin/AdminUsers"
import { useSelector } from "react-redux"


export default function AdminRoutes() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    
    return (
        <Routes>
            {/* if (!isAuthenticated) { */}
                <Route path="login" element={<Login />} />
            {/* } */}
            <Route path="entry" element={<PrivateRoute />} >
                <Route path="dashboard" element={<AdminHome />} />
                <Route path="users" element={<AdminUsers />} />
            </Route>
        </Routes>
    )
}
