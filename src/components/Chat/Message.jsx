import React from 'react'

const Message = () => {

    const messages = [
        { text: 'Hi there!', sender: 'bot' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
        { text: 'Hello!', sender: 'user' },
        { text: 'Hi there!', sender: 'bot' },
        { text: 'How are you doing?', sender: 'user' },
        { text: 'I\'m doing great, thank you!', sender: 'bot' },
    ];

    return (
        <div className="flex-grow overflow-y-auto p-6">
            <div className="flex flex-col space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className={`inline-block ${message.sender === 'user' ? 'self-end' : 'self-start'}`}>
                        <div className={`max-w-xs rounded-lg p-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                            }`}>
                            <p className="text-sm">{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Message