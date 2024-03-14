import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import axios from 'axios'
import homeCover from '../../assets/cover/homeCover.png';
export default function Home() {

    // const [users, setUsers] = useState([])

    useEffect(() => {
        // async function getAllUser() {
        //     try {
        //         const users = await axios.get('http://127.0.0.1:8000/users/register')
        //         console.log(users.data);
        //         setUsers(users.data)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // getAllUser()
    }, [])
    return (
        <>
            <Header />
            <img className='w-full' src={homeCover} alt="home cover" />

            {/* <div>
                {
                    users.map((user, index) => {
                        return (
                            <>
                                <p key={user.id ? user.id : index}>{user.id}</p>
                            </>
                        )
                    })
                }


            </div > */}
        </>
    )
}




