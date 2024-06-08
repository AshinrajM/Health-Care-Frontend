import React, { useEffect } from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaUsers } from "react-icons/fa6";
import { MdGroups3 } from "react-icons/md";
import '../../components/Cards/custom.css';


const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [44, 55, 1],
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
        colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
        legend: {
            show: false,
        },
    },
};
const chartConfigBar = {
    type: "bar",
    height: 240,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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
        colors: ["#020617"],
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
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
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


    return (
        <div className="flex flex-col md:flex-row h-screen bg-blue-gray-100">
            <div className="md:w-64 md:fixed md:h-full">
                <SideBar />
            </div>

            <div className="flex-1 overflow-auto p-4 lg:ml-64 md:ml-64">
                <div className="flex flex-wrap gap-4 mb-4">
                    <Card className="flex-1 min-w-[300px]">
                        <CardBody className="flex justify-between items-center p-5">
                            <FaUsers className="h-16 w-16" />
                            <div className="flex flex-col items-end">
                                <Typography variant="h4" color="black">Users</Typography>
                                <Typography variant="h4" color="black">67</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="flex-1 min-w-[300px]">
                        <CardBody className="flex justify-between items-center p-5">
                            <MdGroups3 className="h-16 w-16" />
                            <div className="flex flex-col items-end">
                                <Typography variant="h4" color="black">Associates</Typography>
                                <Typography variant="h4" color="black">67</Typography>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="flex-1 min-w-[300px]">
                        <CardBody className="flex justify-between items-center p-5">
                            <FaUsers className="h-16 w-16" />
                            <div className="flex flex-col items-end">
                                <Typography variant="h4" color="black">Bookings</Typography>
                                <Typography variant="h4" color="black">67</Typography>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Card className="flex-1 min-w-[300px]">
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
                    <Card className="flex-1 min-w-[300px]">
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
                            <Chart {...chartConfigBar} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>

    )
}

