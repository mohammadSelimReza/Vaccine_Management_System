import { useEffect, useState } from "react";
import useUserProfile from "../../../plugin/UserProfile";
import CountUp from "react-countup";
import authApiInstance from "../../../Utils/authApiInstance";
import publicApiInstance from "../../../Utils/publicApiInstance";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";


const DoctorDashboard = () => {
  const { doctor } = useUserProfile();
  const [totalUser, setTotalUser] = useState(0);
  const [totalVaccine, setTotalVaccine] = useState(0);
  const [totalCampaign, setTotalCampaign] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [progress, setProgress] = useState(0);
  const fetchTotal = async()=>{
    try {
      const vaccineCount = await authApiInstance().get("/vaccine/total-vaccines/");
      const campaignRes = await authApiInstance().get("/vaccine/total-campaigns/");
      const userRes = await authApiInstance().get("/user/users/");
      const bookRes = await authApiInstance().get("/vaccine/total-campaigns-book/");
      console.log(vaccineCount.data.total_vaccine);
      setTotalVaccine(vaccineCount.data.total_vaccine);
      setTotalCampaign(campaignRes.data.total_campaign);
      setTotalTarget(campaignRes.data.target_count);
      setTotalUser(userRes.data.length);
      setTotalPatients(bookRes.data.total_booked);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

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
  console.log(totalVaccine)
  const ageData = [
    { name: "0-18", value: 1 },
    { name: "19-30", value: 4 },
    { name: "31-50", value: 6 },
    { name: "51-65", value: 12 },
    { name: "65+", value: 15 },
  ];

  const insuranceData = [
    { name: "Insured", value: 53.33 },
    { name: "Uninsured", value: (100-53.33) },
  ];
  
  const COLORS = ["#0088FE", "#00C49F"];
  return (
    <div className="pt-4 text-start md:px-40">
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
      <div className="w-full mt-10 p-6 bg-white shadow-lg rounded-lg">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Age of Patients</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Insured vs Uninsured</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={insuranceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {insuranceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
