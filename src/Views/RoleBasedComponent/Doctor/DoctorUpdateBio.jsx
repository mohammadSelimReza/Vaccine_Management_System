import { useEffect, useState } from "react";
import useUserProfile from "../../../plugin/UserProfile";
import { useNavigate } from "react-router";
import authApiInstance from "../../../Utils/authApiInstance";
import Toast from "../../../plugin/useToast";

const DoctorUpBio = () => {
  const [formData, setFormData] = useState({
    birth_date: "",
    gender: "",
    nid: "",
    phone_number: "",
    city: "",
    street_address: "",
    zip_code: "",
  });
  const [loading, setLoading] = useState(false);
  const { doctor } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor) {
      setFormData({
        birth_date: doctor.birth_date || "",
        gender: doctor.gender || "",
        nid: doctor.nid || "",
        phone_number: doctor.phone_number || "",
        city: doctor.city || "",
        street_address: doctor.street_address || "",
        zip_code: doctor.zip_code || "",
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApiInstance().patch(
        `/user/doctors/${doctor?.user?.id}/`,
        formData
      );
      if (response.status === 200) {
        Toast().fire({
          title: "Profile updated successfully.",
          icon: "success",
        });
        navigate("/doctor/dashboard/doctor/profile");
      }
    } catch {
      Toast().fire({
        title: "Error updating profile. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Update Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Birth Date"
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />
        <InputField
          label="Gender"
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <InputField
          label="NID"
          type="text"
          name="nid"
          value={formData.nid}
          disabled
        />
        <InputField
          label="Phone Number"
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <InputField
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <InputField
          label="Street Address"
          type="text"
          name="street_address"
          value={formData.street_address}
          onChange={handleChange}
        />
        <InputField
          label="Zip Code"
          type="text"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled = false,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border rounded-md p-2 focus:ring focus:ring-blue-200 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`}
    />
  </div>
);

export default DoctorUpBio;
