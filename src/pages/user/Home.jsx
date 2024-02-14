import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import axios from 'axios'
import Slider from '../../components/Slider/Slider'

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
        <div>
            <Header />
            <img className='w-full' src="src\assets\sliderImages\slider.png" alt="" />
            {/* <Slider /> */}

            <div>
                {
                    users.map((user, i) => {
                        return (
                            <>
                                <p>welcome home</p>
                            </>
                        )
                    })
                }


            </div >
        </div>
    )
}




