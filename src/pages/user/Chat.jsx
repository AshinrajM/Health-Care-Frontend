import React from 'react'
import { VscHome } from "react-icons/vsc";
import Input from "../../components/Chat/Input";
import Message from '../../components/Chat/Message';
import ChatHead from '../../components/Chat/ChatHead';
import PrevChatBar from '../../components/Chat/PrevChatBar';

const Chat = () => {
    return (
        <>
            <div className="flex h-screen">
                <PrevChatBar/>
                <div className="w-3/4 flex flex-col overflow-hidden">
                    <ChatHead />
                    <Message />
                    <Input />
                </div>
            </div>
        </>
    )
}

export default Chat