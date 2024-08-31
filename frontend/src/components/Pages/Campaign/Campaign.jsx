import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import api from "../../../api";

const Campaign = () => {
  const [campaign, setCampaign] = useState([]);
  const [error, setError] = useState(null);
  const { user, patientData, doctorData } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");

  useEffect(() => {
    api
      .get("/vaccine/campaign/")
      .then((res) => {
        setCampaign(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleBookNowClick = (vaccine) => {
    setSelectedCampaign(vaccine);
    setPatientName(`${user?.first_name} ${user?.last_name}`);
    document.getElementById("my_modal_3").showModal();
  };

  const handleBookingSubmit = () => {
    if (!patientName || !patientAge || !appointmentDate || !selectedCampaign) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const bookingData = {
      patient_name: patientName,
      patient_age: patientAge,
      campaign_name: selectedCampaign.id, // Corrected field name
      first_dose_date: appointmentDate,
    };

    api
      .post("/vaccine/book-campaign/", bookingData)
      .then((res) => {
        alert("Vaccine booked successfully!");
        document.getElementById("my_modal_3").close();
        setPatientAge(null);
        setAppointmentDate("");
      })
      .catch((err) => {
        alert("Error booking vaccine. Please try again.");
      });
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    document.getElementById("edit_modal").showModal();
  };

  const handleUpdateSubmit = () => {
    api
      .put(`/vaccine/campaign/${selectedCampaign.id}/`, selectedCampaign)
      .then((res) => {
        alert("Campaign updated successfully!");
        document.getElementById("edit_modal").close();
        setCampaign(campaign.map(c => c.id === selectedCampaign.id ? res.data : c));
      })
      .catch((err) => {
        alert("Error updating campaign. Please try again.");
      });
  };

  const handleDelete = (campaign) => {
    tryDelete(campaign);
  };

  const tryDelete = (campaign) => {
    if (campaign) {
      api
        .delete(`/vaccine/campaign/${campaign.id}/`)
        .then((response) => {
          setCampaign(campaign.filter((v) => v.id !== campaign.id));
          alert("Campaign deleted successfully!");
        })
        .catch((error) => {
          window.location.reload();
        });
    } else {
      alert("Campaign not selected!");
    }
  };

  return (
    <div>
      <div className="md:max-w-7xl mx-auto my-10">
        <h1 className="text-2xl text-center font-bold mb-8">Campaign List</h1>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Hello! {user?.first_name} {user?.last_name}</h3>
              <h6 className="font-semibold">Fill up this form to book an appointment.</h6>
              {/* Booking Form Fields */}
              {/* ... */}
              <button type="submit" className="btn btn-primary w-full mt-4">Submit</button>
            </form>
          </div>
        </dialog>

        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateSubmit(); }}>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("edit_modal").close()}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Edit Campaign</h3>
              {/* Editing Form Fields */}
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Campaign Name:</span>
                <input
                  type="text"
                  name="campaign_name"
                  value={selectedCampaign?.campaign_name || ""}
                  onChange={(e) => setSelectedCampaign(prev => ({ ...prev, campaign_name: e.target.value }))}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>
              {/* Other form fields... */}
              <button type="submit" className="btn btn-primary w-full mt-4">Update</button>
            </form>
          </div>
        </dialog>

        {error && <p>Error: {error}</p>}

        <ul className="flex flex-wrap justify-center gap-4">
          {campaign.map((vaccine) => (
            <div key={vaccine.id}>
              <div className="w-80 h-72 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 h-12">{vaccine.campaign_name}</h2>
                  <p className="text-gray-600 mb-4">Vaccine: {vaccine.campaign_vaccine}</p>
                  <p className="text-gray-600 mb-4 h-8">Starting Date: {vaccine.start_time}</p>
                  <p className="text-gray-600 mb-4">For: {vaccine.campaign_for}</p>
                  {patientData && (
                    <button
                      onClick={() => handleBookNowClick(vaccine)}
                      className="btn btn-primary"
                    >
                      Book Now
                    </button>
                  )}
                  {doctorData && (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleEdit(vaccine)}
                        className="btn btn-secondary mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vaccine)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Campaign;
