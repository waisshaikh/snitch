import axios from "axios";

const autApiInstence = axios({
    baseURL:"http://localhost:300/api/aut",
    withCredentials:true
})


export async function register ({email,contact,password,fullname}) {
    const response = await autApiInstence.post("/register",{
        contact,
        email,
        password,
        fullname
    })
    return response.data

    
}