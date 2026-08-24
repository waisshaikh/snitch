import { createBrowserRouter } from "react-router";
import Register from "../features/auth/Pages/Register.jsx";
import Home from "../features/home/Pages/Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
