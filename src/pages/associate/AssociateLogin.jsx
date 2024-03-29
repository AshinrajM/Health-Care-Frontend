import axios from "axios";
import bg from '../../assets/background/associatelogin.png'
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";
import logo from '../../assets/logo/Hc2.png'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAssociate } from "../../redux/userSlice";
import { BASE_URL } from "../../Api/Api";
import { useEffect } from "react";



const initialValues = {
    email: '',
    password: ''
}


const validate = values => {

    let errors = {}

    if (!values.email) {
        email.errors = "required"
    }
    if (!values.password) {
        password.errors = "required"
    }
    return errors

}

export default function AssociateLogin() {

    const associateAuthenticated = useSelector(state => state.user.associateAuthenticated)
    const adminAuthenticated = useSelector(state => state.user.adminAuthenticated)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("associateAuthenticated:", associateAuthenticated)
        if (associateAuthenticated) {
            navigate('/associates/check/dashboard')
        }
    }, [])


    const onSubmit = async (values) => {
        console.log("submitted form:", values)

        // const response = await axios.post('http://127.0.0.1:8000/users/login', values)
        const response = await axios.post(`${BASE_URL}/users/login`, values)

        if (response.data) {
            console.log("response received")

            if (response.data.role == "associate") {

                const { access, refresh, user, associate } = response.data

                console.log("user datas", response.data.user)
                console.log("associate datas", response.data.associate)

                localStorage.setItem('associateAccess', access);
                localStorage.setItem('associateRefresh', refresh);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("associate", JSON.stringify(associate));
                dispatch(loginAssociate())
                navigate('/associates/check/dashboard')
            }
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
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <Input variant='standard' label="Email" type="email" name="email" onChange={formik.handleChange}
                                value={formik.values.email} color="black" className="text-blue-gray-900 text-lg" />
                            {formik.errors.email ? <p className='text-red-900 text-xs self-end'>{formik.errors.email}</p> : null}
                            <Input variant='standard' label="Password" type="password" color="black" name="password" onChange={formik.handleChange} value={formik.values.password} className="text-blue-gray-900 text-lg" />
                            {formik.errors.password ? <p className='text-red-900 text-xs self-end'>{formik.errors.password}</p> : null}
                            <Button variant="gradient" fullWidth type="submit" disabled={!formik.values.email || !formik.values.password}>
                                Sign In
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
