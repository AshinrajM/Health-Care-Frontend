import Header from '../../components/Header/Header'
import { Card, Typography, Input, Button, Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react'
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../api/baseUrl';
import axiosInstance from '../../api/api';
import { ClipLoader } from 'react-spinners';
import bg from '../../assets/background/signup.jpg'
import Skeleton from 'react-loading-skeleton';

const initialValues = {
    email: '',
    password: '',
    confirm_password: ''
}


const validate = values => {

    let errors = {}

    if (!values.email) {
        errors.email = "Email field can't be empty";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid Email format'
    }


    if (!values.password) {
        errors.password = "Password field can't be empty"
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)) {
        errors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.'
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Password field can't be empty"
    } else if (values.password !== values.confirm_password) {
        errors.confirm_password = "Passwords didn't match"
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.confirm_password)) {
        errors.confirm_password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.'
    }
    return errors
}


export default function SignUp() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [tempId, setTempId] = useState("")
    const [pageLoading, setPageLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [otpError, setOtpError] = useState('');




    const handleCallbackResponse = (response) => {
        console.log("Encoded jwt id token:" + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject)

        const data = {
            email: userObject.email,
            password: userObject.sub,
        }
        console.log(data.email, data.password, "checked")

        signUpGoogle(data)
    }

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 300); // Simulate loading delay
    }, []);

    useEffect(() => {

        if (!pageLoading) {
            /* global google*/
            google.accounts.id.initialize({
                client_id: "443952256934-sn2mj7pnfnblangilokooid8mvd81ldl.apps.googleusercontent.com",
                callback: handleCallbackResponse
            });
            google.accounts.id.renderButton(
                document.getElementById('signinDiv'),
                { theme: "outline", size: "large" }
            )
        }

    }, [pageLoading])

    const signUpGoogle = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/google-signup`, data)
            console.log("Response:", response.data)
            if (response.data) {
                console.log("arrived success", response.data)
                toast.success("Successfull SignUp")
                navigate('/signin')
            } else {
                actions.setErrors({ general: 'Login failed. Please try again.' });
            }
        } catch (error) {
            console.log('Error', error)
            actions.setErrors({ general: 'An error occurred. Please try again later.' });
        }
    }


    const onSubmit = async (values, actions) => {
        setButtonLoading(true)
        console.log('form:', values);
        try {
            const response = await axios.post(`${BASE_URL}/users/register`, values)
            console.log("Response:", response.data)
            setButtonLoading(false)
            if (response.data) {
                console.log("arrived success")
                setTempId(response.data.temp_id)
                setOpen(!open)
            } else {
                console.log(response.data.message, "signup")
                actions.setErrors({ general: 'Signup failed. Please try again.' });
                toast.error(response.data.message);
            }

        } catch (error) {
            setButtonLoading(false)
            if (error.response) {
                console.log(error.response.data.message, "backend response")
                toast.error(error.response.data.message)
            } else {
                console.log('Error', error)
                actions.setErrors({ general: 'An error occurred. Please try again later.' }); actions.set4()
            }

        }
    }

    const verify = async () => {
        setButtonLoading(true)
        const val = otp.join("")


        const values = {
            otp: val,
            temp_id: tempId
        }


        try {
            const response = await axios.post(`${BASE_URL}/users/verify`, values)
            console.log(response.data, "successfull response")
            setButtonLoading(false)
            if (response.data) {
                toast.success("Signup successfull")
                navigate('/signin')
            } else {
                console.log(response.data, "else")
                setOtpError('Verification failed. Please try again.');
                actions.setErrors({ general: 'Signup failed. Please try again.' });
            }

        } catch (error) {
            setButtonLoading(false)
            console.log('Error in catch', error)
            const errorMessage = error.response.data.message || 'An error occurred. Please try again'
            setOtpError(errorMessage)
            actions.setErrors({ general: 'An error occurred. Please try again later.' });
        }

    }


    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    console.log('Form values:', formik.values);
    console.log('form error:', formik.errors);


    // const handleOpen = () => { setOpen(!open) }

    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false;

        setOtp([...otp.map((data, ind) => (index === ind ? e.target.value : data))])

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()

        }
        setOtpError('')
    }


    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(100px)',
        border: '1px solid rgba(255,255,255,0.1)',
    };
    const imageStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    }

    const headFont = {
        fontFamily: "Platypi"
    }
    return (
        <>
            {pageLoading ? (
                <div style={imageStyle}>
                    <div className='shadow-md'>
                        <Skeleton height={70} width="100%" />
                    </div>
                    <Card className="my-20 py-4 max-w-md mx-10 rounded-xl p-5" color='transparent'
                        style={divStyle}>
                        <Skeleton height={40} />
                        <Skeleton height={20} count={2} style={{ marginTop: 20 }} />
                        <Skeleton height={40} style={{ marginTop: 20 }} />
                        <Skeleton height={40} style={{ marginTop: 20 }} />
                    </Card>
                </div>
            ) : (
                <div style={imageStyle}>
                    <div className='shadow-md'>
                        <Header />
                    </div>
                    <Card className="my-9 max-w-md mx-28 rounded-xl px-5 py-3" style={divStyle}>
                        <Typography className='text-center p-2' variant="h2" color="teal" style={headFont}>Sign Up</Typography>
                        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>

                            <Input variant='standard' label="Email" type='email' name='email' color="black" onChange={formik.handleChange} value={formik.values.email}
                                onBlur={formik.handleBlur} />

                            <Input variant='standard' label="Password" type='password' name='password' color="black" onChange={formik.handleChange} value={formik.values.name}
                                onBlur={formik.handleBlur} />

                            <Input variant='standard' type='password' label="Confirm Password" id="confirm_password" name='confirm_password' color="black" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />

                            <div className='self-end'>
                                {formik.touched.email && formik.errors.email && (
                                    <p className='text-red-900 text-xs'>{formik.errors.email}</p>
                                )}
                                {formik.touched.password && formik.errors.password && (
                                    <p className='text-red-900 text-xs'>{formik.errors.password}</p>
                                )}
                                {!formik.errors.password && (
                                    <>
                                        {formik.touched.confirm_password && formik.errors.confirm_password && (
                                            <p className='text-red-900 text-xs'>{formik.errors.confirm_password}</p>
                                        )}
                                    </>
                                )}
                            </div>


                            <div className='flex gap-3'>
                                <Button className='bg-blue-700 rounded-none w-full' type='submit' >
                                    {buttonLoading ? <ClipLoader size={12} color={"#0000FF"} /> : 'Sign Up'}
                                </Button>
                                <div className="bg-white">
                                    <div id='signinDiv' ></div>
                                </div>
                            </div>
                        </form>
                        <div className="flex items-center gap-2 my-3">
                            <Typography className='text-xs sm:text-sm text-black'>Dont Have Any Account ?</Typography>
                            <Link to='/signin' >
                                <Typography className="text-primaryColor text-xs sm:text-sm hover:cursor-pointer">Log In</Typography>
                            </Link>
                        </div>
                    </Card>
                </div>
            )}

            <Dialog open={open}>
                <div className='flex flex-col items-center'>
                    <DialogHeader>Verify Otp</DialogHeader>
                    <p>Please enter the otp received in your mail to verify your account</p>
                </div>
                <div className="w-72 m-10 flex gap-5">
                    {
                        otp.map((data, index) => {
                            return <input type="text" variant='' className={`w-14 p-3 text-center text-black border rounded-lg ${otpError ? 'border-red-500' : 'border-green-500'}`}

                                maxLength={1}
                                onChange={(e) => handleChange(e, index)} />
                        })
                    }
                </div>
                <DialogFooter className='w-full'>
                    <Button variant="gradient" color="green" onClick={verify} className='w-full'>
                        {buttonLoading ? <ClipLoader size={20} color={"green"} /> : 'Verify'}
                    </Button>
                    {/* <Typography variant='small' color='black ' className="mt-3 ">Otp Validity:180 seconds</Typography> */}
                    {otpError && (
                        <Typography variant="small" color="red" className="mt-3 mb-2">
                            {otpError} , Please check your otp properly and try again
                        </Typography>

                    )}
                </DialogFooter>
            </Dialog >
        </>
    )
}
