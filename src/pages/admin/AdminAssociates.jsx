import { FaLockOpen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Button, Card, Typography } from '@material-tailwind/react'
import { HiUserAdd } from "react-icons/hi";
import SideBar from '../../components/Sidebar/SideBar'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAssociates() {

    const [associates, setAssociates] = useState([])

    useEffect(() => {
        async function getAssociates() {
            try {
                const associates = await axios.get('http://127.0.0.1:8000/users/associatelist')
                console.log("associates", associates.data);
                setAssociates(associates.data)

            } catch (error) {
                console.log(error);
            }
        }
        getAssociates()
    }, [])
    return (
        <div className='bg-blue-gray-500 flex flex-col lg:flex-row'>
            <div className='lg:w-64 flex-none'>
                <SideBar />
            </div>
            <div className='flex-1 mx-4 lg:mx-10 my-4 lg:my-36'>
                <div className="flex justify-between p-1">
                    <Typography variant='h2' color='white' >Associates</Typography>
                    <Link to="/admin/entry/add-associates">
                        <Button color='white'><HiUserAdd className="w-7 h-7 " /></Button>
                    </Link>
                </div>
                <Card className='rounded-none bg-gray-100'>
                    <div className='overflow-x-auto'>
                        <table className='text-black w-full'>
                            <thead className='text-black' style={{ borderBottom: '1px dotted' }}>
                                <tr className='text-black'>
                                    <th className='p-2'>sl.no:</th>
                                    <th className='p-2'>Name</th>
                                    <th className='p-2'>Certificate NO.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    associates.map((associate, index) => (< tr key={associate.id || index} className='text-black' style={{ borderBottom: '1px dotted' }}>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{associate.name}</td>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{associate.certificate_no}</td>
                                        {/* <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                            {associate.is_active ? <FaLockOpen className="w-7 h-7" /> : <FaLock className="w-7 h-7" />}
                                        </td> */}
                                        {/* <td>{associate.is_active ? <Button color="red" size="sm">Block</Button> : <Button color="blue" size="sm">UnBlock</Button>}</td> */}
                                    </tr>
                                    ))
                                }
                            </tbody>
                            {/* <tbody>
                                <tr className='text-black' style={{ borderBottom: '1px dotted' }}>
                                    <td className='p-2' style={{ textAlign: 'center' }}>1</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>salman@example.com</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>Active</td>
                                    <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                        <FaLockOpen className="w-7 h-7" />
                                    </td>
                                </tr>
                            </tbody> */}
                            {/* <tbody>
                                <tr className='text-black' style={{ borderBottom: '1px dotted' }}>
                                    <td className='p-2' style={{ textAlign: 'center' }}>1</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>salman@example.com</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>Active</td>
                                    <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                        <FaLockOpen className="w-7 h-7" />
                                    </td>
                                </tr>
                            </tbody> */}
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}
