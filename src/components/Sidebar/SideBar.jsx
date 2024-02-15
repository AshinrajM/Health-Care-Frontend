import React from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, PowerIcon, PhotoIcon, UserGroupIcon, BriefcaseIcon }
    from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '../../redux/userSlice';

export default function SideBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        try {
            console.log("arrived onclick func")
            const refresh = localStorage.getItem('refresh')
            console.log("refresh", refresh)
            if (refresh) {
                console.log("arrived with refresh")
                dispatch(logoutUser())
                navigate('/admin/login')
            } else {
                console.log("didnt got the refresh token")
            }
        } catch (error) {
            console.log("token not found")
        }
    }
    const usersPage = () => {
        navigate('/admin/entry/users')
    }

    return (
        <>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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
                    <Link to='/admin/entry/users'>
                        <ListItem>
                            <ListItemPrefix>
                                <UserGroupIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Users
                        </ListItem>
                    </Link>
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
