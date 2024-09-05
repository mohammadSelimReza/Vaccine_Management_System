import { useEffect, useState } from "react";

import api from "../../../api";
import useAuth from "../../../context/useAuth";


const CampaignAdd = () => {
  const { user } = useAuth(); 
  const [doctorId,setDoctorId] = useState(null);
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
    added_by: doctorId || "",
  });
  const [vaccines, setVaccines] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDatabase,setDoctorDatabase] = useState([]);
  

  useEffect(() => {
    // Fetch vaccine data
    api.get("/vaccine/list/")
      .then((response) => setVaccines(response.data))
      .catch((error) => console.error("There was an error fetching vaccines!", error));

    // Fetch doctor data
    api.get("/user/doctors/")
      .then((res) => {
        setDoctor(res.data);
        const matchedDoctor = res.data.find(d => d.user.id === user?.id);
        if (matchedDoctor) {
          setSelectedDoctor(matchedDoctor);
        }
      })
      .catch(error => console.error("There was an error fetching doctors!", error));

    // Set districts
    setDistricts([
      "Barguna", "Barishal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur",
      "Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla",
      "Coxs_Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati",
      "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur",
      "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur",
      "Tangail", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia",
      "Magura", "Meherpur", "Narail", "Satkhira", "Jamalpur", "Mymensingh", "Netrokona",
      "Sherpur", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapai_Nawabganj", "Pabna",
      "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", 
      "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon", "Habiganj", "Maulvibazar", 
      "Sunamganj", "Sylhet"
    ]);
  }, [user]);

  useEffect(() => {
    if (doctorId) {
      setFormData(prevData => ({
        ...prevData,
        added_by: doctorId,
      }));
    }
  }, [doctorId]);

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
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
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form Data before submit:", JSON.stringify(formData)); 

    api.post("/vaccine/campaign/", formData)
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
          added_by: doctorId || "", 
        });
        alert("Campaign added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the campaign!", error);
      });
  };

  // console.log(user?.id);
  // doctor.map(d=>{
  //   if(d.user.id === user?.id){
  //     console.log("verified",d);
      
  //   }
  //   else{
  //     console.log("unverified",d);
  //   }
  // });
  // console.log(doctor);
  // doctor.map(d=>console.log(d));
  // console.log(selectedDoctor?.user?.id);
  // console.log(doctor.length);
  useEffect(()=>{
    if(doctor.length>0){
      for (let i = 1; i <= doctor.length; i++) {
        api.get(`/user/doctors/${i}`)
        .then(res=>{
          
          console.log(res.data)
          if(res.data?.user?.id === user?.id){
            console.log("verified",res.data);
            setDoctorId(i);
          }
          else{
            console.log("unverified",res.data);
          }
        }
        )
      }
    }
  },[doctor.length])
  console.log(doctorId);
  // console.log("showme=>",doctorDatabase);
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