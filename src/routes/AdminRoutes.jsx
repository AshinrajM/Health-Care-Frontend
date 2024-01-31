import { Routes, Route } from "react-router-dom"
import AdminLogin from "../pages/AdminLogin"

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} />
        </Routes>
    )
}
