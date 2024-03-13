import Header from '../../components/Header/Header'
import { Card, Typography, Input, Button } from '@material-tailwind/react'
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


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
        // console.log(userAuthenticated)

        // if (userAuthenticated) {
        //     navigate('/')
        // }
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
            const response = await axios.post('http://127.0.0.1:8000/users/register', data)
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
            const response = await axios.post('http://127.0.0.1:8000/users/register', values)
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
            actions.setErrors({ general: 'An error occurred. Please try again later.' }); actions.set4()

        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    console.log('Form values:', formik.values);
    console.log('form error:', formik.errors);

    // useEffect(() => {
    //     // global google
    //     google.accounts.id.intitialize
    // })


    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };
    const imageStyle = {
        backgroundImage: 'url("src/assets/background/3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    }

    return (
        <div className='p-3 h-full' style={imageStyle}>
            <Header />
            <Card className="my-9 max-w-md mx-auto rounded-xl px-5 py-3" style={divStyle}>
                <Typography className='text-center p-2' variant="h2" color="teal">Sign Up</Typography>
                <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>

                    {/* <Input variant='standard' label="Username"  name='username' color="black" onChange={formik.handleChange} value={formik.values.name} />
                    {formik.errors.username ? <p className='text-red-900 text-xs self-end'>{formik.errors.username}</p> : null} */}

                    <Input variant='standard' label="Email" id="email" name='email' color="black" onChange={formik.handleChange} value={formik.values.email} />
                    {formik.errors.email ? <p className='text-red-900 text-xs self-end'>{formik.errors.email}</p> : null}

                    <Input variant='standard' label="Password" id="password" name='password' color="black" onChange={formik.handleChange} value={formik.values.name} />
                    {formik.errors.password ?
                        <div className='flex flex-row'>
                            <div className='text-gray-800 text-xs self-start'>
                                {/* <li >One lowercase letter (a-z)</li>
                                <li >One uppercase letter  (A-Z)</li>
                                <li >One digit (0-9)</li>
                                <li>One special character from the specified set (@$!%*?&)</li> */}
                                <li >Minimum length of 8 characters</li>
                            </div>
                            <div>
                                <p className='text-red-900 text-xs self-end'>{formik.errors.password}</p>

                            </div>
                        </div>
                        : null}

                    <Input variant='standard' type='password' label="Confirm Password" id="confirm_password" name='confirm_password' color="black" onChange={formik.handleChange} value={formik.values.name} />
                    {formik.errors.username ? <p className='text-red-900 text-xs self-end' >{formik.errors.username}</p> : null}

                    <Button className='bg-blue-700 rounded-3xl w-full' type='submit' disabled={Object.keys(formik.errors).length !== 0}>Sign Up</Button>
                    {/* <Button className='bg-white rounded-3xl w-full h-10 flex items-center justify-center'>
                        <img src='src/assets/logo/google.svg' alt='Button Image' className='h-5 w-auto ' />
                    </Button> */}
                    <div className="bg-white" style={{ width: '100% ', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                        <div id='signinDiv' ></div>
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
    )
}
