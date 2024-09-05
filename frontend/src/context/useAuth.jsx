// import { useEffect } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import { jwtDecode } from "jwt-decode";
// import api from "../api";
// const useAuth = () => {
//   const [isAuth, setIsAuth] = useState(false);
//   const [patientData, setPatientData] = useState(null);
//   const [doctorData, setDoctorData] = useState(null);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem(ACCESS_TOKEN);

//     if (token) {
//       const decoded = jwtDecode(token);
//       setIsAuth(true);
//       fetchUserData(decoded.user_id);
//     } else {
//       handleAuthFailure();
//     }
//   }, []);  // Empty dependency array ensures this runs once on mount

//   const fetchUserData = (userId) => {
//     api.get(`/user/users/${userId}/`)
//       .then((res) => {
//         setUser(res.data);
//         fetchRoleSpecificData(userId);
//       })
//       .catch(handleAuthFailure);
//   };

//   const fetchRoleSpecificData = (userId) => {
//     api.get(`/user/patients/`)
//       .then((res) => {
//         const patient = res.data.find(p => p.user.id === userId);
//         if (patient) {
//           setPatientData(patient);
//           setDoctorData(null);  // Clear doctor data if patient found
//         } else {
//           fetchDoctorData(userId);
//         }
//       })
//       .catch(() => fetchDoctorData(userId));  // Fallback to doctor data fetch
//   };

//   const fetchDoctorData = (userId) => {
//     api.get(`/user/doctors/`)
//       .then((res) => {
//         const doctor = res.data.find(d => d.user.id === userId);
//         if (doctor) {
//           setDoctorData(doctor);
//           setPatientData(null);  // Clear patient data if doctor found
//         }
//       })
//       .catch(handleAuthFailure);
//   };

//   const handleAuthFailure = () => {
//     setIsAuth(false);
//     setUser(null);
//     setPatientData(null);
//     setDoctorData(null);
//     localStorage.removeItem(ACCESS_TOKEN);
//     localStorage.removeItem(REFRESH_TOKEN);
//     navigate("/login");
//   };
//   return { isAuth, user, setIsAuth, setUser, navigate, patientData, doctorData };
// };

// export default useAuth;
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      const decoded = jwtDecode(token);
      setIsAuth(true);
      fetchUserData(decoded.user_id);
    } else {
      handleAuthFailure();
    }
  }, []);  // Empty dependency array ensures this runs once on mount

  const fetchUserData = (userId) => {
    api.get(`/user/users/${userId}/`)
      .then((res) => {
        setUser(res.data);
        fetchRoleSpecificData(userId);
      })
      .catch(handleAuthFailure);
  };

  const fetchRoleSpecificData = (userId) => {
    api.get(`/user/patients/`)
      .then((res) => {
        const patient = res.data.find(p => p.user.id === userId);
        if (patient) {
          setPatientData(patient);
          setDoctorData(null);  // Clear doctor data if patient found
        } else {
          fetchDoctorData(userId);
        }
      })
      .catch(() => fetchDoctorData(userId));  // Fallback to doctor data fetch
  };

  const fetchDoctorData = (userId) => {
    api.get(`/user/doctors/`)
      .then((res) => {
        const doctor = res.data.find(d => d.user.id === userId);
        if (doctor) {
          setDoctorData(doctor);
          setPatientData(null);  // Clear patient data if doctor found
        }
      })
      .catch(handleAuthFailure);
  };

  const handleAuthFailure = () => {
    setIsAuth(false);
    setUser(null);
    setPatientData(null);
    setDoctorData(null);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate("/login");
  };

  return { isAuth, user, setIsAuth, setUser, navigate, patientData, doctorData };
};

export default useAuth;
