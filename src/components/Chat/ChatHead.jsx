import React, { useEffect } from 'react'
import axios from 'axios'

const ChatHead = (props) => {

    const { chatperson } = props

    console.log(chatperson, "in head com")

    const role = chatperson.role
    const id = chatperson.id

    useEffect(() => {

        if (role === 'associate') {
            getUser()
        } else {
            getAssociate()
        }

    }, [])

    const getUser = async () => {
        // const response = await axios.get(`${BASE_URL}/booking/bookings?userId=${id}&role=${role}`)
        // if (response.status === 200) {
        //     console.log(response.data, "received data in head")
        // }
    }
    const getAssociate = async () => {
        // const response = await axios.get(`${BASE_URL}/chat/identify?userId=${id}&role=${role}`)
        // if (response.status === 200) {
        //     console.log(response.data, "received data in head")
        // }
    }

    return (
        <div className="" style={{ position: 'static' }}>
            <p style={{ fontSize: '2rem', fontFamily: '-moz-initial', margin: '1rem' }} >{role === 'associate'?'Associate':'User'}</p>
            <hr className="mt-5 mb-5" />
        </div>
    )
}

export default ChatHead