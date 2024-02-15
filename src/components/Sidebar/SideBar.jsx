import React from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, PowerIcon, PhotoIcon, UserGroupIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/userSlice';

export default function SideBar() {

    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = async () => {
        try {
            const refresh = localStorage.getItem('refresh')
            console.log("refresh", refresh)
            if (refresh) {
                console.log("arrived with refresh")
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                dispatch(logoutUser())
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
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" >
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        HealthCare
                    </Typography>
                </div>
                <List>
                    <ListItem>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <ShoppingBagIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Bookings
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <UserGroupIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Users
                        <ListItemSuffix>
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <BriefcaseIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Associates
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <PhotoIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Banners
                    </ListItem>

                    <ListItem className='text-red-500 hover:bg-red-200'>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" /> {/* Apply text-red-500 class to the icon */}
                        </ListItemPrefix>
                        <p onClick={handleLogout}>Log Out</p> {/* Apply text-red-500 class to the text */}
                    </ListItem>
                </List>
            </Card>
        </>
    )
}
