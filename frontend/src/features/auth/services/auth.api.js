import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "http://localhost:5000/auth/api",
  withCredentials: true,
})


export async function register({ email, contact, password, fullname, isSeller }) {
  const response = await authApiInstance.post("/register", {
    contact,
    email,
    password,
    fullname,
    isSeller,
  });
  return response.data;
}

export async function login({ email, password }) {
  const response = await authApiInstance.post("/login", {
    email,
    password,
  });
  return response.data;
}

