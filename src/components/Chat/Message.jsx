import React from 'react'

const Message = ({ messages }) => {

    const mess = [
        { text: 'Hi there!', sender: 'bot' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },

    ];

    const messageList = Array.isArray(messages) ? messages : [];

    console.log(messageList, "show")

    return (


        <div className="flex-grow overflow-y-auto p-6">
            <div className="flex flex-col space-y-2">
                {messageList.map((message, index) => {
                    // Parse the JSON string
                    const parsedMessage = JSON.parse(message);
                    return (
                        <div
                            key={index}
                            className={`inline-block ${parsedMessage.sender === 'user' ? 'self-end' : 'self-start'}`}>
                            <div className={`max-w-xs p-3 relative ${parsedMessage.sender === 'user'
                                ? 'bg-blue-500 text-white rounded-md rounded-br-none'
                                : 'bg-gray-300 text-gray-800 rounded-md rounded-bl-none'}`}>
                                <p className="text-sm">{parsedMessage.message}</p>
                                {parsedMessage.sender === 'user' && (
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 "></div>
                                )}
                                {parsedMessage.sender !== 'user' && (
                                    <div className="absolute bottom-0 left-0 w-4 h-4 bg-gray-300 "></div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Message