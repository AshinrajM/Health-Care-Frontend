import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Sidebar/SideBar'
// import { BASE_URL } from '../../api/api';
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaUsers } from "react-icons/fa6";
import { MdGroups3 } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { GiProfit } from "react-icons/gi";
import { TbActivityHeartbeat } from "react-icons/tb";
import axiosInstance from '../../api/api';


const chartConfigBar = {
    type: "bar",
    height: 240,
    series: [
        {
            name: "Bookings",
            data: [],
        },
    ],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            show: "",
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#004AAD"],
        plotOptions: {
            bar: {
                columnWidth: "40%",
                borderRadius: 2,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: [],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    },
};

export default function AdminHome() {

    const [data, setData] = useState({})
    const [chartConfig, setChartConfig] = useState({
        type: "pie",
        width: 280,
        height: 280,
        series: [],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617", "#ff8f00", "#00897b"],
            labels: ["Confirmed Bookings", "Completed Bookings", "Cancelled Bookings"],
            legend: {
                show: false,
            },
        },
    });

    const [chartConfigBarUpdated, setChartConfigBarUpdated] = useState(chartConfigBar);



    useEffect(() => {

        getDatas()

    }, [])


    const getDatas = async () => {
        try {
            // const response = await axios.get(`${BASE_URL}/booking/statistics`)
            const response = await axiosInstance.get('/booking/statistics')
            if (response.status === 200) {
                console.log("received datas", response.data)
                setData(response.data);

                setChartConfig((prevConfig) => ({
                    ...prevConfig,
                    series: [
                        response.data.confirmed_bookings,
                        response.data.completed_bookings,
                        response.data.cancelled_bookings,
                    ],
                }));

                const months = response.data.monthly_bookings.map(item =>
                    new Date(item.month).toLocaleString('default', { month: 'short' }));
                const bookingCounts = response.data.monthly_bookings.map(item => item.total);

                setChartConfigBarUpdated((prevConfig) => ({
                    ...prevConfig,
                    series: [{
                        name: "Bookings",
                        data: bookingCounts,
                    }],
                    options: {
                        ...prevConfig.options,
                        xaxis: {
                            ...prevConfig.options.xaxis,
                            categories: months,
                        },
                    },
                }));


            }
        } catch (error) {
            console.log("object", error)
        }
    }
    console.log("object", data)
    console.log("object", chartConfigBarUpdated)

    return (
        <div className="flex flex-col md:flex-row h-screen bg-blue-gray-100">
            <div className="md:w-64 md:fixed md:h-full">
                <SideBar />
            </div>

            <div className="flex-1 overflow-auto p-4 lg:ml-64 md:ml-64">
                <div className="flex flex-wrap gap-3 mb-4">
                    <Card className="flex-1 min-w-[300px] rounded-md ">
                        <CardBody className="flex justify-between items-center p-5">
                            <FaUsers color='white' className="h-20 w-20 border border-gray-300
                             bg-blue-800 rounded-2xl p-3 hover:scale-110 duration-500" />
                            <div className="flex flex-col items-end">
                                <Typography variant="h6" color="black">Total Customers</Typography>
                                <Typography variant="h2" color="black">{data.total_users}</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="flex-1 min-w-[300px] rounded-md ">
                        <CardBody className="flex justify-between items-center p-5">
                            <MdGroups3 color='white' className="h-20 w-20 border border-gray-300 bg-green-600 rounded-2xl p-3 hover:scale-110 duration-500" />
                            <div className="flex flex-col items-end">
                                <Typography variant="h6" color="black">Total Associates</Typography>
                                <Typography variant="h2" color="black">{data.total_associates}</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="flex-1 min-w-[300px] rounded-md"
                        style={{ backgroundColor: 'rgb(255,255,255)' }}>
                        <CardBody className="flex justify-between items-center p-5">
                            <MdOutlineShoppingCart color='white' className="h-20 w-20 border border-gray-300 bg-teal-500 rounded-2xl p-3 hover:scale-110 duration-500" />
                            <div className="flex flex-col items-end">
                                <Typography variant="h6" color="black">Total Bookings</Typography>
                                <Typography variant="h2" color="black">{data.total_bookings}</Typography>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                    <Card className="flex-1 min-w-[300px] rounded-md bg-white">
                        <CardBody className="flex justify-between items-center p-5">
                            <IoWalletOutline color='white' className="h-20 w-20 border border-gray-300  rounded-2xl p-3 hover:scale-110 duration-500" style={{ backgroundColor: 'rgb(35,183,229)' }} />
                            <div className="flex flex-col items-end">
                                <Typography variant="h6" color="black">Total Revenue</Typography>
                                <Typography variant="h2" color="black">₹{data.total_revenue}.00</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="flex-1 min-w-[300px] rounded-md ">
                        <CardBody className="flex justify-between items-center p-5">
                            <GiProfit color='white' className="h-20 w-20 border border-gray-300  rounded-2xl p-3 hover:scale-110 duration-500" style={{ backgroundColor: 'rgb(132,90,223)' }} />
                            <div className="flex flex-col items-end">
                                <Typography variant="h6" color="black">Profit</Typography>
                                <Typography variant="h2" color="black">₹{data.profit}0</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="flex-1 min-w-[300px] rounded-md ">
                        <CardBody className="flex justify-between items-center p-5">
                            <TbActivityHeartbeat color='white' className="h-20 w-20 border border-gray-300 bg-blue-800 rounded-2xl p-3 hover:scale-110 duration-500" />
                            <div className="flex flex-col items-end">
                                <Typography variant="h6" color="black">Conversion Rate</Typography>
                                <Typography variant="h2" color="black">{data.conversion_rate}%</Typography>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="flex flex-wrap gap-5">
                    <Card className="flex-1 min-w-[300px] rounded-md">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                        >
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Total Bookings Chart
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="max-w-sm font-normal"
                                >
                                    Showing up the datas of booking till date
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="mt-4 grid place-items-center px-2">
                            <Chart {...chartConfig} />
                        </CardBody>
                    </Card>
                    <Card className="flex-1 min-w-[300px] rounded-md">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="flex flex-col gap-4 rounded-none md:flex-row 
                            md:items-center"
                        >
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Sales Chart
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="max-w-sm font-normal"
                                >
                                    Here you can see the sales datas through each months
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="px-2 pb-0">
                            <Chart {...chartConfigBarUpdated} />
                        </CardBody>
                    </Card>
                </div>

                {data.last_three_bookings && (
                    <div className="mb-8 mt-5">
                        <h2 className="text-2xl font-bold mb-4">Latest Bookings</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-3 px-4 text-left font-semibold">Booking ID</th>
                                        <th className="py-3 px-4 text-left font-semibold">Date</th>
                                        <th className="py-3 px-4 text-left font-semibold">Shift</th>
                                        <th className="py-3 px-4 text-left font-semibold">Status</th>
                                        <th className="py-3 px-4 text-left font-semibold">Amount Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.last_three_bookings.map((booking, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                            <td className="py-3 px-4 border-b">
                                                <span className="block sm:table-cell">{booking.booking_id}</span>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <span className="block sm:table-cell">{booking.date}</span>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <span className="block sm:table-cell">{booking.shift}</span>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <span className="block sm:table-cell">{booking.status}</span>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <span className="block sm:table-cell">₹{booking.amount_paid}.00</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>

        </div>
        // </div >

    )
}

