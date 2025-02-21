import { useEffect, useState } from "react";
import BaseHeader from "../../../PartialComponent/BaseHeader";
import Header from "../../Partials/Header";
import Sidebar from "../../Partials/Sidebar";
import BaseFooter from "../../../PartialComponent/BaseFooter";
import useUserProfile from "../../../../plugin/UserProfile";
import authApiInstance from "../../../../Utils/authApiInstance";
const VaccineReport = () => {
  const [bookedVaccine, setBookedVaccine] = useState([]);
  const [selectVaccine, setSelectVaccine] = useState([]);
  const { patient, loading, setLoading } = useUserProfile();
  console.log(patient);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookedResponse = await authApiInstance().get(
          "/vaccine/book-vaccine/"
        );
        setBookedVaccine(bookedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter vaccines based on user ID
  useEffect(() => {
    if (bookedVaccine.length > 0 && patient?.user?.id) {
      const selected = bookedVaccine.filter(
        (item) => item.user === patient.user.id
      );
      setSelectVaccine(selected);
    }
  }, [bookedVaccine, patient]);

  console.log("bookedVaccine:", bookedVaccine);
  console.log("selectVaccine:", selectVaccine);

  // Function to get vaccine details by ID
  const getVaccineDetails = (vaccineId) => {
    console.log("Vaccine ID:", vaccineId);
    console.log("Selected Vaccines:", selectVaccine);
    const vaccine = selectVaccine.find((v) => v.id === vaccineId);
    console.log(vaccine);
    return vaccine ? vaccine.vaccine_name : "Unknown";
  };

  // Function to get dose count by ID
  const getDoseCount = (vaccineId) => {
    const vaccine = selectVaccine.find((v) => v.id === vaccineId);
    return vaccine ? vaccine.dose_count : "Unknown";
  };
  console.log("mew ew",selectVaccine);
  return (
    <>
      <BaseHeader />
      <Header />
      <div className="flex max-w-screen-xl mx-auto">
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
                  {selectVaccine.map((vaccin) => (
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
