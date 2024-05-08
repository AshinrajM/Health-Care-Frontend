import React, { useEffect } from 'react'
import Chat from '../../components/Chat/Chat'

const AssociateChat = (chatperson) => {

    useEffect(() => { 
        console.log("object")
    })

    return (
        <>
            <Chat chatperson={chatperson} />
        </>
    )
}

export default AssociateChat