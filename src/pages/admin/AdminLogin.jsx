import { Card, Typography, Input, Button } from '@material-tailwind/react'


export default function AdminLogin() {

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
          <form className="flex flex-col gap-4 w-full">
            <Input variant='standard' label="Enter Admin ID" id='admin_id' color="white" />
            <Input variant='standard' label="Enter Password" id="password" color="white" />
            <Button className='bg-blue-700 rounded-3xl w-full'>Log In</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

