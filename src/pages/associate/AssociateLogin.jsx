import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";
import logo from '../../assets/logo/Hc2.png'
import bg from '../../assets/background/associatelogin.png'
import { useFormik } from "formik";


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


    const onSubmit = async (values) => {
        console.log("submitted form:", values)
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


    return (
        <div className='h-full min-h-screen p-3' style={imageStyle}>
            <div className='h-auto w-40 mx-1 '>
                <img src={logo} alt="logo" />
            </div>
            <div>
                <Card className="my-20 py-4 max-w-md mx-auto  rounded-xl p-5" style={transparentstyle}>
                    <div className="flex justify-center items-center">
                        <Typography variant="h4" color="gray">Begin Your Work</Typography>
                    </div>
                    <CardBody className="flex flex-col gap-4">
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <Input variant='standard' label="Email" type="email" name="email" onChange={formik.handleChange}
                                value={formik.values.email} color="black" className="bg-none" />
                            {formik.errors.email ? <p className='text-red-900 text-xs self-end'>{formik.errors.email}</p> : null}
                            <Input variant='standard' label="Password" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} color="black" />
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
