import React, { useEffect, useState } from "react";
import useAuth from "../../../../../context/useAuth";
import CountUp from "react-countup";
import api from "../../../../../api";
const DoctorHome = () => {
  const { doctorData } = useAuth();
  // Total value you want to animate to
  // const maxPatients = 50000; // Maximum target for the progress bar
  const [progress, setProgress] = useState(0); // Progress bar state
  const [totalUser, setTotalUser] = useState(0);
  const [totalVaccine, setTotalVaccine] = useState(0);
  const [totalCampaign, setTotalCampaign] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  useEffect(() => {
    const animationDuration = 5000; // Duration in ms for the progress bar
    const intervalTime = animationDuration / totalPatients;

    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += totalPatients / 100; // Update the progress incrementally
      if (currentProgress >= totalPatients) {
        setProgress(totalPatients);
        clearInterval(interval); // Stop the animation when done
      } else {
        setProgress(currentProgress);
      }
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [totalPatients]);
  useEffect(() => {
    console.log("working");
    // Fetch the total patient count from the API
    const fetchTotal = async () => {
      try {
        const response = await api.get("/user/total-patients/");
        const res2 = await api.get("/vaccine/total-vaccines/");
        const res3 = await api.get("/vaccine/total-campaigns/");
        const res4 = await api.get("/vaccine/total-campaigns-book/");
        const data = response.data;
        const data2 = res2.data;
        const data3 = res3.data;
        const data4 = res4.data;
        console.log(data); // Total patients data
        console.log(data2); // Total vaccines data
        console.log(data3); // Total campaigns data

        setTotalUser(data.total_patients);
        setTotalVaccine(data2.total_vaccine);
        setTotalCampaign(data3.total_campaign);
        setTotalTarget(data3.target_count);
        setTotalPatients(data4.total_booked);
      } catch (error) {
        console.error("Error fetching total patients:", error);
      }
    };

    fetchTotal();
  }, []);

  const percentage = (progress / totalTarget) * 100;

  return (
    <div>
      <h1>
        Hi welcome doctor,{doctorData?.user.first_name}{" "}
        {doctorData?.user.last_name}
      </h1>
      <div className="md:flex md:flex-col">
        <div className="stats shadow flex flex-col md:flex-row w-full">
          <div className="stat place-items-center">
            <div className="stat-title">Total USERS</div>
            <CountUp
              start={0}
              end={totalUser}
              duration={2}
              separator=","
              className="stat-value"
            />
            {/* <CountUp start={0} end={31000} duration={2} separator="," /> */}
            <div className="stat-desc">From 30th July to Today</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Vaccine Added</div>
            <CountUp
              start={0}
              end={totalVaccine}
              duration={5}
              separator=","
              className="stat-value"
            />
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Campaign Created</div>
            <CountUp
              start={0}
              end={totalCampaign}
              duration={5}
              separator=","
              className="stat-value"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="stat place-items-center p-4 lg:p-8">
          <div className="stat-title text-center text-xs md:text-xl lg:text-2xl">
            Total Patient's Booked on Campaign
          </div>

          {/* Animated number */}
          <div className="stat-value text-2xl md:text-3xl lg:text-4xl font-bold">
            <CountUp start={0} end={totalPatients} duration={1} separator="," />
            /{totalTarget}
          </div>

          <div className="stat-desc text-center text-xs md:text-base lg:text-lg mb-4">
            From 31th July to Today
          </div>

          {/* Progress bar */}
          <div className="w-44 md:w-full bg-gray-200 rounded-full h-3 lg:h-4">
            <div
              className="bg-blue-500 h-3 lg:h-4 rounded-full"
              style={{
                width: `${percentage}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>

          {/* Progress percentage */}
          <div className="text-center mt-2 text-gray-500 text-xs md:text-sm lg:text-base">
            {Math.round(percentage)}% of goal achieved
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
