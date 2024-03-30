import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Card, CardBody, CardFooter, Typography, Button, } from "@material-tailwind/react";


const AssociateList = () => {

    const textStyle = {
        fontFamily: "Afacad",
        fontSize: '20px',
        fontWeight: '550',
    }
    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <Card className="m-3 w-80 hover:shadow-xl bg-" >
                    <CardBody>
                        <Typography variant="h4" color="indigo" className="mb-2" style={{ fontFamily: 'Krona One' }}>
                            Anwar Ali
                        </Typography>
                        <div className='px-5 ' >
                            <div className='flex justify-between text-black'>
                                <Typography className='self-end ' style={textStyle}>
                                    Age
                                </Typography>
                                <Typography className='' style={textStyle}>
                                    : &nbsp; 26
                                </Typography>
                            </div>
                            <div className='flex justify-between text-black'>
                                <Typography className='self-end' style={textStyle}>
                                    Experience
                                </Typography>
                                <Typography style={textStyle}>
                                    : &nbsp; 26
                                </Typography>
                            </div>
                            <div className='flex justify-between text-black' >
                                <Typography className='self-end' style={textStyle}>
                                    Fee per hour
                                </Typography>
                                <Typography style={textStyle}>
                                    : &nbsp; 26
                                </Typography>
                            </div>
                        </div>

                    </CardBody>
                    <CardFooter className="pt-0 space-x-2 flex">
                        <Button variant='outlined' color='green' className='hover:bg-green-700 hover:text-white text-green-700 w-full'>Book</Button>
                        <Button variant='outlined' color='indigo' className='w-full hover:bg-indigo-700 hover:text-white'>Details</Button>
                    </CardFooter>
                </Card>
            </div >
            <div>
                <Footer />
            </div>
        </>
    )
}

export default AssociateList