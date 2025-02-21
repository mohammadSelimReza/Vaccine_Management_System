import { useState } from "react";
import useUserProfile from "../../../plugin/UserProfile";
import { useNavigate } from "react-router";
import authApiInstance from "../../../Utils/authApiInstance";
import Toast from "../../../plugin/useToast";

const DoctorNameChange = () => {
  const { doctor } = useUserProfile();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(doctor?.user?.first_name || "");
  const [lastName, setLastName] = useState(doctor?.user?.last_name || "");
  const [loading, setLoading] = useState(false);
    console.log(doctor)
  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApiInstance().patch(`/user/update-name/`, {
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 200) {
        Toast().fire({ title: "Your name has been updated", icon: "success" });
        navigate("/doctor/dashboard/doctor/profile");
      }
    } catch {
      Toast().fire({
        title: "Failed to update name. Try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Change Your Name
      </h1>
      <form onSubmit={handleNameSubmit} className="space-y-4">
        <InputField
          label="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        <InputField label="Last Name" value={lastName} onChange={setLastName} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Name"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold">{label}:</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md p-2 focus:ring focus:ring-blue-200 bg-white"
      placeholder={`Enter your ${label.toLowerCase()}...`}
    />
  </div>
);

export default DoctorNameChange;
