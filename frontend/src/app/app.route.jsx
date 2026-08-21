import {createBrowserRouter} from "react-router"
import Register from "../features/auth/Pages/Register.jsx"

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Register/>
    },

    {
        path:"/register",
        element: <Register/>
    }

])
