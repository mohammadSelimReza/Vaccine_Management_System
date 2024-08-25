import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Root from "./components/Root/Root.jsx";
import Home from "./components/Home/Home.jsx";
import Vaccine from "./components/Pages/Vaccine/Vaccine.jsx";
import Campaign from "./components/Pages/Campaign/Campaign.jsx";
import ErrorPage from "./components/Pages/ErrorPage/ErrorPage.jsx";
import Login from "./components/User/Login/Login.jsx";
import ProtectedRoute from "./components/PrivateRoute/ProtectedRoute.jsx";
import api from "./api.js";
import PatientRegister from "./components/User/Registration/PatientRegister.jsx";
const Logout = async (route) => {
  const navigate = useNavigate();

  try {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    await api.post(route);
    navigate("/");
  } catch (error) {
    console.error("Error during logout:", error.message);
   }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/vaccine",
        element: <Vaccine></Vaccine>,
      },
      {
        path: "/campaign",
        element: <Campaign></Campaign>,
      },
      {
        path: "/login",
        element: <Login route="/user/api/token/" method="login"></Login>,
      },
      {
        path: "/registration",
        element: (
          // <Registration route="/user/patient/registration/" method="register" />
          <PatientRegister
            route="/user/patient/registration/"
            method="register"
          ></PatientRegister>
        ),
      },
      {
        path: "/logout",
        element: <Logout route="/user/logout/" />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
