import { useEffect, useState } from "react";
import BaseFooter from "../../PartialComponent/BaseFooter";
import BaseHeader from "../../PartialComponent/BaseHeader";
import publicApiInstance from "../../../Utils/publicApiInstance";
import { Link, useParams } from "react-router";
import useUserProfile from "../../../plugin/UserProfile";
import authApiInstance from "../../../Utils/authApiInstance";
import Toast from "../../../plugin/useToast";

const VaccineDetail = () => {
  const { setLoading, loading, doctor, patient } = useUserProfile();
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [patientAge, setPatientAge] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [remainingDates, setRemainingDates] = useState([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
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
  const [vaccine, setVaccine] = useState([]);
  const param = useParams();
  console.log(param.id);
  const fetchVaccineData = async () => {
    try {
      const res = await publicApiInstance.get(`/vaccine/details/${param.id}/`);
      console.log(res.data);
      setVaccine(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVaccineData();
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
    setLoading(true);
    e.preventDefault();

    authApiInstance()
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
    setLoading(false);
  };
  const handleDelete = (vaccine) => {
    loading(true);
    tryDelete(vaccine);
    setLoading(false);
  };

  const tryDelete = (vaccine) => {
    if (vaccine) {
      authApiInstance()
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
    setLoading(true);
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
    setLoading(true);
  };

  const handleBookingSubmit = () => {
    if (!patientName || !patientAge || !appointmentDate || !selectedVaccine) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setLoading(true);
    const bookingData = {
      user: patient?.user?.id,
      patient_name: patientName,
      patient_age: patientAge,
      vaccine: selectedVaccine.id,
      first_dose_date: appointmentDate,
    };
    console.log(JSON.stringify(bookingData));
    authApiInstance()
      .post("/vaccine/book-vaccine/", bookingData)
      .then((res) => {
        Toast().fire({
          title: "Vaccine booking successfully!",
          icon: "success",
        });
        setIsBookingModalOpen(false);
        setPatientAge("");
        setAppointmentDate("");
        setRemainingDates([]);
        setLoading(false);
      })
      .catch((err) => {
        Toast().fire({
          title: `${err.error}`,
          icon: "error",
        });
        setIsBookingModalOpen(false);
      });
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="relative z-50">
        <BaseHeader />
      </div>

      {/* Main Content - Takes remaining space */}
      <div className="flex-grow py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center md:items-start">
            <div>
              <img
                src={vaccine?.vaccine_img}
                className="rounded object-contain w-full md:w-[600px] max-h-80"
                alt="Vaccine Image"
              />
              <div className="card-actions flex justify-center items-center py-10">
                {doctor || patient ? (
                  <>
                    {patient?.user_type === "patient" && (
                      <button
                        onClick={() => handleBookNowClick(vaccine)}
                        className="btn btn-primary"
                      >
                        Book Now
                      </button>
                    )}
                    {doctor?.user_type === "doctor" && (
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
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-white bg-blue-500 hover:bg-blue-700 w-full px-3 py-3 rounded-md text-sm font-medium"
                  >
                    Login to Book
                  </Link>
                )}
              </div>
            </div>
            
            <div>{/* Details Section */}</div>
          </div>
          <div className="mt-8">
          <div className="overflow-x-auto mb-10">
              <h2 className="text-center md:text-start text-3xl font-bold md:mb-10">
                {" "}
                {vaccine?.vaccine_name}{" "}
              </h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Field
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Manufacturer
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vaccine?.manufacturer}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Vaccine For
                    </td>
                    <td className="border border-gray-300 px-4 py-2 uppercase ">
                      {vaccine?.vaccine_for}
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Per Dose
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vaccine?.dosage} ml
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Total Dose
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vaccine?.dose_count}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Next Dose Gap
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vaccine?.dose_gap_days} days
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Storage Temperature
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vaccine?.storage_temperature}°C
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Expiration Date
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vaccine?.expiration_date}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-lg font-bold">Vaccine Description:</h3>
            <p className="text-gray-900">{vaccine?.description}</p>
          </div>
        </div>
      </div>
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
                Hello! {patient?.user?.first_name} {patient?.user?.last_name}
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
      {/* Footer at Bottom */}
      <BaseFooter />
    </div>
  );
};

export default VaccineDetail;
