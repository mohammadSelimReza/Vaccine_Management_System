import { useState } from "react";
import useUserProfile from "../../../plugin/UserProfile";
import { useNavigate } from "react-router";
import authApiInstance from "../../../Utils/authApiInstance";
import Toast from "../../../plugin/useToast";

const DoctorPassChange = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      Toast().fire({ title: "Passwords do not match.", icon: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await authApiInstance().put(`/user/update-password/`, {
        password,
        password2: confirmPassword,
      });

      if (response.status === 200) {
        Toast().fire({ title: "Password updated successfully!", icon: "success" });
        navigate("/doctor/dashboard/doctor/profile");
      }
    } catch {
      Toast().fire({ title: "Failed to change password. Try again.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Change Your Password
      </h1>
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <InputField label="New Password" type="password" value={password} onChange={setPassword} />
        <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, type, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold">{label}:</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md p-2 focus:ring focus:ring-blue-200 bg-white"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

export default DoctorPassChange;
