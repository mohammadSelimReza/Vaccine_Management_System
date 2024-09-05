import { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

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
        const bookedResponse = await api.get("/vaccine/book-campaign/");
        setBookCampaign(bookedResponse.data);
        console.log("BookedRes:", bookedResponse.data);

        const providedVaccineResponse = await api.get("/vaccine/list/");
        setProvidedVaccine(providedVaccineResponse.data);
        console.log("ProvidedVaccineResponse:", providedVaccineResponse.data);

        const campaignResponse = await api.get("/vaccine/campaign/");
        setCampaignData(campaignResponse.data);
        console.log("CampaignData:", campaignResponse.data);

        const commentResponse = await api.get(`/vaccine/comments/`);
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
    <div className="max-w-screen-lg mx-auto h-screen">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="w-28 h-28 loading loading-spinner text-warning"></span>
          </div>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Registered Campaign</th>
                  <th>Campaign's Vaccine</th>
                  <th>Status</th>
                </tr>
              </thead>

              {bookedCampaign.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No booked campaigns found.
                  </td>
                </tr>
              )}
              <tbody>
                {bookedCampaign.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>{campaign.patient_name}</td>
                    <td>{getCampaignName(campaign.campaign_name)}</td>
                    <td>
                      {providedVaccine.find(
                        (vaccine) => vaccine.id === campaign.campaign_name
                      )?.vaccine_name || "N/A"}
                    </td>
                    <td>
                      {hasReviewed(campaign.patient_name) ? (
                        <p>Reviewed Before</p>
                      ) : (
                        <button
                          onClick={() =>
                            handleNavigate(
                              campaign.patient_name,
                              getCampaignName(campaign.campaign_name),
                              campaign.campaign_name // Assuming this is the campaign ID
                            )
                          }
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg"
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
  );
};

export default CampaignReport;
