import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';


export default function Header() {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    return (
        <header className='bg-light-blue-0 shadow-sm '>
            <div className='flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto p-2'>
                <div className='flex justify-center md:justify-start mb-4 md:mb-0'>
                    <img src="src/assets/logo/logo3.png" alt="Logo" className="h-12 w-auto hover:cursor-pointer" />
                </div>
                <div className='flex justify-center md:justify-end'>
                    <ul className='flex flex-col md:flex-row gap-4 md:gap-11 items-center justify-end font-serif text-xl'>
                        <Link to='/'>
                            <li className='text-green-400 mb-2 md:mb-0 hover:cursor-pointer'>Home</li>
                        </Link>
                        <li className='text-green-400 mb-2 md:mb-0 hover:cursor-pointer '>Bookings</li>
                        <li className='text-green-400 mb-2 md:mb-0 hover:cursor-pointer'>Associates</li>
                        <li className='text-green-400 mb-2 md:mb-0 hover:cursor-pointer'>Contact Us</li>

                        {isAuthenticated ?
                            (<Menu>
                                <MenuHandler>
                                    <li className='text-green-400 md:mb-0 hover:cursor-pointer'><FaUserCircle /></li>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem className='text-red-500'>Log Out</MenuItem>
                                </MenuList>
                            </Menu>)
                            : (<Link to='/signin'>
                                <li className='text-black md:mb-0 hover:cursor-pointer'><FaUserCircle /></li>
                            </Link>)}
                    </ul>
                </div>
            </div>
        </header>


    )
}

