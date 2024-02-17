import { Card, Input, Button, Typography, Textarea, Select, Option } from "@material-tailwind/react";
import SideBar from '../../components/Sidebar/SideBar'
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const initialValues = {
    name: '',
    email: '',
    date_of_birth: '',
    experience: '',
    certificate_no: '',
    gender: '',
    fee_per_hour: '',
    phone: '',


}

const generatePassword = () => {
    const characters = 'ABCDEFghijk123456789';
    let random = ''
    for (let i = 0; i < 6; i++) {
        random += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return random
}

export default function AddAssociates() {

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            console.log(values)
        }
    })
    console.log(formik.values)

    const [password, setPassword] = useState(0)

    useEffect(() => {
        const otp = generatePassword()
        setPassword(otp)
        console.log("otp", otp)
    }, [])



    return (
        <div className="bg-blue-gray-500 flex flex-col md:flex-row">
            <div>
                <SideBar />
            </div>
            <div className="flex-1 w-full md:w-1/ lg:w-1/3 mx-4 md:mx-10 mt-20">
                <Typography variant="h2" color="white">
                    Register
                </Typography>
                <Card className="">
                    <form className="" onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-6 mt-6">
                            <div className="w-full md:w-1/2">
                                <Input label="Name" name="name" onChange={formik.handleChange} value={formik.values.name} />
                            </div>
                            <div className="w-full md:w-1/2">
                                <Input label="Email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-6">
                            <div className="w-full md:w-1/3">
                                <Input label="DOB" name="date_of_birth" type="date" onChange={formik.handleChange}
                                    value={formik.values.date_of_birth} />
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input label="Experience" type="number" name="experience" onChange={formik.handleChange} value={formik.values.experience} />
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input label="Certificate No" name="certificate_no" onChange={formik.handleChange} value={formik.values.certificate_no} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-6">
                            <div className="w-full md:w-1/3">
                                <Input label="Fee/Hr" name="fee_per_hour" onChange={formik.handleChange} value={formik.values.fee_per_hour} />
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input label="Phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} />

                            </div>
                            <div className="w-full md:w-1/3">
                                <Input label="Location" name="location" onChange={formik.handleChange} value={formik.values.location} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-10">
                            <div className="w-full md:w-4/4">
                                <Textarea label="Description" name="description" size="lg" onChange={formik.handleChange} value={formik.values.description} />
                            </div>
                            <input type="text" name="password" value={password} hidden />


                        </div>
                        <div style={{ textAlign: 'center' }} className="mb-10">
                            <Button color="red" className="rounded-2xl" type="submit">Register</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
