import { createBrowserRouter } from "react-router";
import Register from "../features/auth/Pages/Register.jsx";
import Login from "../features/auth/Pages/Login.jsx";
import Home from "../features/home/Pages/Home.jsx";
import CreateProduct from "../features/product/pages/CreateProduct.jsx";
import Dashboard from "../features/product/pages/Dashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller",
    children:[
      {
        path:"/seller/create-product",
        element: <CreateProduct />,
      },

      {
        path:"/seller/dashboard",
        element:<Dashboard/>
      }

    ]
    
  },

]);

