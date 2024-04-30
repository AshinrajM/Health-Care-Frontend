import React, { useState } from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, PowerIcon, PhotoIcon, UserGroupIcon, BriefcaseIcon }
    from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutAdmin, logoutUser } from '../../redux/userSlice';

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
            <Card className="h-[calc(100vh)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        <img src="https://cdn3.vectorstock.com/i/1000x1000/08/42/medical-care-logo-icon-design-vector-22560842.jpg" alt="" />
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
                    <ListItem>
                        <ListItemPrefix>
                            <ShoppingBagIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Bookings
                    </ListItem>
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
                    <ListItem>
                        <ListItemPrefix>
                            <PhotoIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Banners
                    </ListItem>
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
