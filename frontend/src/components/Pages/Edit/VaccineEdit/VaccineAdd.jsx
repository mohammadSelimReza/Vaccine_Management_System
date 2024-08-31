import { useEffect, useState } from "react";
import api from "../../../../api";


const VaccineAdd = () => {
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
    added_by: 1, // Assuming the added_by is 1, adjust as needed
  });

  useEffect(() => {
    // Fetch the list of vaccines from the API
    api
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
    // e.preventDefault();
    console.log(formData);
    api
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
          added_by: 1,
        });
      })
      .catch((error) => {
        console.error("There was an error adding the vaccine!", error);
      });
      window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Existing Vaccines</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              ID
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Vaccine Name
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Manufacturer
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Dosage (ml)
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Dose Count
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Dose Gap (days)
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Storage Temp (°C)
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Expiration Date
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Vaccine For
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600">
              Vaccine Type
            </th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine) => (
            <tr key={vaccine.id}>
              <td className="py-2 px-4 border-b">{vaccine.id}</td>
              <td className="py-2 px-4 border-b">{vaccine.vaccine_name}</td>
              <td className="py-2 px-4 border-b">{vaccine.manufacturer}</td>
              <td className="py-2 px-4 border-b">{vaccine.dosage}</td>
              <td className="py-2 px-4 border-b">{vaccine.dose_count}</td>
              <td className="py-2 px-4 border-b">{vaccine.dose_gap_days}</td>
              <td className="py-2 px-4 border-b">
                {vaccine.storage_temperature}
              </td>
              <td className="py-2 px-4 border-b">{vaccine.expiration_date}</td>
              <td className="py-2 px-4 border-b">{vaccine.vaccine_for}</td>
              <td className="py-2 px-4 border-b">{vaccine.vaccine_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-2xl font-bold mb-4">Vaccine List</h1>

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
          <input
            type="text"
            name="vaccine_type"
            value={formData.vaccine_type}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Vaccine
        </button>
      </form>

      
    </div>
  );
};

export default VaccineAdd;
