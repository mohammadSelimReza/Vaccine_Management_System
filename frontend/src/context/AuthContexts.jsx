import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
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
  }, []);

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
          setDoctorData(null);
        } else {
          fetchDoctorData(userId);
        }
      })
      .catch(() => fetchDoctorData(userId));
  };

  const fetchDoctorData = (userId) => {
    api.get(`/user/doctors/`)
      .then((res) => {
        const doctor = res.data.find(d => d.user.id === userId);
        if (doctor) {
          setDoctorData(doctor);
          setPatientData(null);
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

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    setPatientData(null);
    setDoctorData(null);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, patientData, doctorData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuthContext = () => useContext(AuthContext);
