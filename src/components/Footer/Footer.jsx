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
        {/* <hr className='mx-5 border-t border-gray-500 mt-2 mb-2 opacity-65' /> */}
        <div className='px-5 py-10 bg-gray-100'>
            <div className='flex flex-col md:flex-row m-3 space-y-5 md:space-y-0 md:space-x-5'>
                <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                    <p className='font-serif text-center md:text-left text-blue-900'>
                        Healthcare is a fundamental aspect of modern society, encompassing a broad spectrum of services aimed at maintaining and improving people's health. It includes preventive measures such as vaccinations, regular check-ups, and health education, as well as diagnostic, therapeutic, and rehabilitative services for those facing illnesses or injuries.
                    </p>
                </div>
                <div className='flex flex-col md:flex-row w-full md:w-1/2 space-y-5 md:space-y-0 md:space-x-20'>
                    <div className='w-full md:w-1/2'>
                        <ol className='space-y-2 text-blue-900'>
                            <li className='text-sm'>About us</li>
                            <li className='text-sm'>FAQ</li>
                            <li className='text-sm'>Cancellation</li>
                            <li className='text-sm'>Contact Us</li>
                        </ol>
                    </div>
                    <div className='w-full md:w-1/2'>
                        <ol className='space-y-2 text-blue-900'>
                            <li className='text-sm'>Payments</li>
                            <li className='text-sm'>Security</li>
                            <li className='text-sm'>Privacy</li>
                            <li className='text-sm'>My Account</li>
                        </ol>
                    </div>
                    <div className='w-full md:w-auto'>
                        <p className='font-semibold text-center md:text-left mb-2 text-lg text-blue-900'>Find Us on Social</p>
                        <ol className='flex justify-center md:justify-start space-x-2 text-blue-900'>
                            <li><FaInstagram className='w-6 h-6' /></li>
                            <li><BsTwitterX className='w-6 h-6' /></li>
                            <li><FaMeta className='w-6 h-6' /></li>
                        </ol>
                        <div className='flex items-center justify-center md:justify-start mt-3'>
                            <CiLock className='text-blue-900 h-6 w-6' />
                            <span className='text-center md:text-left ml-2 font-serif text-blue-900'>100% Secure payments By</span>
                        </div>
                        <ol className='flex justify-center md:justify-start space-x-2 mt-2'>
                            <li><SiVisa className='w-12 h-8' color='blue' /></li>
                            <li><CiCreditCard1 className='w-12 h-8 text-blue-900' /></li>
                            <li><FaPaypal className='w-12 h-8 text-blue-900' /></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        {/* <hr className='mx-5 border-t border-gray-500 mt-2 mb-2 opacity-65' /> */}
    </>

    )
}

export default Footer