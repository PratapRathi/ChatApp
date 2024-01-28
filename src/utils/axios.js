import axios from "axios";

// BASE URL
import { BASE_URL } from "../config";

const axiosIntance = axios.create({baseURL:BASE_URL});

axios.interceptors.response.use((response)=>response, (error)=>Promise.reject((error.response && error.response.data) || "Something went wrong"))


export default axiosIntance;