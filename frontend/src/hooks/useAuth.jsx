import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      const decoded = jwtDecode(token);
      setIsAuth(true);

      // Fetch user data
      api.get(`/user/users/${decoded.user_id}/`)
        .then((res) => {
          setUser(res.data);
          fetchAdditionalData(decoded.user_id);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          handleAuthFailure();
        });
    } else {
      setIsAuth(false);
      setUser(null);
    }
  }, [navigate]);

  const fetchAdditionalData = (userId) => {
    // Try to fetch patient data
    api.get(`/user/patients/`)
      .then((res) => {
        const patient = res.data.find(p => p.user.id === userId);
        if (patient) {
          setPatientData(patient);
          setDoctorData(null); // Ensure doctorData is null if patient data is found
        } else {
          // Fetch doctor data if no patient data found
          api.get(`/user/doctors/`)
            .then((res) => {
              const doctor = res.data.find(d => d.user.id === userId);
              if (doctor) {
                setDoctorData(doctor);
              }
            })
            .catch((err) => {
              console.error("Failed to fetch doctor data:", err);
              handleAuthFailure();
            });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch patient data:", err);
        // Try to fetch doctor data if patient fetch fails
        api.get(`/user/doctors/`)
          .then((res) => {
            const doctor = res.data.find(d => d.user.id === userId);
            if (doctor) {
              setDoctorData(doctor);
            }
          })
          .catch((err) => {
            console.error("Failed to fetch doctor data:", err);
            handleAuthFailure();
          });
      });
  };

  const handleAuthFailure = () => {
    setIsAuth(false);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate("/login");
  };

  return { isAuth, user, setIsAuth, setUser, navigate, patientData, doctorData };
};

export default useAuth;
