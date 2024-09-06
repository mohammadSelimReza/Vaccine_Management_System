import { useEffect, useState } from "react";
import api from "../../../../../api";

const DashboardVaccine = () => {
  const [vaccineData, setVaccineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/vaccine/list/");
      const data = await res.data;
      console.log(data);
      setVaccineData(data);
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
              <th>Vaccine Name</th>
              <th className="hidden sm:table-cell">Manufacturer</th>
              <th className="hidden sm:table-cell">Description</th>
              <th>Vaccine For</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table body */}
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
                          src={vaccine?.vaccine_img}
                          alt="Vaccine Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{vaccine?.vaccine_name}</div>
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
                  <button className="btn btn-ghost btn-xs">edit</button>
                  <button className="btn btn-ghost btn-xs text-red-600">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardVaccine;
