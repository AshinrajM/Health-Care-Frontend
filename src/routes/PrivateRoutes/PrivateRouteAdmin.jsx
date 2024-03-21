import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteAdmin = () => {

    const adminAuthenticated = useSelector(state => state.user.adminAuthenticated)
    console.log(adminAuthenticated, "check")

    if (adminAuthenticated) {
        return <Outlet />
    } else {
        return <Navigate to={'/admin/login'} />
    }
}

export default PrivateRouteAdmin