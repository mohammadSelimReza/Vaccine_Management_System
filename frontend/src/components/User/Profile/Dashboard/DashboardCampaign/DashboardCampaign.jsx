import { useEffect, useState } from "react";
import api from "../../../../../api";

const DashboardCampaign = () => {
  const [campaignData, setCampaignData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/vaccine/campaign/");
      const data = await res.data;
      console.log(data);
      setCampaignData(data);
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
              <th>Campaign Name</th>
              <th className="hidden sm:table-cell">Area</th>
              <th>Start Time</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {campaignData.map((campaign) => (
              <tr key={campaign.id}>
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
                          src={campaign?.campaign_img}
                          alt="Campaign Image"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{campaign?.campaign_name}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  {campaign?.area || "Unknown Area"}
                </td>
                <td>
                  {new Date(campaign?.start_time).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
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

export default DashboardCampaign;
