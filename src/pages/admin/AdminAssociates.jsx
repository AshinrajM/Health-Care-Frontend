import { FaLockOpen } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { Button, Card, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react'
import { HiUserAdd } from "react-icons/hi";
import SideBar from '../../components/Sidebar/SideBar'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import addMoney from '../../assets/homePageIcons/rupees.png'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../api/api";


export default function AdminAssociates() {

    const [associates, setAssociates] = useState([])
    const [selectedAssociate, setSelectedAssociate] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);
    const [salary, setSalary] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;


    useEffect(() => {
        async function getAssociates() {
            try {
                // const associates = await axios.get(`${BASE_URL}/users/associatelist`)
                const associates = await axiosInstance.get('/users/associatelist')
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
            // const response = await axios.patch(`${BASE_URL}/users/associatelist`, values)
            const response = await axiosInstance.patch('/users/associatelist', values)
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

    const handleAssociateSalary = async (associateId) => {

        if (salary === '') {
            setError('Salary cannot be empty.');
            return;
        }

        setIsLoading(true);
        let values = {
            "associateId": associateId,
            "salary": salary,
        }
        console.log("send values", salary)
        try {
            // const response = await axios.patch(`${BASE_URL}/users/update-associate-fee`, values)
            const response = await axiosInstance.patch('/users/update-associate-fee', values)
            console.log(response, "response")
            if (response.status === 200) {
                toast.success(response.data.message);
                const updatedAssociate = response.data
                setAssociates(prevAssociates =>
                    prevAssociates.map(associate =>
                        associate.id === associateId ? updatedAssociate : associate
                    )
                );
            } else {
                toast.error("Failed to update associate fee.");
            }
        } catch (error) {
            console.log(error, "showing founded errors")
        }
        setOpen2(!open2)
        setIsLoading(false)
    }

    const handleCloseModal = () => {
        setOpen2(false);
        setError(''); // Reset error state
        setSalary(''); // Optionally reset the salary input
    };

    const handleOpen = (associateId, action) => {
        const associate = associates.find(a => a.id === associateId);
        setSelectedAssociate(associate);
        setOpen(!open);
    };

    const handleSalary = (associateId, action) => {
        const associate = associates.find(a => a.id === associateId);
        setSelectedAssociate(associate);
        setSalary(associate.fee_per_hour)
        setOpen2(!open2);
    };



    const totalPages = Math.ceil(associates.length / itemsPerPage);

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
    const currentAssociates = associates.slice(startIndex, startIndex + itemsPerPage);


    const handleSalaryChange = (value) => {
        // Remove leading zeros
        if (/^0+/.test(value)) {
            setError('Leading zeros are not allowed.');
            return;
        }
        if (value === '') {
            setError('Salary cannot be empty.');
            setSalary('');
            return;
        }

        // Ensure the salary meets the minimum value requirement
        const minValue = selectedAssociate?.fee_per_hour || 0;
        if (value && parseFloat(value) < minValue) {
            setError(`Salary must be at least ${minValue}`);
            return;
        }

        // Format the salary to include .00
        if (value) {
            value = parseFloat(value).toFixed(2);
        }

        setError(''); // Clear any previous errors
        setSalary(value);
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
                        <div className="overflow-x-auto">
                            <table className="text-black w-full table-auto">
                                <thead className="text-black border-b-2">
                                    <tr className="text-black">
                                        <th className="p-2 text-center">Sl. No:</th>
                                        <th className="p-2 text-center">Name</th>
                                        <th className="p-2 text-center">Certificate No.</th>
                                        <th className="p-2 text-center">Acc.Status</th>
                                        <th className="p-2 text-center">Block/Unblock</th>
                                        <th className="p-2 text-center">Fee/hr</th>
                                        <th className="p-2 text-center">Update Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {associates.map((associate, index) => ( */}
                                    {currentAssociates.map((associate, index) => (
                                        <tr key={associate.id || index} className="text-black border-b">
                                            {/* <td className="p-2 text-center">{index + 1}</td> */}
                                            <td className="p-2 text-center">{startIndex + index + 1}</td>
                                            <td className="p-2 text-center">{associate.name}</td>
                                            <td className="p-2 text-center">{associate.certificate_no}</td>
                                            <td className="p-2 text-center">
                                                <div className="flex justify-center">
                                                    {associate.is_active ? (
                                                        <FaLockOpen className="w-7 h-7" />
                                                    ) : (
                                                        <FaLock className="w-7 h-7" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-2 text-center">
                                                {associate.is_active ? (
                                                    <Button color="red" size="sm" className="rounded-none"
                                                        onClick={() => handleOpen(associate.id)}>
                                                        Block
                                                    </Button>
                                                ) : (
                                                    <Button color="blue" size="sm" className="rounded-none" onClick={() => handleOpen(associate.id)}>
                                                        Unblock
                                                    </Button>
                                                )}
                                            </td>
                                            <td className="p-2 text-center">₹{associate.fee_per_hour}</td>
                                            <td className="p-2 text-center">
                                                <Button size="sm" color="cyan" className="rounded-2xl shadow-md w-11 h-11 p-1" onClick={() => handleSalary(associate.id)}>
                                                    <img src={addMoney} alt="add" className="h-7 w-7 inline-block" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                <GrFormPrevious className="h-6 w-6" />
                            </Button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                <MdNavigateNext className="h-6 w-6" />
                            </Button>
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
            <Dialog open={open2} associate={selectedAssociate}>
                <DialogHeader>Are you sure to update the fee ({selectedAssociate?.fee_per_hour}) of  {selectedAssociate?.name}</DialogHeader>
                <DialogBody>
                    <div>
                        <Input type="number" value={salary} min={selectedAssociate?.fee_per_hour}
                            onChange={(e) => handleSalaryChange(e.target.value)}></Input>
                        {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleCloseModal}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => handleAssociateSalary(selectedAssociate.id)}
                        disabled={!!error || !salary} // Disable the button if there's an error or the salary is empty 
                    >
                        <span>
                            {isLoading ? 'Updating...' : 'Update'}
                        </span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
