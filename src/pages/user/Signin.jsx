import { Card, CardBody, Button, Typography, Input } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';
export default function SignIn() {

    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };

    const imageStyle = {
        backgroundImage: 'url("src/assets/background/3.jpg")',
        backgroundSize: 'cover',
        minHeight: '100vh',
    }
    return (

        <div style={imageStyle} className='p-3'>
            <Header />
            <Card className="my-20 py-4 max-w-md mx-auto  rounded-xl p-7" color='transparent' style={divStyle}>
                <Typography className='text-center font-mono p-4' variant="h2" color="teal">Log In</Typography>
                <form className="flex flex-col gap-3">
                    <Input variant='standard' label="Username" id='username' color="black" />
                    <Input variant='standard' label="Password" id="password" color="black" c />
                    {/* <Input type="password"  id='password' placeholder='Enter Password' className='border border-gray-400 focus:outline-none focus:ring-1  focus:ring-light-green-300   rounded-lg p-2 fo' /> */}
                    <Button className="bg-blue-500 mb-5">Login</Button>
                </form>
                <div className="flex items-center gap-1">
                    <Typography className="my-2 text-sm sm:text-md" >Forgot Password ? </Typography>
                    <Typography className="text-primaryColor text-sm sm:text-md hover:cursor-pointer">Click here</Typography>
                </div>
                <div className="flex items-center gap-2">
                    <Typography className='text-xs sm:text-sm'>Dont Have Any Account ?</Typography>
                    <Link to='/signup' >
                        <Typography className="text-primaryColor text-sm sm:text-md hover:cursor-pointer">Sign up</Typography>
                    </Link>
                </div>
            </Card>
        </div>
    )
}
