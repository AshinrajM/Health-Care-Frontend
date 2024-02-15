import { Card, Typography, Input, Button } from '@material-tailwind/react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userSlice';


const initialValues = {
  email: '',
  password: '',
}

export default function AdminLogin() {

  // const isAuthenticated = useSelector(state => state.isAuthenticated)

  const dispatch = useDispatch()

  const navigate = useNavigate()


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log("arrived useEffect")
  //     navigate('/admin/dashboard');
  //   }
  // }, [navigate, isAuthenticated]);

  const onSubmit = async (values, actions) => {
    console.log("adminData", values)
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login', values)
      console.log("Response:", response.data)

      if (response.data) {
        console.log("arrived success", response.data)

        if (response.data.role === "superuser") {
          console.log("arrived superuser")
          const { access, refresh } = response.data;

          localStorage.setItem('access', access);
          localStorage.setItem('refresh', refresh);
          dispatch(loginUser())
          navigate('/admin/dashboard')

        } else {
          actions.setErrors({ general: 'Only Admins are allowed' });
        }

      } else {
        actions.setErrors({ general: 'Login failed. Please try again.' });
      }


    } catch (error) {
      console.log('Error', error)
      actions.setErrors({ general: 'An error occurred. Please try again later.' });
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate
  })

  const divStyle = {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(255,255,255,0.2)',
  };

  return (
    <div className='bg-black h-full min-h-screen p-5'>
      <div className=''>
        <img src="src/assets/logo/logo3.png" alt="logo" className="h-12 w-auto hover:cursor-pointer " />
      </div>
      <div className='flex justify-center items-center' style={{ Height: '100vh' }}>
        <Card className="my-10 max-w-md mx-auto rounded-xl p-10  " style={divStyle}>
          <Typography className='text-center p-2' variant="h2" color="teal">Log In</Typography>
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

