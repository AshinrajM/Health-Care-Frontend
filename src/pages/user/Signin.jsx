import {
    Card, Typography, Input, Button, Dialog, DialogHeader, DialogFooter
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { loginUser } from '../../redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from "../../api/api";
import axios from 'axios';
import bg from '../../assets/background/cover.jpg'


import { toast } from 'react-toastify'
import { MdOutlineVerifiedUser } from "react-icons/md";
// import { data } from 'autoprefixer';




const initialValues = {
    email: '',
    password: '',
};



const validate = values => {
    let errors = {};

    if (!values.email) {
        errors.email = "Can't be empty";
    }
    if (!values.password) {
        errors.password = "Can't be empty";
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
    };

    // reset-password mail validation
    const handleSendResetEmail = async () => {
        console.log(resetEmail)
        try {
            const response = await axios.post(`${BASE_URL}/users/reset-password-validate`, { email: resetEmail })
            if (response.status === 200) {
                setShowOtpField(!showOtpField)
                setTempId(response.data.temp_id)
            } else {
                toast.error('Failed to send reset email. Please try again.');
            }
        } catch (error) {
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
        try {
            let values = {
                tempId: tempId,
                otp: otp
            }
            const response = await axios.post(`${BASE_URL}/users/reset-verify-otp`, values)
            if (response.status === 200) {
                setShowPasswordFields(true)
                setShowOtpField(false)
            }
        } catch (error) {
            if (error.response) {
                // If the error has a response from the server
                const errorMessage = error.response.data.message || 'An error occurred. Please try again later.';
                toast.error(errorMessage);
            } else {
                // If there's no response from the server, it might be a network error
                toast.error('Network error. Please try again later.');
            }
        }
    }

    // reset password update
    const handlePasswordUpdate = async () => {

        let values = {
            tempId: tempId,
            password: password
        }
        try {
            const response = await axios.patch(`${BASE_URL}/users/reset-password-validate`, values)
            if (response.status === 200) {
                setOpen(!open)
                toast.success(response.data.message || 'Password updated successfully');
            }
        } catch (error) {
            if (error.response) {
                // If the error has a response from the server
                const errorMessage = error.response.data.message || 'An error occurred. Please try again later.';
                toast.error(errorMessage);
            } else {
                // If there's no response from the server, it might be a network error
                toast.error('Network error. Please try again later.');
            }
        }
    }

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };


    // google button which return G-account datas
    const handleCallbackResponse = (response) => {
        console.log("Encoded jwt id token:" + response.credential);
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
        /* global google*/
        google.accounts.id.initialize({

            client_id: "443952256934-sn2mj7pnfnblangilokooid8mvd81ldl.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('signinDiv'),
            { theme: "outline", size: "large" }
        )

    }, [])

    const signinGoogle = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, data)
            console.log("Response:", response.data)

            if (response.data) {

                console.log("arrived success")

                if (response.data.role === "user") {


                    const { access, refresh, user } = response.data;

                    console.log("user datas", response.data.user)

                    localStorage.setItem('userAccess', access);
                    localStorage.setItem('userRefresh', refresh);
                    localStorage.setItem("userDetails", JSON.stringify(user));
                    dispatch(loginUser())
                    toast.success('Logged in ')
                    navigate('/')
                } else {
                    actions.setErrors({ general: 'Only users are allowed to log in.' });
                }

            } else {
                actions.setErrors({ general: 'Login failed. Please try again.' });
            }

        } catch (error) {
            console.log('Error', error)
            actions.setErrors({ general: 'An error occurred. Please try again later.' });
        }
    }

    const onSubmit = async (values, actions) => {
        console.log('submitting form:', values);
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, values)
            console.log("Response:", response.data)
            if (response.data) {
                console.log("arrived success")

                if (response.data.role === "user") {
                    const { access, refresh, user } = response.data;

                    localStorage.setItem('userAccess', access);
                    localStorage.setItem('userRefresh', refresh);
                    localStorage.setItem("userDetails", JSON.stringify(user));

                    dispatch(loginUser())
                    toast.success('Logged in')
                    navigate('/')
                } else {
                    toast.error("Only signed users can login")
                    actions.setErrors({ general: 'Only users are allowed to log in.' });
                }

            } else {
                toast.error("Check credentials")
                actions.setErrors({ general: 'Login failed. Please try again.' });
            }

        } catch (error) {
            console.log('Error', error)
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

    };

    const dialogFont = {
        fontFamily: "Platypi"
    }




    console.log("first", resetEmail)


    return (
        <>

            <div style={imageStyle} className='p-3'>
                <Header />
                <Card className="my-20 py-4 max-w-md mx-10  rounded-xl p-5" color='transparent' style={divStyle}>
                    <Typography className='text-center font-mono p-4' variant="h3" color="teal" style={dialogFont}>Log In</Typography>
                    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>

                        <Input variant='standard' label="Email" name="email" onChange={formik.handleChange} value={formik.values.email} color="black" autoFocus />
                        {formik.errors.email ? <p className='text-red-900 text-xs self-end'>{formik.errors.email}</p> : null}

                        <Input type='password' variant='standard' label="Password" name="password" color="black" onChange={formik.handleChange} value={formik.values.password} />
                        {formik.errors.password ? <p className='text-red-900 text-xs self-end'>{formik.errors.password}</p> : null}

                        <Button className="bg-blue-500 mb-5" type='submit'>Login</Button>
                        {/* <Button id='signinDiv' className='bg-transparent'></Button> */}

                    </form>
                    <div className="bg-white" style={{ width: '100% ', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                        <div id='signinDiv' ></div>
                    </div>
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
            </div>

            <Dialog open={open} style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, .5)', fontFamily: "Platypi", }}>
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
                                className='text-headingColor text-xl' style={dialogFont} color='black' />
                            <Button variant="text" color="red"
                                onClick={resetState} className="mr-1">
                                <span>cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={handleSendResetEmail}
                                disabled={!isValidEmail(resetEmail)}>
                                <span style={{ fontSize: '10px' }}>Validate Email</span>
                            </Button>
                        </DialogFooter>
                    )}
                </div>
                <div className='mx-5 mb-5'>
                    {showOtpField ? (
                        <DialogFooter className='space-y-4'>
                            <Input variant='standard' label='otp' style={{ width: '250px', fontFamily: "Platypi" }} maxLength={6} minLength={0} onChange={(e) => { setOtp(e.target.value) }} />
                            <Button variant="text" color="red"
                                onClick={resetState} className="mr-1">
                                <span>Cancel</span>
                            </Button>
                            <Button color='green' disabled={otp.length !== 6} onClick={verifyOtp}>Verify Otp</Button>
                        </DialogFooter>
                    ) : null}
                    {showPasswordFields ? (
                        <div className=' flex justify-between' style={dialogFont}>
                            <p>Otp Verified</p>
                            <MdOutlineVerifiedUser className='text-green-600 w-10 h-7' />
                        </div>) : null}
                </div>
                <div className='mx-2 mb-5'>
                    {showPasswordFields ? (
                        <DialogFooter className='space-y-4'>
                            <Input label='New Password' variant='standard' type='password'
                                onChange={(e) => setPassword(e.target.value)} style={dialogFont} />
                            <Input label='Confirm New Password' variant='standard' type='password'
                                onChange={(e) => setConfirmPassword(e.target.value)} style={dialogFont} />
                            <Button variant="text" color="red"
                                onClick={resetState} className="mr-1">
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={handlePasswordUpdate}
                                disabled={!password || !confirmPassword}>
                                <span>Update Password</span>
                            </Button>
                        </DialogFooter>
                    ) : (null)}
                </div>
            </Dialog >

        </>
    );
}
