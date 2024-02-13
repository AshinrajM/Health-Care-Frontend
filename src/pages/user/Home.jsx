import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import axios from 'axios'
import { data } from 'autoprefixer'


export default function Home() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getAllUser() {
            try {
                const users = await axios.get('http://127.0.0.1:8000/users/register')
                console.log(users.data);
                setUsers(users.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllUser()
    }, [])

    return (
        <>
            <Header />
            {/* Welcome to HealthCare app */}
            <div>
                {
                    users.map((user, i) => {
                        return (
                            <div>
                                <div>
                                    {/* <h2 key={i}>{user.username},{user.email}</h2> */}
                                </div>
                                <div>
                                    <h1 className='text-3xl text-center justify-center'>WElcome to Home</h1>
                                </div>
                            </div>

                        )
                    })
                }

                {/* <input type="text" placeholder='name' />
                <input type="text" placeholder='age' />
                <input type="text" placeholder='schoolname' /> */}

            </div>
        </>
    )
}




