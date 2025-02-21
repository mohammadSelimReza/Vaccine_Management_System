import { useEffect, useState } from "react";
import authApiInstance from "../../../Utils/authApiInstance";
import useUserProfile from "../../../plugin/UserProfile";
import Toast from "../../../plugin/useToast";
import { useParams } from "react-router";

const EditVaccine = () => {
  const { doctor } = useUserProfile();
  const doctor_id = doctor?.user?.id;
  const [vaccines, setVaccines] = useState([]);
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
    added_by: "",
  });
  const [processing, setProcessing] = useState(false);
  const param = useParams();

  useEffect(() => {
    authApiInstance()
      .get(`/vaccine/edit/${param?.id}`)
      .then((response) => {
        setVaccines(response.data);
        const vaccineData = response.data;
        setFormData({
          vaccine_name: vaccineData?.vaccine_name,
          manufacturer: vaccineData?.manufacturer,
          dosage: vaccineData?.dosage,
          dose_count: vaccineData?.dose_count,
          dose_gap_days: vaccineData?.dose_gap_days,
          storage_temperature: vaccineData?.storage_temperature,
          expiration_date: vaccineData?.expiration_date,
          description: vaccineData?.description,
          vaccine_for: vaccineData?.vaccine_for,
          vaccine_type: vaccineData?.vaccine_type,
          added_by: vaccineData?.added_by,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the vaccine data!", error);
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
        added_by: doctor_id,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        added_by: doctor_id,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    authApiInstance()
      .patch(`/vaccine/edit/${param?.id}/`, formData)
      .then((response) => {
        // Refresh the vaccine list after adding a new vaccine
        setVaccines([...vaccines, response.data]);
        // Clear the form
        setFormData({
          vaccine_name: formData?.vaccine_name,
          manufacturer: formData?.manufacturer,
          dosage: formData?.dosage,
          dose_count: formData?.dose_count,
          dose_gap_days: formData?.dose_gap_days,
          storage_temperature: formData?.storage_temperature,
          expiration_date: formData?.expiration_date,
          description: formData?.description,
          vaccine_for: formData?.vaccine_for,
          vaccine_type: formData?.vaccine_type,
          added_by: formData?.added_by,
        });
        Toast().fire({
          title: "Succesfully updated",
          icon: "success",
        });
        setProcessing(false);
      })
      .catch((error) => {
        console.error("There was an error adding the vaccine!", error);
        setProcessing(false);
      });
  };

  return (
    <div className="container max-w-xs md:max-w-screen-sm mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-xl font-semibold mb-4">Add a New Vaccine</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vaccine Name:
          </label>
          <input
            type="text"
            name="vaccine_name"
            value={formData.vaccine_name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 hidden">
            Slug:
          </label>
          <input type="hidden" name="slug" value={formData.slug} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Manufacturer:
          </label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dosage (ml):
          </label>
          <input
            type="number"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dose Count:
          </label>
          <input
            type="number"
            name="dose_count"
            value={formData.dose_count}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dose Gap (days):
          </label>
          <input
            type="number"
            name="dose_gap_days"
            value={formData.dose_gap_days}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Storage Temperature (°C):
          </label>
          <input
            type="number"
            name="storage_temperature"
            value={formData.storage_temperature}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Expiration Date:
          </label>
          <input
            type="date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vaccine For:
          </label>
          <select
            name="vaccine_for"
            value={formData.vaccine_for}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select</option>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vaccine Type:
          </label>
          <select
            name="vaccine_type"
            value={formData.vaccine_type}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Vaccine Type</option>
            <option value="inactivated">Inactivated Vaccine</option>
            <option value="live_attenuated">Live Attenuated Vaccine</option>
            <option value="subunit">Subunit Vaccine</option>
            <option value="mRNA">mRNA Vaccine</option>
            <option value="viral_vector">Viral Vector Vaccine</option>
            <option value="toxoid">Toxoid Vaccine</option>
            <option value="hepatitis_b">Hepatitis B</option>
            <option value="recombinant">Recombinant</option>
            <option value="inactivated_toxin">Inactivated Toxin</option>
            <option value="polio_vaccine">Polio Vaccine</option>
          </select>
        </div>
        <div className="flex justify-center">
          {processing ? (
            <>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={true}
              >
                editing.....
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit Vaccine
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditVaccine;
