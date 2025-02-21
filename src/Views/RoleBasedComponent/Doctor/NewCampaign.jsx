import { useEffect, useState } from "react";
import useUserProfile from "../../../plugin/UserProfile";
import publicApiInstance from "../../../Utils/publicApiInstance";
import authApiInstance from "../../../Utils/authApiInstance";
import Toast from "../../../plugin/useToast";

const CampaignAdd = () => {
  const { doctor, loading, setLoading } = useUserProfile();
  const [formData, setFormData] = useState({
    campaign_name: "",
    slug: "",
    area: "",
    start_time: "",
    end_time: "",
    target_population: "",
    campaign_for: "",
    description: "",
    campaign_vaccine: "",
    added_by: "",
  });
  const [vaccines, setVaccines] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Fetch vaccine data
    publicApiInstance
      .get("/vaccine/list/")
      .then((response) => setVaccines(response.data))
      .catch((error) =>
        console.error("There was an error fetching vaccines!", error)
      );

    // Set districts
    setDistricts([
      "Barguna",
      "Barishal",
      "Bhola",
      "Jhalokathi",
      "Patuakhali",
      "Pirojpur",
      "Bandarban",
      "Brahmanbaria",
      "Chandpur",
      "Chattogram",
      "Cumilla",
      "Coxs_Bazar",
      "Feni",
      "Khagrachari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
      "Dhaka",
      "Faridpur",
      "Gazipur",
      "Gopalganj",
      "Kishoreganj",
      "Madaripur",
      "Manikganj",
      "Munshiganj",
      "Narayanganj",
      "Narsingdi",
      "Rajbari",
      "Shariatpur",
      "Tangail",
      "Bagerhat",
      "Chuadanga",
      "Jashore",
      "Jhenaidah",
      "Khulna",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
      "Satkhira",
      "Jamalpur",
      "Mymensingh",
      "Netrokona",
      "Sherpur",
      "Bogura",
      "Joypurhat",
      "Naogaon",
      "Natore",
      "Chapai_Nawabganj",
      "Pabna",
      "Rajshahi",
      "Sirajganj",
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Rangpur",
      "Thakurgaon",
      "Habiganj",
      "Maulvibazar",
      "Sunamganj",
      "Sylhet",
    ]);
  }, [doctor]);

  useEffect(() => {
    if (doctor) {
      setFormData((prevData) => ({
        ...prevData,
        added_by: doctor?.user?.id,
      }));
    }
  }, [doctor]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "campaign_name" && { slug: generateSlug(value) }),
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "start_time" && new Date(value) < new Date()) {
      alert("Start time cannot be in the past.");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data before submit:", JSON.stringify(formData));
    try {
      await authApiInstance()
        .post("/vaccine/campaign/", formData)
        .then((res) => {
          setFormData({
            campaign_name: "",
            slug: "",
            area: "",
            start_time: "",
            end_time: "",
            target_population: "",
            campaign_for: "",
            description: "",
            campaign_vaccine: "",
            added_by: "",
          });
          Toast().fire({
            title: "Campaign Created",
            icon: "success",
          });
        });
    } catch (error) {
      console.error("There was an error adding the campaign!", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Vaccine Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="campaign_name"
          >
            Campaign Name
          </label>
          <input
            type="text"
            id="campaign_name"
            name="campaign_name"
            value={formData.campaign_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="slug"
          >
            Slug (auto-generated)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="area"
          >
            Area
          </label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Area</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="start_time"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleDateChange}
            min={new Date().toISOString().slice(0, 16)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="end_time"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="target_population"
          >
            Target Population
          </label>
          <input
            type="number"
            id="target_population"
            name="target_population"
            value={formData.target_population}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Campaign For
          </label>
          <select
            name="campaign_for"
            value={formData.campaign_for}
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="campaign_vaccine"
          >
            Vaccine
          </label>
          <select
            id="campaign_vaccine"
            name="campaign_vaccine"
            value={formData.campaign_vaccine}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Vaccine</option>
            {vaccines.map((vaccine) => (
              <option key={vaccine.id} value={vaccine.id}>
                {vaccine.vaccine_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default CampaignAdd;
