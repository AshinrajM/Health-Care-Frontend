import Header from '../../components/Header/Header'
import { Card, Typography, Input, Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

export default function SignUp() {

    const divStyle = {
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
    };
    const imageStyle = {
        backgroundImage: 'url("src/assets/background/3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    }

    return (
        <div className='p-3' style={imageStyle}>
            <Header />
            <Card className="my-9 max-w-md mx-auto rounded-xl px-5 py-3" style={divStyle}>
                <Typography className='text-center p-2' variant="h2" color="teal">Sign Up</Typography>
                <form className="flex flex-col gap-4">
                    <Input variant='standard' label="Username" id='username' color="black" />
                    <Input variant='standard' label="Email" id="email" color="black" />
                    <Input variant='standard' label="Password" id="password" color="black" />
                    <Input variant='standard' label="Confirm Password" id="confirm_password" color="black" />


                    <Button className='bg-blue-700 rounded-3xl w-full'>Sign Up</Button>
                    <Button className='bg-white rounded-3xl w-full h-10 flex items-center justify-center'>
                        <img src='src/assets/logo/google.svg' alt='Button Image' className='h-5 w-auto ' />
                    </Button>
                </form>
                <div className="flex items-center gap-2 my-3">
                    <Typography className='text-xs sm:text-sm'>Dont Have Any Account ?</Typography>
                    <Link to='/signin' >
                        <Typography className="text-primaryColor text-xs sm:text-sm hover:cursor-pointer">Log In</Typography>
                    </Link>
                </div>
            </Card>
        </div>
    )
}
