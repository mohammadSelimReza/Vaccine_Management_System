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
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 py-6">
        <div className="lg:w-1/4 w-full mb-4 lg:mb-0">
          <Sidebar />
        </div>
        <div className="lg:w-3/4 w-full">
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto p-4">
            {loading ? (
              <div className="flex justify-center items-center">
                <span className="w-16 h-16 loading loading-spinner text-warning"></span>
              </div>
            ) : (
              <>
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-2 px-4 border-b">Patient Name</th>
                      <th className="text-left py-2 px-4 border-b">Registered Campaign</th>
                      <th className="text-left py-2 px-4 border-b">Campaign's Vaccine</th>
                      <th className="text-left py-2 px-4 border-b">Status</th>
                    </tr>
                  </thead>

                  {bookedCampaign.length === 0 && (
                    <tbody>
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No booked campaigns found.
                        </td>
                      </tr>
                    </tbody>
                  )}
                  <tbody>
                    {bookedCampaign.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{campaign.patient_name}</td>
                        <td className="py-2 px-4 border-b">{getCampaignName(campaign.campaign_name)}</td>
                        <td className="py-2 px-4 border-b">
                          {providedVaccine.find(
                            (vaccine) => vaccine.id === campaign.campaign_name
                          )?.vaccine_name || "N/A"}
                        </td>
                        <td className="py-2 px-4 border-b">
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
                              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg transition duration-200"
                            >
                              Give Feedback
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
      <BaseFooter />
    </>
  );
};

export default CampaignReport;
