import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuHandler, MenuList, MenuItem, } from "@material-tailwind/react";
import { logoutUser } from '../../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/HcWhite.png'


export default function Header() {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const refresh = localStorage.getItem('refresh')
            console.log('refresh', refresh)
            if (refresh) {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
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

    return (
        <header className='bg-light-blue-0 shadow-sm '>
            <div className='flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto p-2'>
                <div className='flex justify-center md:justify-start mb-4 md:mb-0'>
                    <img src={logo} alt="Logo" className="h-20 w-24 p-0 hover:cursor-pointer" />
                </div>
                <div className='flex justify-center md:justify-end'>
                    <ul className='flex flex-col md:flex-row gap-4 md:gap-11 items-center justify-end font-serif text-xl'>
                        <Link to='/'>
                            <li className={isAuthenticated ? 'text-green-400' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Home</li>
                    </Link>
                    <li className={isAuthenticated ? 'text-green-400' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Bookings</li>
                    <li className={isAuthenticated ? 'text-green-400' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Associates</li>
                    <li className={isAuthenticated ? 'text-green-400' : 'text-black'} mb-2 md:mb-0 hover:cursor-pointer>Contact Us</li>

                    {isAuthenticated ?
                        (<Menu>
                            <MenuHandler>
                                <li className='text-green-400 md:mb-0 hover:cursor-pointer'><FaUserCircle /></li>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem>Profile</MenuItem>
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

