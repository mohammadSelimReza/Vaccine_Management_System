import { useEffect, useState } from "react";
import useAuth from "../../../../../context/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../../../../../api";
import toast from "react-hot-toast";

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
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { user, patientData, doctorData } = useAuth(); // Assuming user data is available through context
    const navigate = useNavigate();
    useEffect(() => {
        // Pre-fill the form with existing user data based on role
        const data = patientData || doctorData;
        if (data) {
            setFormData({
                birth_date: data.birth_date || "",
                gender: data.gender || "",
                nid: data.nid || "",
                phone_number: data.phone_number || "",
                city: data.city || "",
                street_address: data.street_address || "",
                zip_code: data.zip_code || "",
            });
        }
    }, [patientData, doctorData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.patch(`/user/doctors/${user.id}/`, formData);

            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError("Failed to update your profile. Please try again.");
            }
        } catch (error) {
            setError("An error occurred while updating your profile. Please try again.");
        } finally {
            setLoading(false);
            toast.success("Profile updated successfully.");
            navigate("/dashboard/about");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-96 mx-auto p-4">
            <h1 className="md:text-2xl font-bold text-center mb-10">Update Your Profile</h1>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Birth Date:</span>
                <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    className="grow"
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Gender:</span>
                <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="grow"
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">NID:</span>
                <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    className="grow"
                    disabled
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Phone Number:</span>
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="grow"
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">City:</span>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="grow"
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Street Address:</span>
                <input
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleChange}
                    className="grow"
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Zip Code:</span>
                <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className="grow"
                />
            </label>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">Profile updated successfully!</p>}
        </form>
    );
};

export default DoctorUpBio;
