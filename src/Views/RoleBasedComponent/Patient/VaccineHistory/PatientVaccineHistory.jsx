import { useEffect, useState } from "react";
import BaseHeader from "../../../PartialComponent/BaseHeader";
import Header from "../../Partials/Header";
import Sidebar from "../../Partials/Sidebar";
import BaseFooter from "../../../PartialComponent/BaseFooter";
import useUserProfile from "../../../../plugin/UserProfile";
import authApiInstance from "../../../../Utils/authApiInstance";
const VaccineReport = () => {
  const [vaccineList, setVaccineList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState([]);
  const { patient, loading, setLoading } = useUserProfile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data in parallel for efficiency
        const [vaccineRes, bookedRes] = await Promise.all([
          authApiInstance().get("/vaccine/list/"),
          authApiInstance().get("/vaccine/book-vaccine/"),
        ]);

        setVaccineList(vaccineRes.data);
        setBookList(bookedRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // Filter vaccines based on user ID
  useEffect(() => {
    if (bookList.length > 0 && patient?.user?.id) {
      const selected = bookList.filter(
        (item) => item.user === patient.user.id
      );
      setSelectedVaccine(selected);
    }
  }, [vaccineList, patient?.user?.id]);
  // Function to get vaccine details by ID
  const getVaccineDetails = (vaccineId) => {
    const vaccine = vaccineList.find((v) => v.id === vaccineId);
    console.log(vaccine.vaccine_name);
    return vaccine ? vaccine.vaccine_name : "Unknown";
  };

  // Function to get dose count by ID
  const getDoseCount = (vaccineId) => {
    const vaccine = vaccineList.find((v) => v.id === vaccineId);
    return vaccine ? vaccine.dose_count : "Unknown";
  };
  return (
    <>
      <BaseHeader />
      <Header />
      <div className="flex flex-col md:flex-row md:flex-row max-w-screen-xl mx-auto">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex w-3/4">
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
                  {selectedVaccine.map((vaccin) => (
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
        </div>
      </div>

      <BaseFooter />
    </>
  );
};

export default VaccineReport;
