import { useEffect, useState } from "react";
import BaseHeader from "../../../PartialComponent/BaseHeader";
import Header from "../../Partials/Header";
import Sidebar from "../../Partials/Sidebar";
import BaseFooter from "../../../PartialComponent/BaseFooter";
import { useNavigate } from "react-router";
import authApiInstance from "../../../../Utils/authApiInstance";

const CampaignReport = () => {
  const [bookedCampaign, setBookCampaign] = useState([]);
  const [providedVaccine, setProvidedVaccine] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const bookedResponse = await authApiInstance().get("/vaccine/book-campaign/");
        setBookCampaign(bookedResponse.data);

        const providedVaccineResponse = await authApiInstance().get("/vaccine/list/");
        setProvidedVaccine(providedVaccineResponse.data);

        const campaignResponse = await authApiInstance().get("/vaccine/campaign/");
        setCampaignData(campaignResponse.data);

        const commentResponse = await authApiInstance().get(`/vaccine/comments/`);
        setCommentData(commentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const getCampaignName = (campaignId) => {
    const campaign = campaignData.find((c) => c.id === campaignId);
    return campaign ? campaign.campaign_name : "N/A";
  };

  const hasReviewed = (patientName) => {
    return commentData.some((comment) => comment.patient_name === patientName);
  };

  const handleNavigate = (patient_name, campaign_name, campaign_id) => {
    navigate("/campaign/comments", {
      state: { patient_name, campaign_name, campaign_id },
    });
  };

  return (
    <>
      <BaseHeader />
      <Header />

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row md:max-w-7xl mx-auto px-4 py-6 gap-6">
  
  {/* Sidebar - Full width on small screens, 1/4 width on large */}
  <div className="w-full md:w-1/4">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="w-full md:w-3/4">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
      
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <span className="w-16 h-16 loading loading-spinner text-warning"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm md:text-base">
                <th className="text-left py-2 px-3 border-b">Patient Name</th>
                <th className="text-left py-2 px-3 border-b">Registered Campaign</th>
                <th className="text-left py-2 px-3 border-b">Campaign's Vaccine</th>
                <th className="text-left py-2 px-3 border-b">Status</th>
              </tr>
            </thead>

            {/* No data found */}
            {bookedCampaign.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No booked campaigns found.
                  </td>
                </tr>
              </tbody>
            )}

            {/* Data Rows */}
            <tbody>
              {bookedCampaign.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 text-sm md:text-base">
                  <td className="py-2 px-3 border-b">{campaign.patient_name}</td>
                  <td className="py-2 px-3 border-b">{getCampaignName(campaign.campaign_name)}</td>
                  <td className="py-2 px-3 border-b">
                    {providedVaccine.find(
                      (vaccine) => vaccine.id === campaign.campaign_name
                    )?.vaccine_name || "N/A"}
                  </td>
                  <td className="py-2 px-3 border-b">
                    {hasReviewed(campaign.patient_name) ? (
                      <span className="text-green-600">Reviewed Before</span>
                    ) : (
                      <button
                        onClick={() =>
                          handleNavigate(
                            campaign.patient_name,
                            getCampaignName(campaign.campaign_name),
                            campaign.campaign_name 
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm py-1 px-2 md:px-3 rounded-lg transition duration-200"
                      >
                        Give Feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</div>


      <BaseFooter />
    </>
  );
};

export default CampaignReport;
