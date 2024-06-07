import React, { useState } from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, PowerIcon, PhotoIcon, UserGroupIcon, BriefcaseIcon }
    from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutAdmin, logoutUser } from '../../redux/userSlice';
import bg from '../../assets/logo/Hc2.png'

export default function SideBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        try {
            console.log("arrived onclick func")
            const adminRefresh = localStorage.getItem('adminRefresh')
            console.log("adminRefresh", adminRefresh)
            if (adminRefresh) {
                console.log("arrived with refresh")
                dispatch(logoutAdmin())
                navigate('/admin/login')
            } else {
                console.log("didnt got the refresh token")
            }
        } catch (error) {
            console.log("token not found")
        }
    }
    return (
        <>
            <Card className="h-[calc(100vh)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none h-full ">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        <img src={bg} alt="" />
                    </Typography>
                </div>
                <List>
                    <Link to='/admin/entry/dashboard'>
                        <ListItem>
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>
                    <Link to='/admin/entry/bookings-list'>
                        <ListItem>
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Bookings
                        </ListItem>
                    </Link>
                    <Link to='/admin/entry/users'>
                        <ListItem>
                            <ListItemPrefix>
                                <UserGroupIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Users
                        </ListItem>
                    </Link>
                    <Link to='/admin/entry/associates'>
                        <ListItem>
                            <ListItemPrefix>
                                <BriefcaseIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Associates
                        </ListItem>
                    </Link>
                    <ListItem className='text-red-500 hover:bg-red-200' onClick={handleLogout}>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </>
    )
}
