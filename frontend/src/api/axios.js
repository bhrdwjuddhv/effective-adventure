import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;