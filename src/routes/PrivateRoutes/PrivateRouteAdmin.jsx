import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteAdmin = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    console.log(isAuthenticated, "check")

    if (isAuthenticated) {
        return <Outlet />
    } else {
        return <Navigate to={'/admin/login'} />
    }
}

export default PrivateRouteAdmin