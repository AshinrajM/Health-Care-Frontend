import React from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    PowerIcon,
    PhotoIcon,
    UserGroupIcon,
    UsersIcon,
    BriefcaseIcon
} from "@heroicons/react/24/solid";


export default function SideBar() {
    return (
        <>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" >
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        HealthCare
                    </Typography>
                </div>
                <List>
                    <ListItem>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <ShoppingBagIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Bookings
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <UserGroupIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Users
                        <ListItemSuffix>
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <BriefcaseIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Associates
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <PhotoIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Banners
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </>
    )
}
