import React, { useEffect, useState } from 'react'
// import { VscHome } from "react-icons/vsc";
import Input from "./Input";
import Message from './Message';
import ChatHead from './ChatHead';
import PrevChatBar from './PrevChatBar';
import { w3cwebsocket as W3CWebSocket } from 'websocket';


const Chat = () => {

    const [messages, setMessages] = useState('')

    const [user, setUser] = useState()


    const client = new W3CWebSocket('ws://localhost:8000/ws/chat/');

    useEffect(() => {

        const data = localStorage.getItem('userDetails')
        if (data) {
            const userDetails = JSON.parse(data)
            setUser(userDetails)
            console.log(userDetails, "datas")
        }

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        }
        client.onmessage = (message) => {
            console.log("Received message:", message.data);
            // const parsedMessage = JSON.parse(message.data);
            setMessages(prevMessages => [...prevMessages, message.data]);
        };


        client.onclose = () => {
            console.log('WebSocket Client Closed');
        };

        return () => {
            client.close();
        };

    }, [])

    const sendMessage = (message) => {
        client.send(JSON.stringify({ message }));
    };


    return (
        <>
            <div className="flex h-screen">
                <PrevChatBar />
                <div className="w-4/5 flex flex-col overflow-hidden">
                    <ChatHead />
                    <Message messages={messages} />
                    <Input sendMessage={sendMessage} />
                </div>
            </div>
        </>
    )
}

export default Chat