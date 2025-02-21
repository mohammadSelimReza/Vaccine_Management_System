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
        <Route path="/campaign/list" element={<Campaign />}></Route>
        <Route path="/user/profile" element={<ProfileMain />}></Route>
        <Route
          path="/user/change/password"
          element={<PasswordChange />}
        ></Route>
        <Route path="/user/update/name" element={<UserNameChange />}></Route>
        <Route path="/user/update/profile" element={<UserBioUpdate />}></Route>
        <Route path="/user/vaccine/report" element={<VaccineReport />}></Route>
        <Route path="/user/capaign/report" element={<CampaignReport />}></Route>
        <Route path="/doctor/dashboard" element={<DoctorDashboardLayout />}>
          <Route path="state" element={<DoctorDashbord />} />
          <Route path="vaccine/report" element={<DoctorVaccineReport />} />
          <Route path="campaign/report" element={<DoctorCampaignDasboard />} />
          <Route path="doctor/profile" element={<DoctorProfile />} />
          <Route path="doctor/bio/update" element={<DoctorUpBio />} />
          <Route path="doctor/name/update" element={<DoctorNameChange />} />
          <Route path="doctor/pass/update" element={<DoctorPassChange />} />
          <Route path="vaccine/add" element={<VaccineAdd />} />
          <Route path="vaccine/edit/:id" element={<EditVaccine />} />
          <Route path="campaign/add/" element={<CampaignAdd />} />

        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
