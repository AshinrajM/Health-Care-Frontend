import { Routes, Route } from "react-router-dom"
import Login from '../pages/admin/AdminLogin'


export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
        </Routes>
    )
}
