import { FaLockOpen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Button, Card, Typography } from '@material-tailwind/react'
import SideBar from '../../components/Sidebar/SideBar'
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getAllUser() {
            try {
                const users = await axios.get('http://127.0.0.1:8000/users/userslist')
                console.log("sdsd", users.data);
                // console.log("is", users.data.is_active);
                setUsers(users.data)

            } catch (error) {
                console.log(error);
            }
        }
        getAllUser()
    }, [])
    return (
        <div className='bg-blue-gray-500 flex flex-col lg:flex-row'>
            <div className='lg:w-64 flex-none'>
                <SideBar />
            </div>
            <div className='flex-1 mx-4 lg:mx-10 my-4 lg:my-36'>
                <Typography variant='h2' color='white'>Users</Typography>
                <Card className='rounded-none bg-gray-100'>
                    <div className='overflow-x-auto'>
                        <table className='text-black w-full'>
                            <thead className='text-black' style={{ borderBottom: '1px dotted' }}>
                                <tr className='text-black'>
                                    <th className='p-2'></th>
                                    <th className='p-2'>Email</th>
                                    <th className='p-2'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => (< tr key={user.id || index} className='text-black' style={{ borderBottom: '1px dotted' }}>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{user.email}</td>
                                        <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                            {user.is_active ? <FaLockOpen className="w-7 h-7" /> : <FaLock className="w-7 h-7" />}
                                        </td>
                                        <td>{user.is_active ? <Button color="red" size="sm">Block</Button> : <Button color="blue" size="sm">UnBlock</Button>}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>


                        </table>


                    </div>
                </Card>


            </div >
        </div >
    )
}
