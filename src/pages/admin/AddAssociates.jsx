import { Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";
import SideBar from '../../components/Sidebar/SideBar'
import { useFormik } from "formik";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
    name: '',
    email: '',
    age: '',
    experience: '',
    certificate_no: '',
    fee_per_hour: '',
    phone: '',
    password: '',


}
const validate = values => {

    let errors = {}

    const min_age = 21

    if (!values.email) {
        errors.email = "Required"
    }

    if (!values.age) {
        errors.age = "Required"
    } else if (values.age < min_age) {
        errors.age = "Age should be greater than 21"
        console.log("age error found")
    }

    if (!values.certificate_no) {
        errors.certificate_no = "Required"
    }

    return errors

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

    const navigate = useNavigate()

    const onSubmit = async (values, actions) => {

        console.log('submitted form :', values)

        try {
            const response = await axios.post('http://127.0.0.1:8000/users/register-associate', values)
            console.log("response:", response.data)

            if (response) {
                console.log("associate creation successfull")
                navigate('/admin/entry/associates')
            } else {
                actions.setErrors({ general: 'signup failed' });
            }
        } catch (error) {
            console.log('Error', error)
            actions.setErrors({ general: 'An error occurred. Please try again later.' });
        }

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    })
    console.log('Form values:', formik.values);
    console.log('form error:', formik.errors);


    useEffect(() => {
        const otp = generatePassword()
        console.log("otp", otp)
        formik.setValues({ ...formik.values, password: otp })
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
                                {formik.errors.email ? <p className='text-red-900 text-xs self-end'>{formik.errors.email}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-6">
                            <div className="w-full md:w-1/3">
                                <Input label="Age" name="age" type="number" onChange={formik.handleChange}
                                    value={formik.values.age} />
                                {formik.errors.age ? <p className='text-red-900 text-xs self-end'>{formik.errors.age}</p> : null}
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input label="Experience" type="number" name="experience" onChange={formik.handleChange} value={formik.values.experience} />
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input label="Certificate No" name="certificate_no" onChange={formik.handleChange} value={formik.values.certificate_no} />
                                {formik.errors.certificate_no ? <p className='text-red-900 text-xs self-end'>{formik.errors.certificate_no}</p> : null}
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
                            <input type="text" name="password" value={formik.values.password} readOnly />
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
