import { Card, Typography, Input, Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { loginUser } from '../../redux/userSlice';

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


    const userAuthenticated = useSelector(state => state.user.userAuthenticated)

    useEffect(() => {
        console.log(userAuthenticated)

        if (adminAuthenticated) {
            navigate('/')
        }
    }, [])

    const onSubmit = async (values, actions) => {


        console.log('submitting form:', values);
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/login', values)
            console.log("Response:", response.data)

            if (response.data) {


                console.log("arrived success")

                if (response.data.role === "user") {

                    console.log(response.data)

                    const { access, refresh } = response.data;

                    localStorage.setItem('userAccess', access);
                    localStorage.setItem('userRefresh', refresh);
                    dispatch(loginUser())
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
    };


    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });
    console.log('form values:', formik.values);

    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };

    const imageStyle = {
        backgroundImage: 'url("src/assets/background/3.jpg")',
        backgroundSize: 'cover',
        minHeight: '100vh',
    };

    return (

        <div style={imageStyle} className='p-3'>
            <Header />
            <Card className="my-20 py-4 max-w-md mx-auto  rounded-xl p-7" color='transparent' style={divStyle}>
                <Typography className='text-center font-mono p-4' variant="h2" color="teal">Log In</Typography>
                <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>

                    <Input variant='standard' label="Email" name="email" onChange={formik.handleChange} value={formik.values.email} color="black" />
                    {formik.errors.email ? <p className='text-red-900 text-xs self-end'>{formik.errors.email}</p> : null}

                    <Input type='password' variant='standard' label="Password" name="password" color="black" onChange={formik.handleChange} value={formik.values.password} />
                    {formik.errors.password ? <p className='text-red-900 text-xs self-end'>{formik.errors.password}</p> : null}

                    <Button className="bg-blue-500 mb-5" type='submit'>Login</Button>

                </form>
                <div className="flex items-center gap-1">
                    <Typography className="my-2 text-sm sm:text-md" >Forgot Password ? </Typography>
                    <Typography className="text-primaryColor text-sm sm:text-md hover:cursor-pointer">Click here</Typography>
                </div>
                <div className="flex items-center gap-2">
                    <Typography className='text-xs sm:text-sm'>Dont Have Any Account ?</Typography>
                    <Link to='/signup' >
                        <Typography className="text-primaryColor text-sm sm:text-md hover:cursor-pointer" >Sign up</Typography>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
