import { useEffect, useState } from "react";
import BaseHeader from "../PartialComponent/BaseHeader";
import BaseFooter from "../PartialComponent/BaseFooter";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import useUserProfile from "../../plugin/UserProfile";

const ProfileMain = () => {
  const [error, setError] = useState(null);
  const {loading,setLoading,patient,doctor} = useUserProfile();
  const user = "mew";
  const patientData = "mew";
  const doctorData = "mew";

  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <>
      <BaseHeader />
      <Header/>
      <div className="flex max-w-screen-xl mx-auto">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex w-3/4">
          <div className=" mx-auto p-4 w-3/4">
            <h1 className="md:text-2xl font-bold text-center mb-10">
              My Profile
            </h1>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                Username:
              </label>
              <p>{patient?.user?.username}</p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                Full Name:
              </label>
              <p>
                {patient?.user?.first_name} {patient?.user?.last_name}{" "}
              </p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">Email:</label>
              <p>{patient?.user?.email}</p>
            </div>

            {/* Conditional Rendering for Patient or Doctor Data */}
            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                Birth Date:
              </label>
              <p>
                {patient?.birth_date || doctor?.birth_date || "N/A"}
              </p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                Gender:
              </label>
              <p>{patient?.gender || doctor?.gender || "N/A"}</p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">NID:</label>
              <p>{doctor?.nid || patient?.nid || "N/A"}</p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                Phone Number:
              </label>
              <p>
                {patient?.phone_number || doctor?.phone_number || "N/A"}
              </p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">City:</label>
              <p>{patient?.city || doctor?.city || "N/A"}</p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                Street Address:
              </label>
              <p>
                {patient?.street_address ||
                  doctor?.street_address ||
                  "N/A"}
              </p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                Zip Code:
              </label>
              <p>{patient?.zip_code || doctor?.zip_code || "N/A"}</p>
            </div>

            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">
                User Type:
              </label>
              <p>{patient?.user_type || doctor?.user_type || "N/A"}</p>
            </div>

            {/* Display additional doctor-specific data if available */}
            {doctor && (
              <>
                <div className="mb-4 md:flex">
                  <label className="block mb-2 font-semibold md:w-40">
                    Specialization:
                  </label>
                  <p>{doctor?.specialization || "N/A"}</p>
                </div>

                <div className="mb-4 md:flex">
                  <label className="block mb-2 font-semibold md:w-40">
                    License Number:
                  </label>
                  <p>{doctor?.license_number || "N/A"}</p>
                </div>

                <div className="mb-4 md:flex">
                  <label className="block mb-2 font-semibold md:w-40">
                    Clinic Address:
                  </label>
                  <p>{doctor?.clinic_address || "N/A"}</p>
                </div>
              </>
            )}
          </div>
          {/* <div className="w-1/4">
            <h2 className="text-xl font-semibold mb-4">Profile Photo</h2>
            <img
              src={doctorData?.user_photo || patientData?.user_photo || "N/A"}
              className="rounded"
              alt=""
            />
          </div> */}
        </div>
      </div>

      <BaseFooter />
    </>
  );
};

export default ProfileMain;
