import { useEffect, useState } from "react";
import publicApiInstance from "../../../Utils/publicApiInstance";
import { Link } from "react-router";
import authApiInstance from "../../../Utils/authApiInstance";
import Toast from "../../../plugin/useToast";

const DoctorCampaignDasboard = () => {
  const [campaignData, setCampaignData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await publicApiInstance.get("/vaccine/campaign/");
      const data = await res.data;
      console.log(data);
      setCampaignData(data);
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await authApiInstance().delete(`/vaccine/campaign/${id}/`);
      Toast().fire({
        title: "Successfully removed this program",
        icon: "success",
      });
      setCampaignData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      Toast().fire({
        title: `${error}`,
        icon: "error",
      });
    }
  };
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Campaign Report
        </h1>
        <div>
          {campaignData.length === 0 && (
            <p className="text-center text-xl font-bold">
              No campaign is ongoing now
            </p>
          )}
          <Link to="/doctor/dashboard/campaign/add/">
            <button className="btn btn-primary">Create Now</button>
          </Link>
        </div>
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
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="btn btn-ghost btn-xs text-red-600"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorCampaignDasboard;
