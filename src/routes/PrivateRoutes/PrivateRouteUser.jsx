import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


const PrivateRouteUser = () => {

    const userAuthenticated = useSelector(state => state.user.userAuthenticated)

    if (userAuthenticated) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }

}

export default PrivateRouteUser
