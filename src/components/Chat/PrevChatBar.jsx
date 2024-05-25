import React from 'react'
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { VscHome } from 'react-icons/vsc';

const PrevChatBar = (props) => {

    const navigate = useNavigate()

    const { chatperson } = props;


    console.log(chatperson, "show chat per")


    const exit = () => {
        if (chatperson.role === 'associate') {

            navigate('/secured/bookings')
        } else {
            navigate('/associates/check/associate-bookings')
        }
    }

    const home = () => {

        if (chatperson.role === 'associate') {

            navigate('/')
        } else {
            navigate('/associates/check/associate-dashboard')
        }
    }



    return (
        <div className="w-1/5 bg-blue-gray-50">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="w-full flex items-center justify-between  mt-4">
                    <IoExitOutline className="w-10 h-10 rotate-180 hover:cursor-pointer" color="black"
                        onClick={exit} />
                    <VscHome className="w-10 h-10  hover:cursor-pointer" color="black" onClick={home} />
                </div>
            </div>
        </div>
    )
}

export default PrevChatBar


