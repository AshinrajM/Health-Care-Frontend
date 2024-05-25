import React from 'react'
import Chat from '../../components/Chat/Chat'
// import { useParams } from 'react-router-dom';
// import { useSearchParams, useLocation } from 'react-router-dom';


const UserChat = () => {

    const searchParams = new URLSearchParams(location.search)

    const id = searchParams.get("id")
    const role = searchParams.get("role")

    console.log(id, role, "checking of params");

    return (
        <>
            <Chat chatperson={{ id, role }} />
        </>
    )
}

export default UserChat