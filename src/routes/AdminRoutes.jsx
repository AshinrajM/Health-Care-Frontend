import { Routes, Route } from "react-router-dom"
import Login from '../pages/admin/AdminLogin'
import AdminHome from "../pages/admin/AdminHome"


export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<AdminHome />} />
        </Routes>
    )
}
