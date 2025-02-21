import { useEffect, useState } from "react";
import useUserProfile from "../../../plugin/UserProfile";
import CountUp from "react-countup";
import authApiInstance from "../../../Utils/authApiInstance";

const DoctorDashboard = () => {
  const { doctor } = useUserProfile();
  const [totalUser, setTotalUser] = useState(0);
  const [totalVaccine, setTotalVaccine] = useState(0);
  const [totalCampaign, setTotalCampaign] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const [userRes, vaccineRes, campaignRes, campaignBookRes] = await Promise.all([
          authApiInstance().get("/user/total-patients/"),
          authApiInstance().get("/vaccine/total-vaccines/"),
          authApiInstance().get("/vaccine/total-campaigns/"),
          authApiInstance().get("/vaccine/total-campaigns-book/")
        ]);
        setTotalUser(userRes.data.total_patients);
        setTotalVaccine(vaccineRes.data.total_vaccine);
        setTotalCampaign(campaignRes.data.total_campaign);
        setTotalTarget(campaignRes.data.target_count);
        setTotalPatients(campaignBookRes.data.total_booked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTotal();
  }, []);
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += totalPatients / 100;
      if (currentProgress >= totalPatients) {
        setProgress(totalPatients);
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [totalPatients]);

  const percentage = (progress / totalTarget) * 100;

  return (
    <div className="pt-20 text-center md:px-40">
      <h1 className="text-xl font-semibold">Welcome, Dr. {doctor?.user.first_name} {doctor?.user.last_name}</h1>
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <div className="stat bg-white shadow-lg p-6 rounded-lg">
          <div className="stat-title">Total Users</div>
          <CountUp start={0} end={totalUser} duration={2} separator="," className="stat-value text-2xl font-bold" />
          <div className="stat-desc">Since July 30</div>
        </div>
        <div className="stat bg-white shadow-lg p-6 rounded-lg">
          <div className="stat-title">Total Vaccines Added</div>
          <CountUp start={0} end={totalVaccine} duration={2} separator="," className="stat-value text-2xl font-bold" />
        </div>
        <div className="stat bg-white shadow-lg p-6 rounded-lg">
          <div className="stat-title">Total Campaigns</div>
          <CountUp start={0} end={totalCampaign} duration={2} separator="," className="stat-value text-2xl font-bold" />
        </div>
      </div>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-xl font-semibold">Total Patients Booked</div>
        <div className="text-3xl font-bold">
          <CountUp start={0} end={totalPatients} duration={2} separator="," /> / {totalTarget}
        </div>
        <div className="text-sm text-gray-500">Since July 31</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
          <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${percentage}%`, transition: "width 0.5s ease-in-out" }}></div>
        </div>
        <div className="mt-2 text-gray-600">{Math.round(percentage)}% of goal achieved</div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
