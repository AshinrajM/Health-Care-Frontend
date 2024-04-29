import Header from '../../components/Header/Header'
import { Card, Typography, Input, Button, Dialog, DialogHeader, DialogFooter } from '@material-tailwind/react'
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../api/api';
import bg from '../../assets/background/signup.jpg'

const initialValues = {
    // username: '',
    email: '',
    password: '',
    confirm_password: ''
}




const validate = values => {

    let errors = {}

    // if (!values.username) {
    //     errors.username = "Cant be empty"
    // } else if (!/^\S(?!.*\d)[a-zA-Z\s]*$/i.test(values.username)) {
    //     errors.username = 'Numbers are not allowed'
    // }

    // if (!values.email) {
    //     errors.email = "Cant be empty"
    // }
    // else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
    //     errors.email = 'Invalid email format'
    // }

    // if (!values.password) {
    //     errors.password = "Cant be empty"
    // } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)) {
    //     errors.password = 'Has to follow the pattern'
    // }

    // if (!values.confirm_password) {
    //     errors.confirm_password = "Cant be empty"
    // } else if (values.password !== values.confirm_password) {
    //     errors.confirm_password = "Password didn't match"
    // }
    return errors
}

export default function SignUp() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [tempId, setTempId] = useState("")


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

    const signUpGoogle = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/register`, data)
            console.log("Response:", response.data)
            if (response.data) {
                console.log("arrived success")
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
        console.log('form:', values);
        try {
            const response = await axios.post(`${BASE_URL}/users/register`, values)
            console.log("Response:", response.data)

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
        const val = otp.join("")

        const values = {
            otp: val,
            temp_id: tempId
        }

        try {
            const response = await axios.post(`${BASE_URL}/users/verify`, values)
            console.log(response.data, "successfull response")
            if (response.data) {
                toast.success("Signup successfull")
                navigate('/signin')
            } else {
                actions.setErrors({ general: 'Signup failed. Please try again.' });
            }

        } catch (error) {
            console.log('Error', error)
            actions.setErrors({ general: 'An error occurred. Please try again later.' }); actions.set4()
        }

        // setOtp(val)
        // console.log(val, "otp joined")
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
            <div style={imageStyle}>
                <div className='shadow-md'>
                    <Header />
                </div>
                <Card className="my-9 max-w-md mx-28 rounded-xl px-5 py-3" style={divStyle}>
                    <Typography className='text-center p-2' variant="h2" color="teal" style={headFont}>Sign Up</Typography>
                    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>

                        <Input variant='standard' label="Email" id="email" name='email' color="black" onChange={formik.handleChange} value={formik.values.email} autoFocus />
                        {formik.errors.email ? <p className='text-red-900 text-xs self-end'>{formik.errors.email}</p> : null}

                        <Input variant='standard' label="Password" id="password" name='password' color="black" onChange={formik.handleChange} value={formik.values.name} />
                        {formik.errors.password ?
                            <div className='flex flex-row'>
                                <div className='text-gray-800 text-xs self-start'>
                                    <li >Minimum length of 8 characters</li>
                                </div>
                                <div>
                                    <p className='text-red-900 text-xs self-end'>{formik.errors.password}</p>

                                </div>
                            </div>
                            : null}

                        <Input variant='standard' type='password' label="Confirm Password" id="confirm_password" name='confirm_password' color="black" onChange={formik.handleChange} value={formik.values.name} />
                        {formik.errors.username ? <p className='text-red-900 text-xs self-end' >{formik.errors.username}</p> : null}
                        <div className='flex gap-3'>
                            <Button className='bg-blue-700 rounded-lg w-full' type='submit' disabled={!formik.values.email || !formik.values.password || !formik.values.confirm_password || Object.keys(formik.errors).length !== 0 || formik.values.password !== formik.values.confirm_password}>Sign Up</Button>
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
                    {/* <button onClick={handleOpen}>hai</button> */}
                </Card>
            </div>

            <Dialog open={open}>
                <DialogHeader>Email Verification</DialogHeader>
                <div className="w-72 m-10 flex gap-5">
                    {
                        otp.map((data, index) => {
                            return <input type="text" variant='' className='w-14 p-3 text-center text-red-400
                            border border-gray-900 rounded-lg'

                                maxLength={1}
                                onChange={(e) => handleChange(e, index)} />
                        })
                    }
                </div>
                <DialogFooter className='w-full'>
                    <Button variant="gradient" color="green" onClick={verify} className='w-full'>
                        <span>Verify Account</span>
                    </Button>
                </DialogFooter>
            </Dialog >
        </>
    )
}
