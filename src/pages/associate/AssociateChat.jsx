import React, { useEffect } from 'react'
import Chat from '../../components/Chat/Chat'

const AssociateChat = () => {

    const searchParams = new URLSearchParams(location.search)

    const id = searchParams.get("id")
    const role = searchParams.get("role")


    console.log("object", role, id)

    return (
        <>
            <Chat chatperson={{ id, role }} />
        </>
    )
}

export default AssociateChat