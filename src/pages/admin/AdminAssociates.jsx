import { FaLockOpen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Card, Typography } from '@material-tailwind/react'
import SideBar from '../../components/Sidebar/SideBar'

export default function AdminAssociates() {
    return (
        <div className='bg-blue-gray-500 flex flex-col lg:flex-row'>
            <div className='lg:w-64 flex-none'>
                <SideBar />
            </div>
            <div className='flex-1 mx-4 lg:mx-10 my-4 lg:my-36'>
                <Typography variant='h2' color='white'>Associates</Typography>
                <Card className='rounded-none bg-gray-100'>
                    <div className='overflow-x-auto'>
                        <table className='text-black w-full'>
                            <thead className='text-black' style={{ borderBottom: '1px dotted' }}>
                                <tr className='text-black'>
                                    <th className='p-2'>#</th>
                                    <th className='p-2'>Email</th>
                                    <th className='p-2'>Status</th>
                                    <th className='p-2'>Block/Unblock</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-black' style={{ borderBottom: '1px dotted' }}>
                                    <td className='p-2' style={{ textAlign: 'center' }}>1</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>salman@example.com</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>Active</td>
                                    <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                        <FaLockOpen className="w-7 h-7" />
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className='text-black' >
                                    <td className='p-2' style={{ textAlign: 'center' }}>2</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>salman@example.com</td>
                                    <td className='p-2' style={{ textAlign: 'center' }}>Blocked</td>
                                    <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                        <FaLock className="w-7 h-7" />
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </Card>


            </div>
        </div>
    )
}
