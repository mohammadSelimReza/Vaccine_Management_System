import { useEffect, useState } from "react";
import publicApiInstance from "../../../Utils/publicApiInstance";
import authApiInstance from "../../../Utils/authApiInstance";
import useUserProfile from "../../../plugin/UserProfile";
import Toast from "../../../plugin/useToast";

const VaccineAdd = () => {
  const { doctor } = useUserProfile();
  console.log(doctor);
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
  useEffect(() => {
    publicApiInstance
      .get("/vaccine/list/")
      .then((response) => {
        setVaccines(response.data);
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
    console.log(doctor_id);
    console.log(JSON.stringify(formData));
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
    console.log(JSON.stringify(formData));
    authApiInstance()
      .post("/vaccine/list/", formData)
      .then((response) => {
        // Refresh the vaccine list after adding a new vaccine
        setVaccines([...vaccines, response.data]);
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
          added_by: "",
        });
        Toast().fire({
            title:"Succesfully added",
            icon:"success",
        })
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
                adding.....
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Vaccine
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default VaccineAdd;
