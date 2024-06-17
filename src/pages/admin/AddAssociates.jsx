import { useState } from "react";
import { Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";
import SideBar from '../../components/Sidebar/SideBar'
import { useNavigate } from "react-router-dom";
import { Rings } from 'react-loader-spinner';
import { useFormik } from "formik";
import { useEffect } from "react";
import axios from "axios";



const initialValues = {
    name: '',
    email: '',
    age: '',
    experience: '',
    certificate_no: '',
    fee_per_hour: '',
    phone: '',
    password: '',
    location: '',
    description: ''
};

const validate = values => {
    let errors = {};

    const min_age = 21;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const noWhiteSpaceRegex = /^\S*$/;
    const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/;

    if (!values.name) {
        errors.name = "Name is required";
    } else if (!nameRegex.test(values.name)) {
        errors.name = "Name can contain only letters and one space";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email format";
    } else if (!noWhiteSpaceRegex.test(values.email)) {
        errors.email = "Email cannot contain spaces";
    }

    if (!values.age) {
        errors.age = "Age is required";
    } else if (values.age < min_age) {
        errors.age = "Age should be greater than 21";
    } else if (!noWhiteSpaceRegex.test(values.age)) {
        errors.age = "Age cannot contain spaces";
    }

    if (!values.experience) {
        errors.experience = "Experience is required";
    } else if (!noWhiteSpaceRegex.test(values.experience)) {
        errors.experience = "Experience cannot contain spaces";
    }

    if (!values.certificate_no) {
        errors.certificate_no = "Certificate number is required";
    } else if (!noWhiteSpaceRegex.test(values.certificate_no)) {
        errors.certificate_no = "Certificate number cannot contain spaces";
    }

    if (!values.fee_per_hour) {
        errors.fee_per_hour = "Fee per hour is required";
    } else if (!noWhiteSpaceRegex.test(values.fee_per_hour)) {
        errors.fee_per_hour = "Fee per hour cannot contain spaces";
    }

    if (!values.phone) {
        errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
        errors.phone = "Invalid phone number format";
    } else if (!noWhiteSpaceRegex.test(values.phone)) {
        errors.phone = "Phone number cannot contain spaces";
    }

    if (!values.location) {
        errors.location = "Location is required";
    } else if (!noWhiteSpaceRegex.test(values.location)) {
        errors.location = "Location cannot contain spaces";
    }

    // if (values.description) {
    //     errors.description = "Description cannot contain spaces";
    // }

    return errors;
};


const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allCharacters = uppercase + lowercase + digits + special;
    let password = '';
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += digits.charAt(Math.floor(Math.random() * digits.length));
    password += special.charAt(Math.floor(Math.random() * special.length));

    for (let i = 4; i < 8; i++) {
        password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    return password.split('').sort(() => 0.5 - Math.random()).join(''); // Shuffle the password
}




export default function AddAssociates() {


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const onSubmit = async (values, actions) => {
        setLoading(true);
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
        setLoading(false);

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
        <div className="bg-blue-gray-500 flex flex-col lg:flex-row h-screen">
            <div className='md:w-64 md:fixed md:h-full'>
                <SideBar />
            </div>
            <div className="flex-1 overflow-auto p-4 lg:ml-64 md:ml-64">
                <Typography variant="h2" color="white" className="mb-6">
                    Register
                </Typography>
                <Card className="">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-6 mt-6">
                            <div className="w-full md:w-1/2">
                                <Input
                                    label="Name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                                {formik.errors.name ? <p className='text-red-900 text-xs'>{formik.errors.name}</p> : null}
                            </div>
                            <div className="w-full md:w-1/2">
                                <Input
                                    label="Email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.errors.email ? <p className='text-red-900 text-xs'>{formik.errors.email}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-6">
                            <div className="w-full md:w-1/3">
                                <Input
                                    label="Age"
                                    name="age"
                                    type="number"
                                    min="21"
                                    onChange={formik.handleChange}
                                    value={formik.values.age}
                                />
                                {formik.errors.age ? <p className='text-red-900 text-xs'>{formik.errors.age}</p> : null}
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input
                                    label="Experience"
                                    type="number"
                                    name="experience"
                                    min="1"
                                    onChange={formik.handleChange}
                                    value={formik.values.experience}
                                />
                                {formik.errors.experience ? <p className='text-red-900 text-xs'>{formik.errors.experience}</p> : null}
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input
                                    label="Certificate No"
                                    name="certificate_no"
                                    onChange={formik.handleChange}
                                    value={formik.values.certificate_no}
                                />
                                {formik.errors.certificate_no ? <p className='text-red-900 text-xs'>{formik.errors.certificate_no}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-6">
                            <div className="w-full md:w-1/3">
                                <Input
                                    label="Fee/Hr"
                                    name="fee_per_hour"
                                    min="200"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.fee_per_hour}
                                />
                                {formik.errors.fee_per_hour ? <p className='text-red-900 text-xs'>{formik.errors.fee_per_hour}</p> : null}
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input
                                    label="Phone"
                                    name="phone"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                {formik.errors.phone ? <p className='text-red-900 text-xs'>{formik.errors.phone}</p> : null}
                            </div>
                            <div className="w-full md:w-1/3">
                                <Input
                                    label="Location"
                                    name="location"
                                    onChange={formik.handleChange}
                                    value={formik.values.location}
                                />
                                {formik.errors.location ? <p className='text-red-900 text-xs'>{formik.errors.location}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mx-5 gap-4 mb-10">
                            <div className="w-full md:w-4/4">
                                <Textarea
                                    label="Description"
                                    name="description"
                                    size="lg"
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                />
                                {formik.errors.description ? <p className='text-red-900 text-xs'>{formik.errors.description}</p> : null}
                            </div>
                            <input type="text" name="password" value={formik.values.password} readOnly hidden />
                        </div>
                        {/* <div className="flex flex-col md:flex-row mx-5 gap-4 mb-10">
                            <div className="w-full md:w-4/4">
                                <Typography variant="h6" color="blue-gray">
                                    Generated Password: {formik.values.password}
                                </Typography>
                                <input type="text" name="password" value={formik.values.password} readOnly hidden />
                            </div>
                        </div> */}
                        {/* <div style={{ textAlign: 'center' }} className="mb-10">
                            <Button color="red" className="rounded-2xl" type="submit">Register</Button>
                            {formik.errors.general && <p className="text-red-900 text-xs">{formik.errors.general}</p>}
                        </div> */}

                        <div style={{ textAlign: 'center' }} className="mb-10">
                            <Button color="red" className="rounded-2xl" type="submit" disabled={loading}>
                                {loading ? (
                                    <Rings
                                        height="30"
                                        width="30"
                                        color="#fff"
                                        ariaLabel="loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                ) : (
                                    'Register'
                                )}
                            </Button>
                            {formik.errors.general && <p className="text-red-900 text-xs">{formik.errors.general}</p>}
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
