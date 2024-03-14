import React from 'react'
import logo from '../../assets/logo/Hc2.png';
import { FaInstagram } from "react-icons/fa6";
import { FaMeta } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { SiVisa } from "react-icons/si";
import { CiCreditCard1 } from "react-icons/ci";
import { FaPaypal } from "react-icons/fa";
import { CiLock } from "react-icons/ci";


const Footer = () => {
    return (
        <>
            <hr className='mx-5 border-t border-gray-500 mt-2 mb-2' />
            <div className=' mx-3 '>
                <div className='px-10 '>
                    <img src={logo} alt="logo" className='w-32 mx-auto md:mx-0' />
                </div>
                <div className='flex flex-col md:flex-row m-3  space-x-5'>
                    <div className='w-full md:w-1/2 mb-4 md:mb-0 mx-6'>
                        <p className='font-serif text-center md:text-left text-blue-900'>Healthcare is a fundamental aspect of modern society, encompassing a broad spectrum of services aimed at maintaining and improving people's health. It includes preventive measures such as vaccinations, regular check-ups, and health education, as well as diagnostic, therapeutic, and rehabilitative services for those facing illnesses or injuries.</p>
                    </div>
                    <div className='flex space-x-20 w-full md:w-1/2 pl-14'>
                        <div className='w-full md:w-auto mb-4 md:mb-0 '>
                            <ol className='space-y-2 text-blue-900'>
                                <li className='text-sm'>About us</li>
                                <li className='text-sm'>FaQ</li>
                                <li className='text-sm'>Cancellation</li>
                                <li className='text-sm'>Contact Us</li>
                            </ol>
                        </div>
                        <div className='w-full md:w-auto mb-4 md:mb-0'>
                            <ol className='space-y-2 text-blue-900'>
                                <li className='text-sm'>Payments</li>
                                <li className='text-sm'>Security</li>
                                <li className='text-sm'>Privacy</li>
                                <li className='text-sm'>My Account</li>
                            </ol>
                        </div>
                        <div className='w-full md:w-auto space-y-3 '>
                            <p className='font-semibold text-center md:text-left mb-2 text-lg text-blue-900'>Find Us on Social</p>
                            <ol className='flex justify-center md:justify-start space-x-2 text-blue-900'>
                                <li><FaInstagram className='w-12 h-6' /></li>
                                <li><BsTwitterX className='w-12 h-6' /></li>
                                <li><FaMeta className='w-12 h-6' />  </li>
                            </ol>
                            <div className='flex items-center'>
                                <CiLock className='text-blue-900 h-6 w-6' />
                                <p className='text-center md:text-left mt-2 font-serif text-blue-900' >100% Secure payments By</p>
                            </div>
                            <ol className='flex justify-center md:justify-start space-x-2 align-middle'>
                                <li><SiVisa className='w-12 h-8' color='blue' /></li>
                                <li><CiCreditCard1 className='w-12 h-8 text-blue-900' /></li>
                                <li><FaPaypal className='w-12 h-8 text-blue-900' /></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <hr />

        </>
    )
}

export default Footer