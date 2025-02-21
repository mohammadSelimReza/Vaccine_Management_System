import { useEffect, useState } from "react";
import authApiInstance from "../Utils/authApiInstance";
import UserData from "./UserData";

const useUserProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = UserData();
  const user_id = user?.user_id;
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const patientRes = await authApiInstance().get(
          `/user/patients/${user_id}/`
        );
        if (patientRes.data && patientRes.data.user_type === "patient") {
          setPatient(patientRes.data);
        }
      } catch (error) {
        // If patient request fails, try the doctor request
        try {
          const doctorRes = await authApiInstance().get(
            `/user/doctors/${user_id}/`
          );
          if (
            doctorRes.data &&
            doctorRes.data.user_type.toLowerCase() === "doctor"
          ) {
            setDoctor(doctorRes.data);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      fetchUser();
    } else {
      // If user_id is null, reset state
      setDoctor(null);
      setPatient(null);
    }
  }, [user_id]);

  return { setLoading, doctor, patient, loading };
};

export default useUserProfile;
