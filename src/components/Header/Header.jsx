import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <header className='bg-light-blue-0 shadow-md '>
            <div className='flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto p-2'>
                <div className='flex justify-center md:justify-start mb-4 md:mb-0'>
                    <img src="src/assets/logo/logo3.png" alt="Logo" className="h-12 w-auto hover:cursor-pointer" />
                </div>
                <div className='flex justify-center md:justify-end'>
                    <ul className='flex flex-col md:flex-row gap-4 md:gap-11 items-center justify-end font-extralight33332222222222221 text-lg'>
                        <Link to='/'>
                            <li className='text-black mb-2 md:mb-0 hover:cursor-pointer hover:underline'>Home</li>
                        </Link>
                        <li className='text-black mb-2 md:mb-0 hover:cursor-pointer'>Bookings</li>
                        <li className='text-black mb-2 md:mb-0 hover:cursor-pointer'>Associates</li>
                        <li className='text-black mb-2 md:mb-0 hover:cursor-pointer'>Contact Us</li>
                        <Link to='/signin'>
                            <li className='text-black md:mb-0 hover:cursor-pointer'><FaUserCircle /></li>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>


    )
}

