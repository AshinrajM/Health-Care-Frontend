import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import SideBarAssociate from '../../components/sideBarAssociate/sideBarAssociate';
import logo from '../../assets/logo/Hc2.png'



const AssociateDashboard = () => {
  return (
    <div className='bg-brown-200'>
      {/* <header className='flex justify-between bg-white  p-1 items-center'>
        <div className='h-11 w-20 '>
          <img src={logo} alt="logo" className='object-fill lg:h-12 lg:w-16 md:h-8 md:w-12 sm:h-6 sm:w-8 xs:h-4 xs:w-6' />
        </div>
        <div className='flex items-center'  >
          <div><CgProfile className='h-12 w-8 text-blue-900' /></div>
          <div><IoMdArrowDropdown className='h-6 w-6 text-blue-900' /></div>
        </div>
      </header> */}
      <div>
        <SideBarAssociate />
      </div>

    </div>
  )
}

export default AssociateDashboard
