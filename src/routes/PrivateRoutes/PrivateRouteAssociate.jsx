import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


const PrivateRouteAssociate = () => {

  const associateAuthenticated = useSelector(state => state.user.associateAuthenticated)

  if (associateAuthenticated) {
    return <Outlet />
  } else {
    return <Navigate to={'/associates/login'} />
  }

}

export default PrivateRouteAssociate