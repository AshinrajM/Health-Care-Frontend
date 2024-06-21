import {
    Card, Typography, Input, Button, Dialog, DialogHeader, DialogFooter
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ClipLoader, ClockLoader } from 'react-spinners';
import { ColorRing } from 'react-loader-spinner'
import { useFormik } from 'formik';
import { loginUser } from '../../redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from "../../api/baseUrl";
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import bg from '../../assets/background/cover.jpg'
import { toast } from 'react-toastify'
import { MdOutlineVerifiedUser } from "react-icons/md";
import axiosInstance from '../../api/api';




const initialValues = {
    email: '',
    password: '',
};



const validate = values => {
    let errors = {};

    if (!values.email) {
        errors.email = "Email field Can't be empty";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email format'
    }
    if (!values.password) {
        errors.password = "Password field Can't be empty";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)) {
        errors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.'
    }

    return errors;
};


export default function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('')
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false)
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [tempId, setTempId] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [otpError, setOtpError] = useState('');
    const [passError, setPassError] = useState('');



    const handleOpen = () => setOpen(!open);
    const userAuthenticated = useSelector(state => state.user.userAuthenticated)


    const resetState = () => {
        setOpen(!open)
        setResetEmail('');
        setShowPasswordFields(false);
        setShowOtpField(false);
        setOtp('');
        setPassword('');
        setTempId('');
        setConfirmPassword('');
        setOtpError('')
        setErrorMessage('')
        setPassError('')
    };


    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 1000); // Simulate loading delay
    }, []);


    // reset-password mail validation
    const handleSendResetEmail = async () => {
        console.log(resetEmail)
        setButtonLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/users/reset-password-validate`,
                { email: resetEmail })
            setButtonLoading(false)
            if (response.status === 200) {
                setShowOtpField(!showOtpField)
                setTempId(response.data.temp_id)
            } else {
                toast.error('Failed to send reset email. Please try again.');
            }
        } catch (error) {
            setButtonLoading(false)
            console.error('Error sending reset email:', error);
            handleOpen()
            if (error.response) {
                // If the error has a response from the server
                toast.error(error.response.data.message || 'An error occurred. Please try again later.');
            } else {
                // If there's no response from the server, it might be a network error
                toast.error('Network error. Please try again later.');
            }
        }
    }

    // verify the user for reset the password
    const verifyOtp = async () => {
        setButtonLoading(true)
        try {
            let values = {
                tempId: tempId,
                otp: otp
            }
            const response = await axios.post(`${BASE_URL}/users/reset-verify-otp`, values)
            if (response.status === 200) {
                setButtonLoading(false)

                setShowPasswordFields(true)
                setShowOtpField(false)
            }
        } catch (error) {
            setButtonLoading(false)
            if (error.response) {
                // If the error has a response from the server
                const errorMessage = error.response.data.message || 'An error occurred. Please try again later.';
                setOtpError(errorMessage)
                // toast.error(errorMessage);
            } else {
                // toast.error('Network error. Please try again later.');
                setOtpError('Network error. Please try again later.');
            }
        }
    }

    // reset password update
    const handlePasswordUpdate = async () => {
        setButtonLoading(true)
        setPassError('')
        if (password !== confirmPassword) {
            setPassError('Passwords do not match...Please check your passwords properly and try again to update the password...');
            setButtonLoading(false)

            return;
        }
        if (!passwordRegex.test(password)) {
            setPassError('Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.');
            setButtonLoading(false)
            return;
        }
        let values = {
            tempId: tempId,
            password: password
        }
        try {
            const response = await axios.patch(`${BASE_URL}/users/reset-password-validate`, values)
            if (response.status === 200) {
                setButtonLoading(false)
                setOpen(!open)
                toast.success(response.data.message || 'Password updated successfully');
            }
        } catch (error) {
            setButtonLoading(false)
            if (error.response) {
                // If the error has a response from the server
                const errorMessage = error.response.data.message || 'An error occurred. Please try again later.';
                // toast.error(errorMessage);
                setPassError(errorMessage)
            } else {
                // If there's no response from the server, it might be a network error
                // toast.error('Network error. Please try again later.');
                set('Network error. Please try again later.');
            }
        }
    }

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const isValidOtp = (otp) => {
        return /^\d{6}$/.test(otp);
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



    // google button which return G-account datas
    const handleCallbackResponse = (response) => {
        // console.log("Encoded jwt id token:" + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject)

        const data = {
            email: userObject.email,
            password: userObject.sub,
        }
        console.log(data.email, data.password, "login")

        signinGoogle(data)
    }

    useEffect(() => {
        console.log(userAuthenticated)

        if (userAuthenticated) {
            navigate('/')
        }
        if (!pageLoading && !googleLoading) {
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

    }, [pageLoading, userAuthenticated, googleLoading])

    const signinGoogle = async (data) => {
        setGoogleLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, data);
            setGoogleLoading(false);
            if (response.data) {
                if (response.data.role === "user") {
                    const { access, refresh, user } = response.data;
                    localStorage.setItem('userAccess', access);
                    localStorage.setItem('userRefresh', refresh);
                    localStorage.setItem("userDetails", JSON.stringify(user));
                    dispatch(loginUser());
                    toast.success('Logged in');
                    navigate('/');
                } else {
                    toast.error('Only users are allowed to log in.');
                }
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
            setGoogleLoading(false);
            if (error.response && error.response.data) {
                toast.error(error.response.data.detail || 'An error occurred. Please try again later.');
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    }

    // sign in using inputs
    const onSubmit = async (values, actions) => {
        // event.preventDefault();
        console.log('submitting form:', values);
        setButtonLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, values)
            console.log("Response:", response.data)
            if (response.data) {
                console.log("arrived success")
                setButtonLoading(false);

                if (response.data.role === "user") {
                    const { access, refresh, user } = response.data;

                    localStorage.setItem('userAccess', access);
                    localStorage.setItem('userRefresh', refresh);
                    localStorage.setItem("userDetails", JSON.stringify(user));

                    dispatch(loginUser())
                    toast.success('Logged in')
                    navigate('/')
                } else {
                    setButtonLoading(false);
                    toast.error("Only signed users can login")
                    actions.setErrors({ general: 'Only users are allowed to log in.' });
                }

            } else {
                setButtonLoading(false);
                toast.error("Check credentials")
                actions.setErrors({ general: 'Login failed. Please try again.' });
            }

        } catch (error) {
            console.log('Error', error)
            setButtonLoading(false);
            // Check if the error has a response property, which means it's an HTTP error
            if (error.response) {
                // Extract the custom error message from the response data
                const errorMessage = error.response.data.detail || 'An error occurred. Check credentials ';
                actions.setErrors({ general: errorMessage });
                toast.error(errorMessage);
                console.log('errorMessage::', error.response.data);
            } else {
                // If there's no response, it might be a network error or something else
                actions.setErrors({ general: 'An error occurred. Check credentials properly' });
                toast.error("An error occurred. Please try again later.");
            }
        }
    };


    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });
    console.log('form values:', formik.values);

    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(100px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };

    const imageStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        // opacity: googleLoading ? '50%' : '100%',
    };

    const dialogFont = {
        fontFamily: "Platypi"
    }

    console.log("first", resetEmail)

    return (
        <>
            {pageLoading ? (
                <div style={imageStyle} >
                    <div className='shadow-md'>
                        <Skeleton height={80} width="100%" />
                    </div>

                    <Card className="my-20 py-4 max-w-md mx-10 rounded-xl p-5" color='transparent' style={divStyle}>
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
                    {googleLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            {/* Loader with full opacity */}
                            <div style={{ position: 'absolute', zIndex: 1 }}>
                                <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                            </div>
                            {/* Background with 50% opacity */}
                            <div className="flex justify-center items-center h-screen opacity-30"></div>
                        </div>
                    ) : (
                        <Card className="my-20 py-4 max-w-md mx-10  rounded-xl p-5" color='transparent' style={divStyle}>
                            <Typography className='text-center font-mono p-4' variant="h3" color="teal" style={dialogFont}>Log In</Typography>
                            <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>

                                <Input variant='standard' label="Email" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} color="black" />


                                <Input type='password' variant='standard' label="Password" name="password" color="black" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />

                                <div className='self-end'>
                                    {formik.touched.email && formik.errors.email && (
                                        <p className='text-red-900 text-xs'>{formik.errors.email}</p>
                                    )}
                                    {formik.touched.password && formik.errors.password && (
                                        <p className='text-red-900 text-xs'>{formik.errors.password}</p>
                                    )}
                                </div>

                                <div className='flex gap-2'>
                                    <Button className="bg-blue-500 mb-2 mt-2 w-full rounded-none" type="submit" disabled={buttonLoading}>
                                        {buttonLoading ? <ClipLoader size={12} color={"#0000FF"} /> : 'Login'}
                                    </Button>

                                    <div className="" style={{ width: '100% ', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                                        <div id='signinDiv' >googleSignin</div>
                                    </div>
                                </div>
                            </form>
                            <div className="flex items-center gap-1">
                                <Typography className="my-2 text-black text-sm sm:text-md" >Forgot Password ? </Typography>
                                <Typography className="text-primaryColor text-sm sm:text-md hover:cursor-pointer" onClick={handleOpen}>Click here</Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <Typography className='text-black text-xs sm:text-sm'>Dont Have Any Account ?</Typography>
                                <Link to='/signup' >
                                    <Typography className="text-primaryColor text-sm sm:text-md hover:cursor-pointer" >Sign up</Typography>
                                </Link>
                            </div>
                        </Card>
                    )}
                </div>
            )}

            <Dialog open={open} >
                <DialogHeader className='justify-center mb-5' style={dialogFont}>Forgot Your Password?</DialogHeader>

                <div className='mx-5 mb-5'>
                    {tempId ? (
                        <div className=' flex justify-between '>
                            <Typography className='' variant='paragraph'>{resetEmail}</Typography>
                            <Typography className='' variant='paragraph'><MdOutlineVerifiedUser className='text-green-600 w-10 h-7' /></Typography>
                        </div>
                    ) : (
                        <DialogFooter className='space-y-4'>
                            <Input label='Enter your registered Email' variant='standard' type='email'
                                onChange={(e) => setResetEmail(e.target.value)}
                                className='text-headingColor text-xl' style={dialogFont} color='black' autoFocus />
                            <Button variant="text" color="red"
                                onClick={resetState} className="mr-1">
                                <span>cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={handleSendResetEmail}
                                disabled={!isValidEmail(resetEmail)}>
                                {/* <span style={{ fontSize: '10px' }}>Validate Email</span> */}
                                {buttonLoading ? <ClipLoader size={12} color={"green"} /> : 'verify Email'}
                            </Button>
                        </DialogFooter>
                    )}
                </div>
                <div className='mx-5 mb-5'>
                    {showOtpField ? (
                        <DialogFooter className='space-y-4 justify-between'>
                            <div className='mb-5 space-y-5'>
                                <Input variant='standard' label='otp' style={{ width: '250px', fontFamily: "Platypi" }} maxLength={6} minLength={0} onChange={(e) => { setOtp(e.target.value) }} autoFocus />
                                {otpError && <p className='text-red-900 text-xs self-end'>{otpError}</p>}
                            </div>
                            <div className='mt-5 flex flex-col gap-2'>
                                <Button variant="text" color="red"
                                    onClick={resetState} className="mr-1">
                                    <span>Cancel</span>
                                </Button>
                                <Button color='green' disabled={!isValidOtp(otp)} onClick={verifyOtp}>
                                    {buttonLoading ? <ClipLoader size={12} color={"green"} /> : 'verify Otp'}
                                </Button>
                            </div>
                        </DialogFooter>
                    ) : null}
                    {showPasswordFields ? (
                        <div className=' flex justify-between' style={dialogFont}>
                            <p>Otp Verified</p>
                            <MdOutlineVerifiedUser className='text-green-600 w-10 h-7' />
                        </div>) : null}
                </div>
                <div className=''>
                    {showPasswordFields ? (
                        <DialogFooter className='space-y-4'>
                            <Input label='New Password' variant='standard' type='password'
                                onChange={(e) => setPassword(e.target.value)} style={dialogFont} autoFocus />
                            <Input label='Confirm New Password' variant='standard' type='password'
                                onChange={(e) => setConfirmPassword(e.target.value)} style={dialogFont} />
                            {passError && <p className='text-red-900 text-xs self-start'>{passError}</p>}
                            <div>
                                <Button variant="text" color="red"
                                    onClick={resetState} className="mr-1">
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="gradient" color="green" onClick={handlePasswordUpdate}
                                >
                                    {buttonLoading ? <ClipLoader size={12} color={"green"} /> : 'Update Password'}
                                </Button>
                            </div>
                        </DialogFooter>
                    ) : (null)}
                </div>
            </Dialog >

        </>
    );
}
