import React, { useEffect, useState } from "react";
import api from "../../../../../api";

const DashboardUser = () => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/user/patients/");
      const data = await res.data;
      console.log(data);
      setPatientData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table header */}
          <thead>
            <tr>
              <th className="hidden md:table-cell">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Patient</th>
              <th className="hidden sm:table-cell">Address</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {patientData.map((patient) => (
              <tr key={patient.id}>
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
                          src={patient?.user_photo}
                          alt="Patient Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {patient?.user?.first_name} {patient?.user?.last_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  {patient?.street_address || "Unknown Address"}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {patient?.city || "No City Info"}
                  </span>
                </td>
                <td className="text-center">
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUser;
