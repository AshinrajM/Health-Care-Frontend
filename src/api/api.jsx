import axios from "axios"


const userToken = localStorage.getItem('userAccess');
const adminToken = localStorage.getItem('adminAccess');
const associateToken = localStorage.getItem('associateAccess');

let token

if (userToken) {
    token = userToken
} else if (adminToken) {
    token = adminToken
} else if (associateToken) {
    token = associateToken
}

console.log("Token being sent:", token);

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    config => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Server responded with a status other than 200 range
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized errors
                    console.log("Unauthorized access. Please log in.");
                    // Redirect to login or perform any logout actions here
                    break;
                case 403:
                    // Handle forbidden errors
                    console.log("You do not have permission to perform this action.");
                    break;
                case 404:
                    // Handle not found errors
                    console.log("Resource not found.");
                    break;
                case 500:
                    // Handle server errors
                    console.log("Internal server error. Please try again later.");
                    break;
                default:
                    console.log(`Error: ${error.response.status}. ${error.response.data.detail || "An error occurred."}`);
            }
        } else if (error.request) {
            // No response was received
            toast.error("No response from server. Please check your network connection.");
        } else {
            // Something happened in setting up the request
            toast.error(`Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);



export default axiosInstance;

// export const BASE_URL = 'http://127.0.0.1:8000'