import Toast from "../plugin/useToast";
import { useAuthStore } from "../Store/auth";
import publicApiInstance from "./publicApiInstance";
import { jwtDecode } from "jwt-decode";

// Login user and store tokens and user state
export const login = async (username, password) => {
  try {
    const { data, status } = await publicApiInstance.post(`/user/api/token/`, {
      username,
      password,
    });

    if (status === 200) {
      await setAuthUser(data.access, data.refresh);
      Toast().fire({
        title: "Login from useAuth successfully",
        icon: "success",
      });
    }
    return { data, error: null };
  } catch (error) {
    console.log(error)
    Toast().fire({
      title: `${error}`,
      icon: "error",
    });
    return { data: null, error };
  }
};
export const handlePatientLogin = async () => {
  try {
    const { data, status } = await publicApiInstance.post(`/user/api/token/`, {
      username:"srreza",
      password:"Django_project@2025",
    });

    if (status === 200) {
      await setAuthUser(data.access, data.refresh);
      Toast().fire({
        title: "Login from useAuth successfully",
        icon: "success",
      });
    }
    return { data, error: null };
  } catch (error) {
    console.log(error)
    Toast().fire({
      title: `${error}`,
      icon: "error",
    });
    return { data: null, error };
  }
};
export const handleDoctorLogin = async () => {
  try {
    const { data, status } = await publicApiInstance.post(`/user/api/token/`, {
      username:"Mr_han",
      password:"Django_Project_2025",
    });

    if (status === 200) {
      await setAuthUser(data.access, data.refresh);
      Toast().fire({
        title: "Login from useAuth successfully",
        icon: "success",
      });
    }
    return { data, error: null };
  } catch (error) {
    console.log(error)
    Toast().fire({
      title: `${error.response.data.detail}`,
      icon: "error",
    });
    return { data: null, error };
  }
};
// Register a doctor
export const doctorRegister = async (data) => {
  try {
    const response = await publicApiInstance.post(
      `/user/doctor/registration/`,
      {
        user: {
          username: data?.user?.username,
          first_name: data?.user?.first_name,
          last_name: data?.user?.last_name,
          email: data?.user?.email,
          password: data?.user?.password,
          password2: data?.user?.password2,
        },
        birth_date: data?.birth_date,
        gender: data?.gender,
        nid: data?.nid,
        phone_number: data?.phone_number,
        city: data?.city,
        street_address: data?.street_address,
        zip_code: data?.zip_code,
        user_type: data?.user_type,
        specialization: data?.specialization,
        license_number: data?.license_number,
        user_photo: data?.user_photo,
      }
    );
    Toast().fire({
      title: "Check your mail to activate your account.",
      icon: "success",
    });
    return { data: response.data.info, error: null };
  } catch (error) {
    Toast().fire({
      title: "Something went wrong.Try again",
      icon: "error",
    });
    return { data: null, error };
  }
};

// Register a patient
export const patientRegister = async (data) => {
  try {
    const response = await publicApiInstance.post(
      `/user/patient/registration/`,
      {
        user: {
          username: data?.user?.username,
          first_name: data?.user?.first_name,
          last_name: data?.user?.last_name,
          email: data?.user?.email,
          password: data?.user?.password,
          password2: data?.user?.password2,
        },
        birth_date: data?.birth_date,
        gender: data?.gender,
        nid: data?.nid,
        phone_number: data?.phone_number,
        city: data?.city,
        street_address: data?.street_address,
        zip_code: data?.zip_code,
        user_type: data?.user_type,
        user_photo: data?.user_photo,
      }
    );
   
    return { data: response.data.info, error: null };
  } catch (error) {
    Toast().fire({
      title: "Something went wrong",
      icon: "error",
    });
    return { data: null, error };
  }
};

// Log out the user
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  useAuthStore.getState().setUser(null);
  Toast().fire({
    title: "You have logged out successfully",
    icon: "success",
  });
};

// Initialize user state by reading tokens from storage
export const setUser = async () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (!access_token || !refresh_token) {
    Toast().fire({
      title: "User state not available. Please log in again.",
      icon: "error",
    });
    return;
  }
  if (isAccessTokenExpired(access_token)) {
    const res = await getRefreshToken(refresh_token);
    await setAuthUser(res.access, res.refresh);
  } else {
    await setAuthUser(access_token, refresh_token);
  }
};

// Set tokens in local storage and update the auth store state
export const setAuthUser = async (access_token, refresh_token) => {
  // Store tokens in localStorage
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  // Decode token to get user data
  const user = jwtDecode(access_token) || null;
  if (user) {
    useAuthStore.getState().setUser(user);
  } else {
    useAuthStore.getState().setLoading(false);
  }
};

// Get new tokens using the refresh token
export const getRefreshToken = async (refresh_token) => {
  try {
    const res = await publicApiInstance.post(`/user/api/token/refresh/`, {
      refresh: refresh_token,
    });
    return res.data;
  } catch (error) {
    Toast().fire({
      title: `${error}`,
      icon: "warning",
    });
    await logout();
    return {};
  }
};

// Check if the access token is expired
export const isAccessTokenExpired = (access_token) => {
  try {
    const decodedToken = jwtDecode(access_token);
    // Compare expiry time with current time (in seconds)
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    Toast().fire({
      title: `${error}`,
      icon: "error",
    });
    return true;
  }
};
