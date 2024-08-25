import { useEffect, useState } from "react";
import api from "../../../api";

const Campaign = () => {
  const [vaccines, setVaccines] = useState([]);
  const [error, setError] = useState(null);
  console.log("nice page");
  useEffect(() => {
    console.log("vaccine page");

    // Fetch vaccine list when component mounts
    api.get("/vaccine/campaign/")
      .then((res) => {
        // If using Axios, the response data is in res.data
        console.log(res.data); // Log data for debugging
        setVaccines(res.data); // Store the fetched data in state
      })
      .catch((err) => {
        console.error("Error fetching vaccine list:", err);
        setError(err.message); // Store error message
      });
  }, []); // Empty dependency array to ensure it runs only once on mount

  return (
    <div className="md:max-w-7xl mx-auto my-10">
      <h1 className="text-2xl text-center font-bold mb-8">All Campaing</h1>
      {error && <p>Error: {error}</p>}
      <ul className="flex flex-wrap justify-center gap-4">
        {vaccines.map((vaccine) => (
          <div key={vaccine.id}>
            <div className="w-80 h-72 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 h-12">
                  {vaccine.campaign_name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Campaign location: {vaccine.area}
                </p>

                <p className="text-gray-600 mb-4 h-8">
                  Time: {vaccine.start_time} - {vaccine.end_time}
                </p>
                <p className="text-gray-600 mb-4">For: {vaccine.vaccine_for}</p>
                <p className="text-gray-600 mb-4">
                  For: {vaccine.campaign_for}
                </p>
              </div>
            </div>
          </div> // Adjust based on actual data structure
        ))}
      </ul>
    </div>
  );
};

export default Campaign;
