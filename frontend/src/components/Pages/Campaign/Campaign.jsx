import { useEffect, useState } from "react";
import api from "../../../api";
import useAuth from "../../../context/useAuth";
import toast from "react-hot-toast";

const Campaign = () => {
  const [campaign, setCampaign] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);
  const [error, setError] = useState(null);
  const { user, patientData, doctorData } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [addedDoc, setAddedDoc] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    api
      .get("/vaccine/campaign/")
      .then((res) => {
        setCampaign(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api
      .get("/vaccine/list/")
      .then((res) => {
        setVaccineData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  const fetchDoctorData = async (doctorId) => {
    try {
      const response = await api.get(`/user/doctors/${doctorId}`);
      setAddedDoc(response.data);
      return response.data;
    } catch (err) {
      toast.error("Failed to fetch doctor data");
      setError(err.message);
      return null;
    }
  };

  // Map vaccine IDs to names for quick lookup
  const vaccineMap = vaccineData.reduce((acc, vaccine) => {
    acc[vaccine.id] = vaccine.vaccine_name;
    return acc;
  }, {});

  // Update campaigns with vaccine names
  const updatedCampaigns = campaign.map((camp) => ({
    ...camp,
    vaccine_name: vaccineMap[camp.campaign_vaccine] || "Unknown Vaccine",
  }));

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
      user:user.id,
      patient_name: patientName,
      patient_age: patientAge,
      campaign_name: selectedCampaign.id,
      first_dose_date: appointmentDate,
    };
    console.log(JSON.stringify(bookingData));
    api
      .post("/vaccine/book-campaign/", bookingData)
      .then((res) => {
        toast.success("Campaign booked successfully!");
        document.getElementById("my_modal_3").close();
        setPatientAge(null);
        setAppointmentDate("");
      })
      .catch((err) => {
        alert("Error booking vaccine. Please try again.");
      });
  };

  const handleEdit = async (campaign) => {
    const doctor = await fetchDoctorData(campaign.added_by); // Wait for the doctor data to be fetched
  
    if (doctor?.user?.id !== user?.id) { // Ensure authorization check happens after data is fetched
      setAuthorized(false);
      toast.error("You are not authorized to edit this campaign.");
      return;
    } else {
      // Format start_time and end_time for input type="datetime-local"
      const formattedCampaign = {
        ...campaign,
        start_time: campaign.start_time.substring(0, 16), // "YYYY-MM-DDTHH:mm"
        end_time: campaign.end_time.substring(0, 16), // "YYYY-MM-DDTHH:mm"
      };
      setSelectedCampaign(formattedCampaign);
      document.getElementById("edit_modal").showModal();
    }
  };
  

  const handleUpdateSubmit = () => {
    api
      .put(`/vaccine/campaign/${selectedCampaign.id}/`, selectedCampaign)
      .then((res) => {
        alert("Campaign updated successfully!");
        document.getElementById("edit_modal").close();
        setCampaign(
          campaign.map((c) => (c.id === selectedCampaign.id ? res.data : c))
        );
      })
      .catch((err) => {
        alert("Error updating campaign. Please try again.");
      });
  };

  const handleDelete = async(campaign) => {
    const doctor = await fetchDoctorData(campaign.added_by); // Wait for the doctor data to be fetched
  
    if (doctor?.user?.id !== user?.id) { 
      setAuthorized(false);
      toast.error("You are not authorized to delete this campaign.");
      return;
    }
    else{
      tryDelete(campaign);
    }
    
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
          alert("Error deleting campaign. Please try again.");
          window.location.reload();
        });
    } else {
      alert("Campaign not selected!");
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  console.log(selectedCampaign);
  return (
    <div>
      <div className="md:max-w-7xl mx-auto my-10">
        <h1 className="text-2xl text-center font-bold mb-8">
          Our Campaign List
        </h1>
        {loading && (
          <div className="flex justify-center my-10">
            <span className="loading loading-spinner text-info"></span>
          </div>
        )}
        {!loading && error && <p>Error: {error}</p>}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBookingSubmit();
              }}
            >
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">
                Hello! {user?.first_name} {user?.last_name}
              </h3>
              <h6 className="font-semibold">
                Fill up this form to book an appointment.
              </h6>
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Patient Name:</span>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Patient Age:</span>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Appointment Date:</span>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  min={
                    selectedCampaign
                      ? new Date(selectedCampaign.start_time)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  max={
                    selectedCampaign
                      ? new Date(selectedCampaign.end_time)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Submit
              </button>
            </form>
          </div>
        </dialog>

        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSubmit();
              }}
            >
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("edit_modal").close()}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Edit Campaign</h3>

              {/* Campaign Name */}
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Campaign Name:</span>
                <input
                  type="text"
                  name="campaign_name"
                  value={selectedCampaign?.campaign_name || ""}
                  onChange={(e) =>
                    setSelectedCampaign((prev) => ({
                      ...prev,
                      campaign_name: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>

              {/* Area */}
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Area:</span>
                <input
                  type="text"
                  name="area"
                  value={selectedCampaign?.area || ""}
                  onChange={(e) =>
                    setSelectedCampaign((prev) => ({
                      ...prev,
                      area: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>

              {/* Start Time */}
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Start Time:</span>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={selectedCampaign?.start_time || ""}
                  onChange={(e) =>
                    setSelectedCampaign((prev) => ({
                      ...prev,
                      start_time: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>

              {/* End Time */}
              <label className="form-control w-full max-w-xs">
                <span className="label-text">End Time:</span>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={selectedCampaign?.end_time || ""}
                  onChange={(e) =>
                    setSelectedCampaign((prev) => ({
                      ...prev,
                      end_time: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>

              {/* Target Population */}
              <label className="form-control w-full max-w-xs">
                <span className="label-text">Target Population:</span>
                <input
                  type="number"
                  name="target_population"
                  value={selectedCampaign?.target_population || ""}
                  onChange={(e) =>
                    setSelectedCampaign((prev) => ({
                      ...prev,
                      target_population: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </label>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full mt-4">
                Update
              </button>
            </form>
          </div>
        </dialog>

        {!loading && (
          <ul className="flex flex-wrap justify-center gap-4">
            {updatedCampaigns.map((vaccine) => (
              <div key={vaccine.id}>
                <div className="card bg-base-100 w-96 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img
                      src={`https://res.cloudinary.com/dofqxmuya/${vaccine.campaign_img}`}
                      alt="vaccine_img"
                      className="rounded-xl h-52"
                      style={{ width: "304px" }}
                    />
                  </figure>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 h-12">
                      {vaccine.campaign_name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Vaccine: {vaccine.vaccine_name}
                    </p>
                    <p className="text-gray-600 mb-4 h-8">
                      Starting Date: {formatDate(vaccine.start_time)}
                    </p>
                    <p className="text-gray-600 mb-4">
                      For: {vaccine.campaign_for}
                    </p>
                    <p className="text-gray-600 mb-4">Area: {vaccine.area}</p>
                    <p className="text-gray-600 mb-4">
                      Target Population: {vaccine.target_population}
                    </p>
                    <div className="card-actions">
                      {patientData && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleBookNowClick(vaccine)}
                        >
                          Book Now
                        </button>
                      )}

                      {doctorData && (
                        <div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleEdit(vaccine)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-error"
                            onClick={() => handleDelete(vaccine)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Campaign;
