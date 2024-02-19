import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { IoBriefcaseOutline } from "react-icons/io5";

export default function AssociateLogin() {
    return (
        <div className='bg-teal-300 h-full min-h-screen p-5'>
            <div className='h-auto w-auto'>
                <img src="src/assets/logo/check.webp" alt="logo" />
            </div>
            <div>
                <Card className="my-20 py-4 max-w-md mx-auto  rounded-xl p-5 bg-amber-50">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center">
                        <div class="flex items-center gap-8">
                            <IoBriefcaseOutline className="h-8 w-8" />
                            <Typography variant="h3" color="white">
                                Sign In
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Email" size="lg" />
                        <Input label="Password" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth>
                            Sign In
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
