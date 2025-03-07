import { useEffect, useState } from "react";
import publicApiInstance from "../../../Utils/publicApiInstance";
import authApiInstance from "../../../Utils/authApiInstance";
import BaseHeader from "../../PartialComponent/BaseHeader";
import BaseFooter from "../../PartialComponent/BaseFooter";
import useUserProfile from "../../../plugin/UserProfile";
import Toast from "../../../plugin/useToast";
import { Link, useNavigate } from "react-router";

const Campaign = () => {
  const [campaign, setCampaign] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const { loading, setLoading, doctor, patient } = useUserProfile();

  // Fetch Campaigns
  useEffect(() => {
    publicApiInstance
      .get("/vaccine/campaign/")
      .then((res) => {
        setCampaign(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [setLoading]);

  // Fetch Vaccine Data
  useEffect(() => {
    publicApiInstance
      .get("/vaccine/list/")
      .then((res) => {
        setVaccineData(res.data.results);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // Map Vaccine IDs to Names for Quick Lookup
  const vaccineMap = vaccineData.reduce((acc, vaccine) => {
    acc[vaccine.id] = vaccine.vaccine_name;
    return acc;
  }, {});

  // Update Campaigns with Vaccine Names
  const updatedCampaigns = campaign.map((camp) => ({
    ...camp,
    vaccine_name: vaccineMap[camp.campaign_vaccine] || "Unknown Vaccine",
  }));

  // Handle Booking
  const handleBookNowClick = (vaccine) => {
    setSelectedCampaign(vaccine);
    setPatientName(`${patient?.user?.first_name} ${patient?.user?.last_name}`);
    document.getElementById("my_modal_3").showModal();
  };

  const handleBookingSubmit = async () => {
    if (!patientName || !patientAge || !appointmentDate || !selectedCampaign) {
      Toast().fire({
        title: "Please fill in all fields before submitting.",
        icon: "warning",
      });
      return;
    }

    const bookingData = {
      user: patient?.user?.id,
      patient_name: patientName,
      patient_age: patientAge,
      campaign_name: selectedCampaign.id,
      first_dose_date: appointmentDate,
    };

    try {
      await authApiInstance().post("/vaccine/book-campaign/", bookingData);
      document.getElementById("my_modal_3").close();
      setPatientAge(null);
      setAppointmentDate("");
      Toast().fire({
        title: "Booking Successful!",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
      Toast().fire({
        title: "Error booking vaccine. Please try again.",
        icon: "error",
      });
    }
  };
  const navigate = useNavigate();
  const handleAction =() => {
    navigate("/doctor/dashboard/campaign/report")
  };


  // Format Date for Display
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="relative z-50">
        <BaseHeader />
      </div>

      {/* Main Content - Takes remaining space */}
      <div className="flex-grow">
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
          {
            campaign.length === 0 && (
              <p className="text-center">No campaign has been added yet.</p>
            )
          }
          {!loading && error && <p className="text-center">Error: {error}</p>}
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
                  Hello! {patient?.user?.first_name} {patient?.user?.last_name}
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
                        src={`${vaccine.campaign_img}`}
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
                        {!patient && !doctor &&  (
                           <Link
                           to="/login"
                           className="text-white bg-blue-500 hover:bg-blue-700 w-full px-3 py-3 rounded-md text-sm font-medium"
                            >
                           Login to Check
                          </Link>
                        )}
                        {patient && (
                           <Link
                                        to="/login"
                                        className="text-white bg-blue-500 hover:bg-blue-700 w-full px-3 py-3 rounded-md text-sm font-medium"
                                    >
                                        Login to Book
                                    </Link>
                        )}

                        {doctor && (
                          <div className="flex justify-center items-center">
                            <button
                              className="btn btn-primary mx-4"
                              onClick={() => handleAction(vaccine)}
                            >
                              Edit/Delete
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
      </div>

      {/* Footer at Bottom */}
      <BaseFooter />
    </div>
    </>
  );
};

export default Campaign;
