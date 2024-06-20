import { FaLockOpen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Button, Card, Typography } from '@material-tailwind/react'
import SideBar from '../../components/Sidebar/SideBar'
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from '../../api/api'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";


export default function AdminUsers() {

    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserStatus, setSelectedUserStatus] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        async function getAllUser() {
            try {
                const users = await axios.get(`${BASE_URL}/users/userslist`)
                console.log("sdsd", users.data);
                setUsers(users.data)

            } catch (error) {
                console.log(error);
            }
        }
        getAllUser()
    }, [])

    const toggleConfirmModal = () => {
        setConfirmModalOpen(!confirmModalOpen);
    };

    const handleUserStatusChange = async (userId, is_active) => {
        setSelectedUserId(userId);
        setSelectedUserStatus(is_active);
        setShowModal(true);
    }


    const confirmUserStatusChange = async () => {
        try {
            const data = { userId: selectedUserId }
            const response = await axios.patch(`${BASE_URL}/users/register`, data)
            toast.success("User status changed", response.data.email)
            console.log("User status changed", response.data.email)

            setUsers(prevUsers => prevUsers.map(user => {
                if (user.id === selectedUserId) {
                    return {
                        ...user,
                        is_active: !selectedUserStatus
                    };
                }
                return user;
            }));
            setShowModal(false);
        } catch (error) {
            console.log(error)
            toast.error("Error found")
        }
    }

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);


    return (
        <div className='bg-blue-gray-500 flex flex-col lg:flex-row h-screen'>
            <div className='md:w-64 md:fixed md:h-full'>
                <SideBar />
            </div>
            <div className='flex-1 overflow-auto p-4 lg:ml-64 md:ml-64'>
                <Typography variant='h2' color='white'>Users</Typography>
                <Card className='rounded-none bg-gray-100'>
                    {users.length === 0 ? (
                        <div className='bg-blue-gray-500 flex flex-col lg:flex-row'>
                            <div className='lg:w-64 flex-none'>
                                <SideBar />
                            </div>
                            <div className='flex-1 justify-center mx-16 mt-10'>
                                <Typography variant='h2' color='white' className='flex justify-center mb-6'>No Bookings Yet</Typography>
                            </div>
                        </div>
                    ) : (
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
                                    {/* {users.filter(user => !user.is_superuser).map((user, index) => */}
                                    {currentUsers.map((user, index) =>
                                    (< tr key={user.id || index} className='text-black' style={{ borderBottom: '1px dotted' }}>
                                        <td className='p-2' style={{ textAlign: 'center' }}>
                                            {startIndex + index + 1}</td>
                                        <td className='p-2' style={{ textAlign: 'center' }}>{user.email}</td>
                                        <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                            {user.is_active ? <FaLockOpen className="w-7 h-7" /> :
                                                <FaLock className="w-7 h-7" />}
                                        </td>
                                        <td>
                                            {user.is_active ? (
                                                <Button color="red" size="sm" onClick={() => handleUserStatusChange(user.id, user.is_active)}>Block</Button>
                                            ) : (
                                                <Button onClick={() => handleUserStatusChange(user.id, user.is_active)} color="blue" size="sm">UnBlock</Button>
                                            )}
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className='flex justify-between items-center p-4'>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            <GrFormPrevious className='h-6 w-6' />
                        </Button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <MdNavigateNext className='h-6 w-6' />
                        </Button>
                    </div>
                </Card>
            </div >
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-teal-50 rounded-lg shadow-lg p-10">
                            <p className="text-xl">
                                {selectedUserStatus
                                    ? "Are you sure you want to block this user?"
                                    : "Are you sure you want to unblock this user?"}
                            </p>
                            <div className="mt-10 gap-5 flex justify-center ">
                                <Button color="red" className="mr-2" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                                <Button color="green" onClick={confirmUserStatusChange}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}
