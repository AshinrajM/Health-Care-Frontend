import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuHandler, MenuList, MenuItem, } from "@material-tailwind/react";
import { logoutUser } from '../../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Hc2.png'
import { useEffect, useState } from 'react';


export default function Header() {

    const [email, setEmail] = useState('')
    const [menuOpen, setMenuOpen] = useState(false);

    
    const isAuthenticated = useSelector(state => state.user.userAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()



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

    useEffect(() => {
        if (isAuthenticated) {
            const user = localStorage.getItem('userDetails')
            if (user) {
                const userDetails = JSON.parse(user)
                setEmail(userDetails.email)

            }
        }
    })


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const headerStyle = {
        // fontFamily: 'Cinzel',
        fontFamily: 'Afacad',
        fontWeight: 900,
        fontSize:'22px'


    }

    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(100px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };

    const getColorClass = (baseClass) => {
        return isAuthenticated ? `${baseClass} text-blue-700` : `${baseClass} text-red-900`;
    };


    return (
        <header className='bg-light-blue-0 shadow-sm'>
            <div className='flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto p-4'>
                <div className='flex justify-between items-center w-full md:w-auto'>
                    <img src={logo} alt="Logo" className="h-16 w-24 p-0 hover:cursor-pointer" />
                    <button
                        className='md:hidden text-2xl text-blue-gray-500'
                        onClick={toggleMenu}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <div className={`flex-col md:flex md:flex-row ${menuOpen ? 'flex' : 'hidden'} w-full md:w-auto`} style={menuOpen ? divStyle : null}>
                    <ul className='flex flex-col md:flex-row gap-4 md:gap-11 items-center justify-end font-serif text-base md:text-xl p-4 md:p-0'>
                        <Link to='/'>
                            <li className={`${getColorClass('mb-2 md:mb-0 hover:cursor-pointer tracking-widest')}`} style={headerStyle}>HOME</li>
                        </Link>
                        <Link to={isAuthenticated ? '/secured/bookings' : '/signin'}>
                            <li className={`${getColorClass('mb-2 md:mb-0 hover:cursor-pointer tracking-widest')}`} style={headerStyle}>BOOKINGS</li>
                        </Link>
                        <Link to={isAuthenticated ? '/secured/associate-list' : '/signin'}>
                            <li className={`${getColorClass('mb-2 md:mb-0 hover:cursor-pointer tracking-widest')}`} style={headerStyle}>ASSOCIATES</li>
                        </Link>
                        <Link to='/'>
                            <li className={`${getColorClass('mb-2 md:mb-0 hover:cursor-pointer')}`} style={headerStyle}>CONTACT US</li>
                        </Link>
                        {isAuthenticated ? (
                            <Menu>
                                <MenuHandler>
                                    <li className={`${getColorClass('mb-2 md:mb-0 hover:cursor-pointer tracking-widest')}`}>
                                        <FaUserCircle className='text-2xl' /></li>
                                </MenuHandler>
                                <MenuList>
                                    <Link to='/secured/profile'>
                                        <MenuItem className='hover:cursor-pointer' style={headerStyle}>{email}</MenuItem>
                                    </Link>
                                    <MenuItem className='text-red-500 hover:cursor-pointer' onClick={handleLogout}>Log Out</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Link to='/signin'>
                                <li className={`${getColorClass('mb-2 md:mb-0 hover:cursor-pointer')}`}><FaUserCircle className='text-2xl' /></li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    )
}

