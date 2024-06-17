import { FaLockOpen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Button, Card, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { HiUserAdd } from "react-icons/hi";
import SideBar from '../../components/Sidebar/SideBar'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from '../../api/api'
import axios from "axios";


export default function AdminAssociates() {

    const [associates, setAssociates] = useState([])
    const [selectedAssociate, setSelectedAssociate] = useState(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleAssociate = async (associateId) => {
        setIsLoading(true);
        let values = {
            "associateId": associateId
        }

        try {
            const response = await axios.patch(`${BASE_URL}/users/associatelist`, values)
            console.log("response", response.data)
            setAssociates(prevAssociates => prevAssociates.map(associate =>
                associate.id === associateId ? { ...associate, is_active: !associate.is_active } : associate
            ));

        } catch (error) {

            console.log(error, "showing founded errors")
        }
        setIsLoading(false)
        setOpen(!open);
    };
    const handleOpen = (associateId, action) => {
        const associate = associates.find(a => a.id === associateId);
        setSelectedAssociate(associate);
        setOpen(!open);
    };

    return (
        <>
            <div className='bg-blue-gray-500 flex flex-col lg:flex-row h-screen'>
                <div className='md:w-64 md:fixed md:h-full'>
                    <SideBar />
                </div>
                <div className='flex-1 overflow-auto p-4 lg:ml-64 md:ml-64'>
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
                                            <td className='p-2' style={{ textAlign: 'center' }}>
                                                {index + 1}</td>
                                            <td className='p-2' style={{ textAlign: 'center' }}>
                                                {associate.name}</td>
                                            <td className='p-2' style={{ textAlign: 'center' }}>{associate.certificate_no}</td>
                                            {/* while blocking associate have to block associate and user because loggin is done by using user-associate */}
                                            <td className='p-2' style={{ display: 'flex', justifyContent: 'center' }}>
                                                {associate.is_active ? <FaLockOpen className="w-7 h-7" /> : <FaLock className="w-7 h-7" />}
                                            </td>
                                            <td className='p-2'>{associate.is_active ? <Button color="red" size="sm" className="rounded-none" onClick={() => handleOpen(associate.id)}>Block</Button> : <Button color="blue" size="sm" className="rounded-none" onClick={() => handleOpen(associate.id)}>UnBlock</Button>}</td>
                                        </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </Card>
                </div>
            </div>
            <Dialog open={open} associate={selectedAssociate}>
                <DialogHeader>Are you sure to {selectedAssociate?.is_active ? 'block' : 'unblock'} {selectedAssociate?.name}?</DialogHeader>
                <DialogBody>
                    {selectedAssociate?.is_active ? (
                        <>
                            The confirmed bookings related with <span className="font-bold">{selectedAssociate?.name}</span> has to be cancelled and need to be refunded.
                            Are you sure on this move??{selectedAssociate?.id}
                        </>
                    ) : (
                        null
                    )}

                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(!open)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green"
                        onClick={() => handleAssociate(selectedAssociate.id)}>
                        <span>
                            {isLoading
                                ? selectedAssociate?.is_active
                                    ? 'Blocking...'
                                    : 'Unblocking...'
                                : selectedAssociate?.is_active
                                    ? 'Block'
                                    : 'Unblock'}
                        </span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
