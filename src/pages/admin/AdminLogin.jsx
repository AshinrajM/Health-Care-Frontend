import { Card, Typography, Input, Button } from '@material-tailwind/react'
import axios from 'axios';
import logo from '../../assets/logo/hcWhite.png'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/userSlice';
import { BASE_URL } from "../../Api/Api";
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
}

export default function AdminLogin() {

  const adminAuthenticated = useSelector(state => state.user.adminAuthenticated)
  const associateAuthenticated = useSelector(state => state.user.associateAuthenticated)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    console.log("chhhhhhhhhhhhhhhhhhhhhhhh", adminAuthenticated)
    if (adminAuthenticated) {
      navigate('/admin/entry/dashboard')
    }
  }, [])


  const onSubmit = async (values, actions) => {
    console.log("adminData", values)
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, values)
      console.log("Response:", response.data)

      if (response.data) {
        console.log("arrived response")

        if (response.data.role === "superuser") {
          console.log("arrived superuser")
          const { access, refresh } = response.data;

          localStorage.setItem('adminAccess', access);
          localStorage.setItem('adminRefresh', refresh);
          dispatch(loginAdmin())
          toast.success("Welcome Admin")
          navigate('/admin/entry/dashboard')

        } else {
          actions.setErrors({ general: 'Only Admins are allowed' });
        }

      } else {
        actions.setErrors({ general: 'Login failed. Please try again.' });
      }


    } catch (error) {
      console.log('Error', error)
      actions.setErrors({ general: 'An error occurred. Please try again later.' });
      toast.error(`${error.message}`)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  const divStyle = {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(255,255,255,0.2)',
  };

  useEffect(() => {
    if (associateAuthenticated) {
      navigate('/associates/check/dashboard')
    }
  }, [associateAuthenticated, navigate])

  return (
    <div className='bg-black h-full min-h-screen p-5'>
      <div className=''>
        <img src={logo} alt="logo" className="h-24 w-auto hover:cursor-pointer " />
      </div>
      <div className='flex justify-center items-center' style={{ Height: '100vh' }}>
        <Card className="my-10 max-w-md mx-auto rounded-xl p-10  " style={divStyle}>
          <Typography className='text-center p-2 m-5' variant="h2" color="teal">Log In</Typography>
          <form className="flex flex-col gap-4 w-full" onSubmit={formik.handleSubmit}>
            <Input variant='standard' label="Enter Admin ID" name='email' color="white" onChange={formik.handleChange} value={formik.values.email} />
            <Input variant='standard' label="Enter Password" name='password' color="white" onChange={formik.handleChange} value={formik.values.password} />
            <Button className='bg-blue-700 rounded-3xl w-full' type='submit'>Log In</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

