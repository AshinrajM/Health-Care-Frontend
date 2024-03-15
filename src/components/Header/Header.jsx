import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuHandler, MenuList, MenuItem, } from "@material-tailwind/react";
import { logoutUser } from '../../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Hc2.png'
import { useEffect, useState } from 'react';


export default function Header() {

    const isAuthenticated = useSelector(state => state.user.userAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const[email,setEmail]=useState('')


    const handleLogout = async () => {
        try {
            const refresh = localStorage.getItem('userRefresh')
            console.log('refresh', refresh)
            if (refresh) {
                localStorage.removeItem('userAccess')
                localStorage.removeItem('userRefresh')
                dispatch(logoutUser())
                navigate('/signin')
            } else {
                console.log("Refreh token not found")
            }
        }
        catch (error) {
            console.log('Logout failed')
        }
    }

    useEffect(()=>{
        if(isAuthenticated){
            const user=localStorage.getItem('userDetails')
            if(user){
                const userDetails = JSON.parse(user)
                console.log(userDetails.email,userDetails.id,userDetails.wallet,"userdatas")
                setEmail(userDetails.email)

            }
        }
    })

    return (
        <header className='bg-light-blue-0 shadow-sm '>
            <div className='flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto p-2'>
                <div className='flex justify-center md:justify-start mb-4 md:mb-0'>
                    <img src={logo} alt="Logo" className="h-16 w-24 p-0 hover:cursor-pointer" />
                </div>
                <div className='flex justify-center md:justify-end'>
                    <ul className='flex flex-col md:flex-row gap-4 md:gap-11 items-center justify-end font-serif text-xl'>
                        <Link to='/'>
                            <li className={isAuthenticated ? 'text-blue-900' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Home</li>
                    </Link>
                    <li className={isAuthenticated ? 'text-blue-900' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Bookings</li>
                    <li className={isAuthenticated ? 'text-blue-900' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Associates</li>
                    <li className={isAuthenticated ? 'text-blue-900' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Contact Us</li>

                    {isAuthenticated ?
                        (<Menu>
                            <MenuHandler>
                                <li className='text-blue-900 md:mb-0 hover:cursor-pointer'><FaUserCircle /></li>
                            </MenuHandler>
                            <MenuList>
                                <Link to='/secured/profile'>
                                <MenuItem className='hover:cursor-pointer'>{email}</MenuItem>
                                </Link>
                                <MenuItem className='text-red-500' onClick={handleLogout}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>)
                        : (<Link to='/signin'>
                            <li className='text-black md:mb-0 hover:cursor-pointer'><FaUserCircle /></li>
                        </Link>)}
                </ul>
            </div>
        </div>
        </header >


    )
}

