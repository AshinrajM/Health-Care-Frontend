import React from 'react'
import { IoExitOutline } from "react-icons/io5";


const PrevChatBar = () => {
    return (
        <div className="w-1/4 bg-blue-gray-50">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="w-1/2 flex items-center justify-start  mt-4">
                    <IoExitOutline className="w-10 h-10 rotate-180" color="white" />
                </div>
            </div>
        </div>
    )
}

export default PrevChatBar