import React, { useState } from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, PowerIcon, PhotoIcon, UserGroupIcon, BriefcaseIcon }
    from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutAdmin, logoutUser } from '../../redux/userSlice';
import bg from '../../assets/logo/Hc2.png'

export default function SideBar() {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


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

            {/* Hamburger icon to toggle the sidebar */}
            <div className="md:hidden">
                <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
                    <svg
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5h18a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                        />
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white transition duration-300 ease-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <Card className="h-[calc(100vh)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none h-full">
                    <div className="mb-2 p-4">
                        <Typography variant="h5" color="blue-gray">
                            <img src={bg} alt="" />
                        </Typography>
                    </div>
                    <List>
                        <Link to="/admin/entry/dashboard">
                            <ListItem>
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Dashboard
                            </ListItem>
                        </Link>
                        <Link to="/admin/entry/bookings-list">
                            <ListItem>
                                <ListItemPrefix>
                                    <ShoppingBagIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Bookings
                            </ListItem>
                        </Link>
                        <Link to="/admin/entry/users">
                            <ListItem>
                                <ListItemPrefix>
                                    <UserGroupIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Users
                            </ListItem>
                        </Link>
                        <Link to="/admin/entry/associates">
                            <ListItem>
                                <ListItemPrefix>
                                    <BriefcaseIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Associates
                            </ListItem>
                        </Link>
                        <ListItem
                            className="text-red-500 hover:bg-red-200"
                            onClick={handleLogout}
                        >
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            </div>

            {/* Overlay to close the sidebar on small screens */}
            <div
                className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ease-out ${isOpen ? 'block' : 'hidden'
                    }`}
                onClick={toggleSidebar}
            ></div>
        </>
    )
}
