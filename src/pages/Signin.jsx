import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"



export default function Signin() {
  return (
    <div className="my-20 py-4 max-w-lg mx-auto bg-transparent shadow-md backdrop-blur bg-blue-gray-200 rounded-xl p-7">
      <h1 className='text-3xl text-center font-mono p-4'>Log In</h1>
      <form className="flex flex-col gap-3">
        <input type="text" id='username' placeholder='Enter User name' className='border border-gray-400 p-2 focus:outline-none focus:ring-1
        focus:ring-light-green-300  rounded-lg' />
        <input type="password" id='password' placeholder='Enter Password' className='border border-gray-400 focus:outline-none focus:ring-1
        focus:ring-light-green-300   rounded-lg p-2 fo' />
        <Button className="bg-blue-500 mb-5teu67dr.0.hj-p.">Login</Button>
      </form>
      <div className="flex items-center gap-1">
        <p className="my-2">Forgot Password ? </p>
        <p className="text-primaryColor hover:cursor-pointer">Click here</p>
      </div>
      <div className="flex items-center gap-2">
        <p>Dont Have Any Account ?</p>
        <Link to='/sign-up' >
          <p className="text-primaryColor hover:cursor-pointer">Sign up</p>
        </Link>
      </div>
    </div>
  )
}
