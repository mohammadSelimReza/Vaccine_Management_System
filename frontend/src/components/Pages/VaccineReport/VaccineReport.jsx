import { useEffect, useState } from "react";
import api from "../../../api";


const VaccineReport = () => {
  const [bookedVaccine, setBookedVaccine] = useState([]);
  const [selectVaccine, setSelectVaccine] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookedResponse = await api.get("/vaccine/book-vaccine/");
        setBookedVaccine(bookedResponse.data);
        const selectResponse = await api.get("/vaccine/list/");
        setSelectVaccine(selectResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  // Function to get vaccine details by ID
  const getVaccineDetails = (vaccineId) => {
    console.log(vaccineId);
    console.log(selectVaccine);
    const vaccine = selectVaccine.find(v => v.id === vaccineId);
    return vaccine ? vaccine.vaccine_name : "Unknown";
  };

  // Function to get dose count by ID
  const getDoseCount = (vaccineId) => {
    const vaccine = selectVaccine.find(v => v.id === vaccineId);
    return vaccine ? vaccine.dose_count : "Unknown";
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Vaccine Name</th>
              <th>Start Date</th>
              <th>Total Dose</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookedVaccine.map((vaccin) => (
              <tr key={vaccin.id}>
                <td>{vaccin.patient_name}</td>
                <td>{vaccin.patient_age}</td>
                <td>{getVaccineDetails(vaccin.vaccine)}</td>
                <td>{vaccin.first_dose_date}</td>
                <td>{getDoseCount(vaccin.vaccine)}</td>
                <td>ongoing</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaccineReport;
