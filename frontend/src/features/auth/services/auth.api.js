import axios from "axios";

const apiinstance = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})