import React from 'react'
import { useState } from 'react'

const Input = ({ sendMessage }) => {

    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message)
        setMessage('')
    }

    return (
        <div className="flex-shrink-0 p-4 border-t border-gray-200 mt-5">
            <form className="flex items-center" onSubmit={handleSubmit}>
                <input
                    type="text" placeholder="Type a message..." value={message}
                    className="flex-grow px-4 py-2 rounded-l-md  focus:outline-none"
                    onChange={(e) => setMessage(e.target.value)} />
                <button
                    type="submit"
                    className="px-5 py-3 ml-2 rounded-md bg-blue-500 text-white">
                    Send
                </button>
            </form>
        </div>
    )
}


export default Input