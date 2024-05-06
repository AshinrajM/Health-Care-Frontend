import React from 'react'

const Input = () => {
    return (
        <div className="flex-shrink-0 p-4 border-t border-gray-200 mt-5">
            <form className="flex items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-grow px-4 py-2 rounded-l-md  focus:outline-none"
                />
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