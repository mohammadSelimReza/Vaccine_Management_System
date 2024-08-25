import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import api from "../../../api";
const PatientRegister = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [city, setCity] = useState("");
  const [street_address, setStreet_address] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [user_photo, setUser_photo] = useState('');
  const [user_type, setUser_type] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const gender_option = [
    { label: "Select gender", value: "select" },
    { label:"Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const type_option = [
    { label: "Select gender", value: "select" },
    { label: "Patient", value: "Patient" },
  ];
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleUserType = (event) => {
    setUser_type(event.target.value);
  };
  const handleImage = (event) => {
    setUser_photo(event.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Construct the data payload to match the expected API structure
    const data = {
        user: {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
        },
        birth_date: birth_date,
        gender: gender,
        nid: nid,
        phone_number: phone_number,
        city: city,
        street_address: street_address,
        zip_code: zip_code,
        user_type: user_type,
        user_photo: null,
    };

    // For registration, if passwords are included
    if (method === "register") {
        data.user.password = password;
        data.user.password2 = password2;
    }

    console.log(JSON.stringify(data)); // For debugging purposes

    try {
        const res = await api.post(route, data);

        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
        } else {
            navigate("/login");
        }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        alert(JSON.stringify(error.response.data)); // or display this in a user-friendly way
    } else {
        console.error("Error Message:", error.message);
        alert(error.message);
    }
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <section>
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
          <div className="text-center mb-16">
            <a href="javascript:void(0)">
              <img
                src="https://readymadeui.com/readymadeui.svg"
                alt="logo"
                className="w-52 inline-block"
              />
            </a>
            <h4 className="text-gray-800 text-base font-semibold mt-6">
              Fill in your details
            </h4>
          </div>

          <form onSubmit={handleSubmit}>
            {/* User Information Section */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  First Name
                </label>
                <input
                  name="first_name"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter your first name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter your last name"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Birth Date
                </label>
                <input
                  name="birth_date"
                  type="date"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter birth date"
                  value={birth_date}
                  onChange={(e) => setBirth_date(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="password2"
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Confirm your password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Patient Model Fields Section */}

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Gender
                </label>
                <select
                  name="gender"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  onChange={handleGenderChange}
                  required
                >
                  {gender_option.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">NID</label>
                <input
                  name="nid"
                  type="number"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter NID"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter phone number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User Type
                </label>
                <select
                  name="user_type"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  onChange={handleUserType}
                >
                  {type_option.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">City</label>
                <input
                  name="city"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Street Address
                </label>
                <input
                  name="street_address"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter street address"
                  value={street_address}
                  onChange={(e) => setStreet_address(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Zip Code
                </label>
                <input
                  name="zip_code"
                  type="number"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter zip code"
                  value={zip_code}
                  onChange={(e) => setZip_code(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User Photo
                </label>
                <input
                  type="file"
                  name="user_photo"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  // Event handler to capture file selection and update the state
                  onChange={handleImage}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="!mt-12 flex justify-center">
              <button
                type="submit"
                className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create a new account
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PatientRegister;
