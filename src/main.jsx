import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Views/BaseComponent/Home/Index.jsx";
import PatientRegister from "./Views/AuthComponent/PatientRegister.jsx";
import Login from "./Views/AuthComponent/Login.jsx";
import Vaccine from "./Views/BaseComponent/Vaccine/Vaccine.jsx";
import Campaign from "./Views/BaseComponent/Campaing/Campaign.jsx";
import NotFound from "./Views/BaseComponent/NotFound/NotFound.jsx";
import ProfileMain from "./Views/RoleBasedComponent/ProfileMenu.jsx";
import PasswordChange from "./Views/RoleBasedComponent/ChangePassword.jsx";
import UserNameChange from "./Views/RoleBasedComponent/UpdateName.jsx";
import UserBioUpdate from "./Views/RoleBasedComponent/UpdateBio.jsx";
import VaccineReport from "./Views/RoleBasedComponent/Patient/VaccineHistory/PatientVaccineHistory.jsx";
import CampaignReport from "./Views/RoleBasedComponent/Patient/CampaignReport/CampaignReport.jsx";
import Logout from "./Views/AuthComponent/Logout.jsx";
import About from "./Views/BaseComponent/About/About.jsx";
import DoctorRegistraition from "./Views/AuthComponent/DoctorRegistration.jsx";
// import Dashboard from './Views/RoleBasedComponent/Doctor/DoctorDashboard.jsx'
import DoctorDashboardLayout from "./Views/RoleBasedComponent/Doctor/DoctorDashboardLayout.jsx";
import DoctorDashbord from "./Views/RoleBasedComponent/Doctor/DoctorDashboard.jsx";
import DoctorVaccineReport from "./Views/RoleBasedComponent/Doctor/DoctorVaccineReport.jsx";
import DoctorCampaignDasboard from "./Views/RoleBasedComponent/Doctor/DoctorCampaignDash.jsx";
import DoctorProfile from "./Views/RoleBasedComponent/Doctor/DoctorProfile.jsx";
import DoctorUpBio from "./Views/RoleBasedComponent/Doctor/DoctorUpdateBio.jsx";
import DoctorNameChange from "./Views/RoleBasedComponent/Doctor/DoctorName.jsx";
import DoctorPassChange from "./Views/RoleBasedComponent/Doctor/DoctorPassUpdate.jsx";
import VaccineAdd from "./Views/RoleBasedComponent/Doctor/NewVaccine.jsx";
import EditVaccine from "./Views/RoleBasedComponent/Doctor/EditVaccine.jsx";
import CampaignAdd from "./Views/RoleBasedComponent/Doctor/NewCampaign.jsx";
import VaccineDetail from "./Views/BaseComponent/Vaccine/VaccineDetail.jsx";
import PrivateRoute from "./Layouts/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/patient/register" element={<PatientRegister />}></Route>
        <Route
          path="/doctor/register"
          element={<DoctorRegistraition />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/vaccine/list" element={<Vaccine />}></Route>
        <Route path="/vaccine/detail/:id" element={<VaccineDetail />}></Route>
        <Route path="/campaign/list" element={<Campaign />}></Route>
        <Route path="/user/profile" element={
          <PrivateRoute>
            <ProfileMain />
          </PrivateRoute>
        }></Route>
        <Route
          path="/user/change/password"
          element={
            <PrivateRoute>
              <PasswordChange />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/user/update/name" element={
          <PrivateRoute>
            <UserNameChange />
          </PrivateRoute>
        }></Route>
        <Route path="/user/update/profile" element={
          <PrivateRoute>
            <UserBioUpdate />
          </PrivateRoute>
        }></Route>
        <Route path="/user/vaccine/report" element={
          <PrivateRoute>
            <VaccineReport />
          </PrivateRoute>
        }></Route>
        <Route path="/user/capaign/report" element={
          <PrivateRoute>
            <CampaignReport />
          </PrivateRoute>
        }></Route>
        <Route path="/doctor/dashboard" element={
          <PrivateRoute>
            <DoctorDashboardLayout />
          </PrivateRoute>
        }>
          <Route path="state" element={
            <PrivateRoute>
              <DoctorDashbord />
            </PrivateRoute>
          } />
          <Route path="vaccine/report" element={
            <PrivateRoute>
              <DoctorVaccineReport />
            </PrivateRoute>
          } />
          <Route path="campaign/report" element={
            <PrivateRoute>
              <DoctorCampaignDasboard />
            </PrivateRoute>
          } />
          <Route path="doctor/profile" element={
            <PrivateRoute>
              <DoctorProfile />
            </PrivateRoute>
          } />
          <Route path="doctor/bio/update" element={
            <PrivateRoute>
              <DoctorUpBio />
            </PrivateRoute>
          } />
          <Route path="doctor/name/update" element={
            <PrivateRoute>
              <DoctorNameChange />
            </PrivateRoute>
          } />
          <Route path="doctor/pass/update" element={
            <PrivateRoute>
              <DoctorPassChange />
            </PrivateRoute>
          } />
          <Route path="vaccine/add" element={
            <PrivateRoute>
              <VaccineAdd />
            </PrivateRoute>
          } />
          <Route path="vaccine/edit/:id" element={
            <PrivateRoute>
              <EditVaccine />
            </PrivateRoute>
          } />
          <Route path="campaign/add/" element={
            <PrivateRoute>
              <CampaignAdd />
            </PrivateRoute>
          } />

        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
