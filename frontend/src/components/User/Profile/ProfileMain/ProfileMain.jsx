import { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";

const ProfileMain = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, patientData, doctorData } = useAuth();
  useEffect(() => {
    // Assuming you have some mechanism to determine if data is still loading or if there's an error
    // For instance, you might set loading to false and handle errors based on API response
    if (user && (patientData || doctorData)) {
      setLoading(false);
    }
  }, [user, patientData, doctorData]);
  console.log(doctorData);
//   if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-96 mx-auto p-4">
      <h1 className="md:text-2xl font-bold text-center mb-10">My Profile</h1>
      
      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Username:</label>
        <p>{user?.username}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Full Name:</label>
        <p>{user?.first_name} {user?.last_name}  </p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Email:</label>
        <p>{user?.email}</p>
      </div>

      {/* Conditional Rendering for Patient or Doctor Data */}
      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Birth Date:</label>
        <p>{patientData?.birth_date || doctorData?.birth_date || "N/A"}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Gender:</label>
        <p>{patientData?.gender || doctorData?.gender || "N/A"}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">NID:</label>
        <p>{patientData?.nid || doctorData?.nid || "N/A"}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Phone Number:</label>
        <p>{patientData?.phone_number || doctorData?.phone_number || "N/A"}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">City:</label>
        <p>{patientData?.city || doctorData?.city || "N/A"}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Street Address:</label>
        <p>{patientData?.street_address || doctorData?.street_address || "N/A"}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">Zip Code:</label>
        <p>{patientData?.zip_code || doctorData?.zip_code || "N/A"}</p>
      </div>

      <div className="mb-4 md:flex">
        <label className="block mb-2 font-semibold md:w-40">User Type:</label>
        <p>{patientData?.user_type || doctorData?.user_type || "N/A"}</p>
      </div>

      {/* Display additional doctor-specific data if available */}
      {doctorData && (
        <>
          <div className="mb-4 md:flex">
            <label className="block mb-2 font-semibold md:w-40">Specialization:</label>
            <p>{doctorData?.specialization || "N/A"}</p>
          </div>

          <div className="mb-4 md:flex">
            <label className="block mb-2 font-semibold md:w-40">License Number:</label>
            <p>{doctorData?.license_number || "N/A"}</p>
          </div>

          <div className="mb-4 md:flex">
            <label className="block mb-2 font-semibold md:w-40">Clinic Address:</label>
            <p>{doctorData?.clinic_address || "N/A"}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileMain;
