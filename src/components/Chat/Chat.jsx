import React, { useEffect, useState, useRef } from 'react'
import ChatHead from './ChatHead';
import PrevChatBar from './PrevChatBar';
import { w3cwebsocket as W3CWebSocket, request } from 'websocket';
import axios from 'axios';
import { BASE_URL } from '../../api/api';

const Chat = (props) => {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const clientRef = useRef(null);

    const { chatperson } = props;

    console.log(chatperson, "show chat-per")

    let userData, userId, associateUser, associateId, sender, receiver, client

    if (chatperson.role === 'user') {
        console.log('workinggggggggggggg for associate')
        userId = chatperson.id
        console.log(userId, "user id ")
        associateUser = JSON.parse(localStorage.getItem('user'))
        if (associateUser) {
            console.log(associateUser.id, "assoo data and received user id", userId)
            sender = associateUser.id
            receiver = userId
            console.log(sender, receiver, "final check")
        }
    } else {
        console.log('workingggg for user')
        associateId = chatperson.id
        userData = JSON.parse(localStorage.getItem('userDetails'))
        console.log('user data', userData)
        if (userData) {
            console.log(" receiever", associateId)
            sender = userData.id
            console.log(" user id", sender)
            receiver = associateId
            console.log(userData.id, "user data and associate Id", associateId)

        }
    }
    useEffect(() => {
        if (sender && receiver) {
            clientRef.current = new W3CWebSocket(`ws://localhost:8000/ws/chat/${sender}_${receiver}/`);

            clientRef.current.onopen = () => {
                console.log('WebSocket Client Connected');
            };

            clientRef.current.onclose = () => {
                console.log('WebSocket Client Closed');
            };

            // clientRef.current.onmessage = (message) => {
            //     console.log('Raw message data:', message.data);
            //     const dataFromServer = JSON.parse(message.data);
            //     setMessages((prevMessages) => [...prevMessages, dataFromServer]);
            // };

            clientRef.current.onmessage = (message) => {
                console.log('Raw message data:', message.data);
                const dataFromServer = JSON.parse(message.data);
                setMessages((prevMessages) => [...prevMessages, ...dataFromServer]);
            };

            clientRef.current.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };
            getMessage()
        }

        return () => {
            if (clientRef.current) {
                clientRef.current.close();
            }
        };
    }, [sender, receiver]);



    const getMessage = async () => {

        console.log(sender, receiver, "check in messages getting request ")

        const response = await axios.get(`${BASE_URL}/chat/messages?sender=${sender}&receiver=${receiver}`)

        if (response.status === 200) {
            console.log(response.data, "messages existing")
            setMessages(response.data)
        }
    }

    const handleMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) {
            toast.error('Cannot be empty');
            return false;
        }

        const messageObject = { text: message, sender: sender };

        if (clientRef.current && clientRef.current.readyState === W3CWebSocket.OPEN) {
            console.log('Sending message:', JSON.stringify(messageObject));
            clientRef.current.send(JSON.stringify({ text: message, sender: sender }));
            console.log("object", message)
            setMessages((prevMessages) => [...prevMessages, { text: message, sender: sender }]);
            setMessage('');
        } else {
            console.error('WebSocket not open yet. Message not sent.');
        }
    };



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

                                <div
                                    key={index}
                                    // className={`inline-block ${message.receiver.id === sender ? 'self-end' : 'self-start'}`}
                                    // className={`inline-block ${message.receiver.id === sender ? 'self-start' : 'self-end'}`}
                                    className={`inline-block ${message.receiver && message.receiver.id === sender ? 'self-start' : 'self-end'}`}
                                >
                                    <div
                                        className={`max-w-xs p-3 relative ${message.receiver.id === sender
                                            ? 'bg-blue-500 text-white rounded-md rounded-br-none'
                                            : 'bg-gray-600 text-white rounded-md rounded-bl-none'
                                            }`}>
                                        <p className="text-sm">{message.message}</p>
                                        {/* {message.sender === 'user' && <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 "></div>}
                                        {message.sender !== 'user' && <div className="absolute bottom-0 left-0 w-4 h-4 bg-gray-300 "></div>} */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <Input /> */}
                    <div className="flex-shrink-0 p-4 border-t border-gray-200 mt-5">
                        <form className="flex items-center" onSubmit={handleMessage}>
                            <input
                                type="text" placeholder="Type a message..." value={message}
                                className="flex-grow px-4 py-2 rounded-l-md  focus:outline-none"
                                onChange={(e) => setMessage(e.target.value)} />
                            <button
                                type="submit"
                                className="px-5 py-3 ml-2 rounded-md bg-blue-500 text-white"
                                onClick={handleMessage}>
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