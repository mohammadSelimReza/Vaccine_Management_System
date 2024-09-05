import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root.jsx";
import Home from "./components/Home/Home.jsx";
import Vaccine from "./components/Pages/Vaccine/Vaccine.jsx";
import Campaign from "./components/Pages/Campaign/Campaign.jsx";
import ErrorPage from "./components/Pages/ErrorPage/ErrorPage.jsx";
import Login from "./components/User/Login/Login.jsx";
import PatientRegister from "./components/User/Registration/PatientRegister.jsx";
import ProfileMain from "./components/User/Profile/ProfileMain/ProfileMain.jsx";
import UserNameChange from "./components/User/Profile/UserNameChange/UserNameChange.jsx";
import ProfileLayout from "./components/User/Profile/ProfileLayout/ProfileLayout.jsx";
import UserBioUpdate from "./components/User/Profile/UserBioUpdate/UserBioUpdate.jsx";
import PasswordChange from "./components/User/Profile/PasswordChange/PasswordChange.jsx";
import VaccineReport from "./components/Pages/VaccineReport/VaccineReport.jsx";
import CampaignReport from "./components/Pages/CampaignReport/CampaignReport.jsx";
import CommentForm from "./components/Pages/PeopleComments/CommentForm.jsx";
import CampaignAdd from "./components/Pages/Edit/CampaignEdit.jsx";
import VaccineAdd from "./components/Pages/Edit/VaccineEdit/VaccineAdd.jsx";
import DoctorRegistration from "./components/User/Registration/DoctorRegistration.jsx";
import DoctorHome from "./components/User/Profile/Dashboard/DoctorHome/DoctorHome.jsx";
import DoctorPassChange from "./components/User/Profile/Dashboard/DoctorPassChange/DoctorPassChange.jsx";
import DoctorUpBIo from "./components/User/Profile/Dashboard/DoctorUpBio/DoctorUpBIo.jsx";
import DoctorAbout from "./components/User/Profile/Dashboard/DoctorAbout/DoctorAbout.jsx";
import DashboardCampaign from "./components/User/Profile/Dashboard/DashboardCampaign/DashboardCampaign.jsx";
import DashboardVaccine from "./components/User/Profile/Dashboard/DashboardVaccine/DashboardVaccine.jsx";
import DashboardUser from "./components/User/Profile/Dashboard/DashboardUser/DashboardUser.jsx";
import DashboardLayout from "./components/User/Profile/Dashboard/DashboardLayout/DashboardLayout.jsx";

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
        path: "/registration/patient",
        element: (
          // <Registration route="/user/patient/registration/" method="register" />
          <PatientRegister
            route="/user/patient/registration/"
            method="register"
          ></PatientRegister>
        ),
      },
      {
        path: "/registration/doctor",
        element: (
          // <Registration route="/user/doctor/registration/" method="register" />
          <DoctorRegistration
            route="/user/doctor/registration/"
            method="register"
          ></DoctorRegistration>
        ),
      },
      {
        path: "/vaccine/report",
        element: <VaccineReport></VaccineReport>,
      },
      {
        path: "/campaign/report",
        element: <CampaignReport></CampaignReport>,
      },
      {
        path: "/campaign/comments",
        element: <CommentForm></CommentForm>,
      },
      {
        path: "/vaccine/edit",
        element: <VaccineAdd></VaccineAdd>,
      },
      {
        path: "/campaign/edit",
        element: <CampaignAdd></CampaignAdd>,
      },
      {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
          {
            path: "/profile",
            element: <ProfileMain />,
          },
          {
            path: "/profile/update-name",
            element: <UserNameChange />,
          },
          {
            path: "/profile/update-bio",
            element: <UserBioUpdate />,
          },
          {
            path: "/profile/change-password",
            element: <PasswordChange />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children:[
          {
            path: "/dashboard",
            element: <DoctorHome></DoctorHome>,
          },
          {
            path: "/dashboard/user",
            element: <DashboardUser></DashboardUser>
          },
          {
            path: "/dashboard/vaccine",
            element: <DashboardVaccine></DashboardVaccine>
          },
          {
            path: "/dashboard/campaign",
            element: <DashboardCampaign></DashboardCampaign>,
          },
          {
            path: "/dashboard/about",
            element: <DoctorAbout></DoctorAbout>,
          },
          {
            path: "/dashboard/update-bio",
            element: <DoctorUpBIo></DoctorUpBIo>,
            
          },
          {
            path: "/dashboard/change-password",
            element: <DoctorPassChange></DoctorPassChange>
          }
        ]
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);