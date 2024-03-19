import React from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, PowerIcon, PhotoIcon, UserGroupIcon, BriefcaseIcon }
    from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutAssociate } from '../../redux/userSlice';
import logo from '../../assets/logo/Hc2.png'


const SideBarAssociate = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        try {
            console.log("arrived onclick func")
            const associateRefresh = localStorage.getItem('associateRefresh')
            console.log("associateRefresh", associateRefresh)
            if (associateRefresh) {
                console.log("arrived with refresh")
                dispatch(logoutAssociate())
                navigate('/associates/login')
            } else {
                console.log("didnt got the refresh token")
            }
        } catch (error) {
            console.log("token not found")
        }
    }

    return (
        <>
            <Card className="h-[calc(100vh)] w-full max-w-[16rem] p-4 shadow-xl  bg-deep-orange-50 rounded-none">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        <img src={logo} alt="" />
                    </Typography>
                </div>
                <div className="mb-2 p-4">
                    <Typography variant="h4" color="blue-gray">
                        Associate Name
                    </Typography>
                </div>
                <List>
                    <Link to='/associates/check/dashboard'>
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
                    <Link to='/associates/entry/users'>
                        <ListItem>
                            <ListItemPrefix>
                                <UserGroupIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Chat
                        </ListItem>
                    </Link>
                    <Link to='/associates/check/associate-profile'>
                        <ListItem>
                            <ListItemPrefix>
                                <BriefcaseIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Associate Profile
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

export default SideBarAssociate