import React, { useEffect, useState, useRef } from 'react'
import ChatHead from './ChatHead';
import PrevChatBar from './PrevChatBar';
import axios from 'axios';
import { BASE_URL } from '../../api/api';

const Chat = (props) => {

    const [messages, setMessages] = useState([])
    const [messageContent, setMessageContent] = useState('')
    const [sender, setSender] = useState(null)
    const [receiver, setReceiver] = useState(null)
    const [socket, setSocket] = useState(null)


    const { chatperson } = props;
    console.log(chatperson, "show chat-per")

    useEffect(() => {
        let userData, userId, associateUser, associateId;
        if (chatperson.role === 'user') {
            console.log('working------ for ---- associate');
            userId = chatperson.id;
            console.log(userId, "user id ");
            associateUser = JSON.parse(localStorage.getItem('user'));
            if (associateUser) {
                console.log(associateUser.id, "assoo data and received user id", userId);
                setSender(associateUser.id);
                setReceiver(userId);
            }
        } else {
            console.log('workingggg for user');
            associateId = chatperson.id;
            userData = JSON.parse(localStorage.getItem('userDetails'));
            console.log('user data', userData);
            if (userData) {
                setSender(userData.id);
                setReceiver(associateId);
            }
        }
    }, [chatperson]);


    let ws
    useEffect(() => {
        if (sender && receiver) {
            async function getMessages() {
                try {
                    const response = await axios.get(`${BASE_URL}/chat/messages?sender=${sender}&receiver=${receiver}`)
                    if (response.status === 200) {
                        console.log(response.data, "messages existing")
                        setMessages(response.data)
                    }
                } catch (error) {
                    console.log("object", error)
                }
            }
            getMessages()

            ws = new WebSocket(`ws://localhost:8000/ws/chat/${sender}_${receiver}/`)
            setSocket(ws)
            console.log("ws items ", ws)

            ws.onopen = () => {
                console.log("socket connection is build")
            }

            ws.onmessage = (e) => {
                const message = JSON.parse(e.data)
                console.log("check received message", message)
                console.log("message for handling3", messages)

                const normalMessage = {
                    created: new Date().toISOString,
                    id: Date.now(),
                    is_read: false,
                    message: message.message,
                    receiver: { id: message.receiver }
                }
                setMessages((prevmessage) => [...prevmessage, normalMessage])
                console.log("message for handling2", messages)

            }

        }

    }, [sender, receiver]);



    const handleMessage = (e) => {
        e.preventDefault();
        if (!messageContent.trim()) {
            toast.error('Cannot be empty');
            return false;
        }
        console.log("message for handling1", messages)
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = {
                text: messageContent
            }
            setMessageContent('')
            socket.send(JSON.stringify(message))
        }

    };

    console.log("checking messages", messages)
    return (
        <>
            <div className="flex h-screen">
                <PrevChatBar chatperson={chatperson} />
                <div className="w-4/5 flex flex-col overflow-hidden">
                    <ChatHead chatperson={chatperson} />
                    {/* <Message messages={messages} /> */}
                    <div className="flex-grow overflow-y-auto p-6">
                        <div className="flex flex-col space-y-2">

                            {messages && messages.map((message, index) => (

                                <div key={index}
                                    className={`inline-block ${message.receiver && message.receiver.id === sender ? 'self-start' : 'self-end'}`}
                                >
                                    <div
                                        className={`max-w-xs p-3 relative ${message.receiver.id === sender
                                            ? 'bg-blue-500 text-white p-2 rounded-xl rounded-bl-none'
                                            : 'bg-gray-600 text-white p-2 rounded-xl rounded-br-none'
                                            }`}>
                                        <p className="text-sm">{message.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <Input /> */}
                    <div className="flex-shrink-0 p-4 border-t border-gray-200 mt-5">
                        <form className="flex items-center" onSubmit={handleMessage}>
                            <input
                                type="text" placeholder="Type a message..." value={messageContent}
                                className="flex-grow px-4 py-2 rounded-l-md  focus:outline-none"
                                onChange={(e) => setMessageContent(e.target.value)} />
                            <button
                                type="submit"
                                className="px-5 py-3 ml-2 rounded-md bg-blue-500 text-white"
                                onClick={() => handleMessage()}>
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat



{/* {messages && messages.map((message, index) => {
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
                            })} */}