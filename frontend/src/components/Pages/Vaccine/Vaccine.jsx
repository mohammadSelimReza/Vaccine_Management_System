import { useEffect, useState } from "react";
import api from "../../../api";
import useAuth from "../../../context/useAuth";
import toast from "react-hot-toast";


const Vaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [error, setError] = useState(null);
  const { user, patientData, doctorData } = useAuth();
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [patientName, setPatientName] = useState(
    `${user?.first_name} ${user?.last_name}`
  );
  const [patientAge, setPatientAge] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [remainingDates, setRemainingDates] = useState([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    vaccine_name: "",
    slug: "",
    manufacturer: "",
    dosage: "",
    dose_count: "",
    dose_gap_days: "",
    storage_temperature: "",
    expiration_date: "",
    description: "",
    vaccine_for: "",
    vaccine_type: "",
    added_by: 1,
  });

  useEffect(() => {
    // Fetch the list of vaccines from the API
    api
      .get("/vaccine/list/")
      .then((response) => {
        setVaccines(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the vaccine data!", error);
        setLoading(false);
      });
  }, []);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vaccine_name") {
      setFormData({
        ...formData,
        [name]: value,
        slug: generateSlug(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(`/vaccine/list/${selectedVaccine.id}/`, formData)
      .then((response) => {
        // Refresh the vaccine list after editing the vaccine
        setVaccines(
          vaccines.map((vaccine) =>
            vaccine.id === response.data.id ? response.data : vaccine
          )
        );
        // Clear the form
        setFormData({
          vaccine_name: "",
          slug: "",
          manufacturer: "",
          dosage: "",
          dose_count: "",
          dose_gap_days: "",
          storage_temperature: "",
          expiration_date: "",
          description: "",
          vaccine_for: "",
          vaccine_type: "",
          added_by: 1,
        });
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("There was an error editing the vaccine!", error);
      });
  };
  const handleDelete = (vaccine) => {
    tryDelete(vaccine);
  };

  const tryDelete = (vaccine) => {
    if (vaccine) {
      api
        .delete(`/vaccine/list/${vaccine.id}/`)
        .then((response) => {
          // Remove the deleted vaccine from the list
          setVaccines(vaccines.filter((v) => v.id !== vaccine.id));
          alert("Vaccine deleted successfully!");
        })
        .catch((error) => {
          console.error("There was an error deleting the vaccine!", error);
          alert("Error deleting vaccine. Please try again.");
        });
    } else {
      console.log("Vaccine Not selected!");
    }
  };

  useEffect(() => {
    if (appointmentDate && selectedVaccine) {
      const dates = calculateRemainingDates(
        appointmentDate,
        selectedVaccine.dose_gap_days,
        selectedVaccine.dose_count
      );
      setRemainingDates(dates);
    }
  }, [appointmentDate, selectedVaccine]);

  const calculateRemainingDates = (startDate, doseGapDays, doseCount) => {
    if (!startDate || doseCount <= 0 || doseGapDays <= 0) return [];

    const remainingDates = [];
    const start = new Date(startDate);

    if (isNaN(start.getTime())) {
      console.error("Invalid startDate provided:", startDate);
      return [];
    }

    for (let i = 1; i < doseCount; i++) {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + doseGapDays * i);
      remainingDates.push(nextDate.toISOString().split("T")[0]);
    }

    return remainingDates;
  };

  const handleBookNowClick = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsBookingModalOpen(true);
  };

  const handleEditClick = (vaccine) => {
    setSelectedVaccine(vaccine);
    setFormData({
      vaccine_name: vaccine.vaccine_name,
      slug: vaccine.slug,
      manufacturer: vaccine.manufacturer,
      dosage: vaccine.dosage,
      dose_count: vaccine.dose_count,
      dose_gap_days: vaccine.dose_gap_days,
      storage_temperature: vaccine.storage_temperature,
      expiration_date: vaccine.expiration_date,
      description: vaccine.description,
      vaccine_for: vaccine.vaccine_for,
      vaccine_type: vaccine.vaccine_type,
      added_by: vaccine.added_by,
    });
    setIsEditModalOpen(true);
  };

  const handleBookingSubmit = () => {
    if (!patientName || !patientAge || !appointmentDate || !selectedVaccine) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const bookingData = {
      patient_name: patientName,
      patient_age: patientAge,
      vaccine: selectedVaccine.id,
      first_dose_date: appointmentDate,
    };

    api
      .post("/vaccine/book-vaccine/", bookingData)
      .then((res) => {
        // alert("Vaccine booked successfully!");
        toast.success("Vaccine booking successfully!");
        setIsBookingModalOpen(false);
        // Reset form fields
        setPatientAge("");
        setAppointmentDate("");
        setRemainingDates([]);
      })
      .catch((err) => {
        // alert("Error booking vaccine. Please try again.");
        toast.error("Error booking vaccine. Please try again.");
        setIsBookingModalOpen(false);
      });
  };
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/dofqxmuya/';
  const imageUrl = patientData?.user_photo ? `${cloudinaryBaseUrl}${patientData.user_photo}` : "Null";

  return (
    <div className="md:max-w-7xl mx-auto my-10">
      <h1 className="text-2xl text-center font-bold mb-8">
        Vaccine We Provided
      </h1>
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-10">
          <span className="loading loading-spinner text-info"></span>
        </div>
      )}
      {!loading && error && <p>Error: {error}</p>}
      {!loading && (
        <ul className="flex flex-wrap justify-center gap-4">
          {vaccines.map((vaccine) => (
            <div key={vaccine.id}>
              <div className="card bg-base-100 w-96 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={`https://res.cloudinary.com/dofqxmuya/${vaccine.vaccine_img}`}
                    alt="vaccine_img"
                    className="rounded-xl h-52"
                    style={{ width: "304px" }}
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title font-bold">
                    {vaccine.vaccine_name}{" "}
                  </h2>
                  <p className="text-gray-600 font-semibold">
                    Manufacturer: {vaccine.manufacturer}
                  </p>
                  <p className="h-10 mb-4">{vaccine.description} </p>
                  <div className="card-actions">
                    {patientData ? (
                      <button
                        onClick={() => handleBookNowClick(vaccine)}
                        className="btn btn-primary"
                      >
                        Book Now
                      </button>
                    ) : null}
                    {doctorData ? (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEditClick(vaccine)}
                          className="text-white bg-blue-500 hover:bg-blue-700 w-20 py-3 rounded-md text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(vaccine)}
                          className="text-white bg-red-500 hover:bg-blue-700 w-20 py-3 rounded-md text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBookingSubmit();
                e.target.reset();
                setIsBookingModalOpen(false);
                setRemainingDates([]); // Clear remaining dates
                setAppointmentDate("");
                setPatientName("");
                setPatientAge("");
              }}
            >
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setIsBookingModalOpen(false);
                  setRemainingDates([]); // Clear remaining dates
                  setAppointmentDate("");
                  setPatientName("");
                  setPatientAge("");
                }}
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
                <div className="label">
                  <span className="label-text">Patient Name:</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Patient Age:</span>
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPatientAge(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Appointment Date:</span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </label>
              <p className="font-medium text-sm pl-2 mt-4">
                Total Dose: {selectedVaccine.dose_count}{" "}
              </p>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Remaining Dose Dates: </span>
                </label>
                <ul className="pl-20">
                  {selectedVaccine.dose_count > 1 ? (
                    <div>
                      {remainingDates.map((date, index) => (
                        <li key={index}>
                          {" "}
                          {index + 2}st dose: {date}
                        </li>
                      ))}
                    </div>
                  ) : (
                    <p>Only one dose</p>
                  )}
                </ul>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn">
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsEditModalOpen(false)}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg">Edit Vaccine Details</h3>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Vaccine Name:</span>
                </div>
                <input
                  type="text"
                  name="vaccine_name"
                  value={formData.vaccine_name}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Slug:</span>
                </div>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Manufacturer:</span>
                </div>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Dosage:</span>
                </div>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Dose Count:</span>
                </div>
                <input
                  type="number"
                  name="dose_count"
                  value={formData.dose_count}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Dose Gap Days:</span>
                </div>
                <input
                  type="number"
                  name="dose_gap_days"
                  value={formData.dose_gap_days}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Storage Temperature:</span>
                </div>
                <input
                  type="number"
                  name="storage_temperature"
                  value={formData.storage_temperature}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Expiration Date:</span>
                </div>
                <input
                  type="date"
                  name="expiration_date"
                  value={formData.expiration_date}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Description:</span>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Vaccine For:</span>
                </div>
                <input
                  type="text"
                  name="vaccine_for"
                  value={formData.vaccine_for}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Vaccine Type:</span>
                </div>
                <input
                  type="text"
                  name="vaccine_type"
                  value={formData.vaccine_type}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
              <div className="modal-action">
                <button type="submit" className="btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Vaccine;
