import useUserProfile from "../../../plugin/UserProfile";

const DoctorProfile = () => {
  const { doctor } = useUserProfile();

  return (
    <div className="max-w-6xl md:mt-32 mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Profile</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Profile Details */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Username" value={doctor?.user?.username} />
            <ProfileField
              label="Full Name"
              value={`${doctor?.user?.first_name || ""} ${doctor?.user?.last_name || ""}`}
            />
            <ProfileField label="Email" value={doctor?.user?.email} />
            <ProfileField label="Birth Date" value={doctor?.birth_date || "N/A"} />
            <ProfileField label="Gender" value={doctor?.gender || "N/A"} />
            <ProfileField label="NID" value={doctor?.nid || "N/A"} />
            <ProfileField label="Phone Number" value={doctor?.phone_number || "N/A"} />
            <ProfileField label="City" value={doctor?.city || "N/A"} />
            <ProfileField label="Street Address" value={doctor?.street_address || "N/A"} />
            <ProfileField label="Zip Code" value={doctor?.zip_code || "N/A"} />
            <ProfileField label="User Type" value={doctor?.user_type || "N/A"} />

            {/* Doctor-specific details */}
            {doctor && (
              <>
                <ProfileField label="Specialization" value={doctor?.specialization || "N/A"} />
                <ProfileField label="License Number" value={doctor?.license_number || "N/A"} />
                <ProfileField label="Clinic Address" value={doctor?.clinic_address || "N/A"} />
              </>
            )}
          </div>
        </div>

        {/* Right Section: Profile Photo */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Photo</h2>
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
            <img
              src={doctor?.user_photo || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Profile Field Component
// eslint-disable-next-line react/prop-types
const ProfileField = ({ label, value }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center">
    <label className="text-gray-700 font-semibold w-40">{label}:</label>
    <p className="text-gray-900">{value}</p>
  </div>
);

export default DoctorProfile;
