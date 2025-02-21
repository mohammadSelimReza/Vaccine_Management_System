import { useEffect, useState, useCallback } from "react";
import publicApiInstance from "../../../Utils/publicApiInstance";
import { Link, useNavigate } from "react-router";
import authApiInstance from "../../../Utils/authApiInstance";
import Toast from "../../../plugin/useToast";

const DoctorVaccineReport = () => {
  const [vaccineData, setVaccineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Vaccine Data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await publicApiInstance.get("/vaccine/list/");
      setVaccineData(res.data);
    } catch (err) {
      console.error("Error fetching vaccine data:", err);
      setError("Failed to load vaccine data.");
    } finally {
      setLoading(false);
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const hadleEdit = (id) => {
    navigate(`/doctor/dashboard/vaccine/edit/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      await authApiInstance().delete(`/vaccine/delete/${id}/`);
      Toast().fire({
        title: "Successfully Deleted. Reloading Page",
        icon: "success",
      });
      setVaccineData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      Toast().fire({
        title: `Error: ${error}`,
        icon: "error",
      });
    }
  };
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-bold text-center md:mb-10">
          Vaccine History
        </h1>
        <div className="md:flex md:justify-end md:mb-10">
          <button className="btn btn-primary">
            <Link to="/doctor/dashboard/vaccine/add">Add Vaccine</Link>
          </button>
        </div>
        {/* Show Loading State */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}

        {/* Show Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Show Table if Data Exists */}
        {!loading && !error && vaccineData.length > 0 ? (
          <table className="table w-full">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="hidden md:table-cell">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Vaccine Name</th>
                <th className="hidden sm:table-cell">Manufacturer</th>
                <th className="hidden sm:table-cell">Description</th>
                <th>Vaccine For</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {vaccineData.map((vaccine) => (
                <tr key={vaccine.id}>
                  <th className="hidden md:table-cell">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              vaccine?.vaccine_img ||
                              "https://res.cloudinary.com/dofqxmuya/image/upload/v1725324279/rmg19lz3l0yrtrg4yrdo.jpg"
                            }
                            alt="Vaccine Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {vaccine?.vaccine_name || "Unknown"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell">
                    {vaccine?.manufacturer || "Unknown Manufacturer"}
                  </td>
                  <td className="hidden sm:table-cell">
                    {vaccine?.description || "No Description Available"}
                  </td>
                  <td>{vaccine?.vaccine_for || "Unknown"}</td>
                  <td className="text-center">
                    <button
                      onClick={() => hadleEdit(vaccine?.id)}
                      className="btn btn-ghost btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vaccine?.id)}
                      className="btn btn-ghost btn-xs text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-500">No Vaccine Data Found</p>
          )
        )}
      </div>
    </div>
  );
};

export default DoctorVaccineReport;
