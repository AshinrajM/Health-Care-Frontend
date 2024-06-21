import axios from "axios";
import bg from '../../assets/background/associatelogin.png'
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";
import logo from '../../assets/logo/Hc2.png'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAssociate } from "../../redux/userSlice";
import { BASE_URL } from "../../api/baseUrl"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";


const initialValues = {
    email: '',
    password: ''
}


const validate = values => {

    let errors = {}

    if (!values.email) {
        errors.email = "Email field Can't be empty";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email format'
    }
    // if (!values.password) {
    //     errors.password = "Password field Can't be empty";
    // } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(values.password)) {
    //     errors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.'
    // }
    return errors

}

export default function AssociateLogin() {

    const associateAuthenticated = useSelector(state => state.user.associateAuthenticated)
    const adminAuthenticated = useSelector(state => state.user.adminAuthenticated)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("associateAuthenticated:", associateAuthenticated)
        if (associateAuthenticated) {
            navigate('/associates/check/dashboard')
        }
    }, [])


    const onSubmit = async (values) => {
        setLoading(true)
        console.log("submitted form:", values)
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, values);

            if (response.data && response.data.role === "associate") {

                const { access, refresh, user, associate } = response.data;

                console.log("user datas", response.data.user)
                console.log("associate datas", response.data.associate)

                localStorage.setItem('associateAccess', access);
                localStorage.setItem('associateRefresh', refresh);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("associate", JSON.stringify(associate));
                dispatch(loginAssociate())
                setLoading(false)
                navigate('/associates/check/associate-dashboard')

            }
        } catch (error) {
            setLoading(false)
            console.log("object", error)
            console.log("error", error.response.data)
            toast.error(error.response.data.detail);

            // if (error.response && error.response.status === 401) {
            //     // Unauthorized - Invalid credentials
            //     if (error.response.data.messages) {
            //         toast.error(error.response.data.messages);
            //     }
            // } else {
            //     // Other errors
            //     console.error("Error:", error);
            //     toast.error("An error occurred while processing your request");
            // }
        }
    }



    const transparentstyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };
    const imageStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    })
    console.log('form values:', formik.values);

    useEffect(() => {
        if (adminAuthenticated) {
            navigate('/admin/entry/dashboard')
        }
    }, [adminAuthenticated, navigate])


    return (
        <div className='h-full min-h-screen p-3' style={imageStyle}>
            <div className='h-auto w-40 mx-1 '>
                <img src={logo} alt="logo" className="" />
            </div>
            <div>
                <Card className="my-20 py-4 max-w-md mx-auto  rounded-xl p-5" style={transparentstyle}>
                    <div className="flex justify-center items-center">
                        <Typography variant="h4" color="gray">Begin Your Work</Typography>
                    </div>
                    <CardBody className="flex flex-col gap-4">
                        <form className="space-y-4" onSubmit={formik.handleSubmit}>
                            <Input variant='standard' label="Email" type="email" name="email"
                                onChange={formik.handleChange} value={formik.values.email} color="black" className="text-blue-gray-900 text-lg" onBlur={formik.handleBlur} />
                            <Input variant='standard' label="Password" type="password" color="black" name="password" onChange={formik.handleChange} value={formik.values.password} className="text-blue-gray-900 text-lg" onBlur={formik.handleBlur} />

                            <div className='self-end'>
                                {formik.touched.email && formik.errors.email && (
                                    <p className='text-red-900 text-xs'>{formik.errors.email}</p>
                                )}
                                {formik.touched.password && formik.errors.password && (
                                    <p className='text-red-900 text-xs'>{formik.errors.password}</p>
                                )}
                            </div>

                            <Button variant="gradient" fullWidth type="submit">
                                {loading ? <ClipLoader size={12} color={"#ffff"} /> : 'Login'}
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
