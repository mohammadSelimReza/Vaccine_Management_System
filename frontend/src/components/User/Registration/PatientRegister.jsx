import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import api from "../../../api";
import toast, { Toaster } from "react-hot-toast";
const PatientRegister = ({ route, method }) => {
  // User Information
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
  const [user_type, setUser_type] = useState("");
  const [user_photo, setUser_photo] = useState(null);

  // Error States
  const [usernameErr, setUsernameErr] = useState(null);
  const [firstNameErr, setFirstNameErr] = useState(null);
  const [lastNameErr, setLastNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [password2Err, setPassword2Err] = useState(null);
  const [birthDateErr, setBirthDateErr] = useState(null);
  const [genderErr, setGenderErr] = useState(null);
  const [nidErr, setNidErr] = useState(null);
  const [phoneNumberErr, setPhoneNumberErr] = useState(null);
  const [cityErr, setCityErr] = useState(null);
  const [streetAddressErr, setStreetAddressErr] = useState(null);
  const [zipCodeErr, setZipCodeErr] = useState(null);
  const [userPhotoErr, setUserPhotoErr] = useState(null);
  const [userTypeErr, setUserTypeErr] = useState(null);
  const [formError, setFormError] = useState(null);

  // Miscellaneous
  const [error, setError] = useState(null); // For general errors
  const [loading, setLoading] = useState(false); // For loading state
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingPhotoErr, setUploadingPhotoErr] = useState(null);

  const navigate = useNavigate();
  const gender_option = [
    { label: "Select gender", value: "select" },
    { label: "Male", value: "Male" },
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
    uploadPhoto(event.target.files[0]);
  };

  const uploadPhoto = async (file) => {
    setUploadingPhoto(true); // Set uploading to true when starting the upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vaccinereactup");
    formData.append("cloud_name", "dofqxmuya");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dofqxmuya/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      setUser_photo(data.secure_url); // Set the URL of the uploaded image
    } catch (err) {
      console.error(err);
      toast.error(err);
      setError("Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false); // Set uploading to false after the upload is finished
    }
  };

  const commonPasswords = [
    "123456",
    "password",
    "12345678",
    "qwerty",
    "abc123",
    "password1",
  ];
  const validatePassword = (password, username, email) => {
    if (password.length < 8) {
      setPasswordErr("Your password must contain at least 8 characters.");
    } else if (
      password.toLowerCase().includes(username.toLowerCase()) ||
      password.toLowerCase().includes(email.toLowerCase().split("@")[0])
    ) {
      setPasswordErr(
        "Your password can’t be too similar to your other personal information."
      );
    } else if (commonPasswords.includes(password)) {
      setPasswordErr("Your password can’t be a commonly used password.");
    } else if (/^\d+$/.test(password)) {
      setPasswordErr("Your password can’t be entirely numeric.");
    } else {
      setPasswordErr(""); // Clear the error if all validations pass
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    // If the current month is before the birth month or it's the birth month but the day is before the birth day
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFormError(null);

    // Clear all previous errors
    setUsernameErr(null);
    setFirstNameErr(null);
    setLastNameErr(null);
    setEmailErr(null);
    setPasswordErr(null);
    setPassword2Err(null);
    setBirthDateErr(null);
    setGenderErr(null);
    setNidErr(null);
    setPhoneNumberErr(null);
    setCityErr(null);
    setStreetAddressErr(null);
    setZipCodeErr(null);
    setUserPhotoErr(null);
    setUserTypeErr(null);
    let hasErrors = false;

    // Client-side validation
    if (username.trim() === "") {
      setUsernameErr("Username is required");
      hasErrors = true;
    }
    if (first_name.trim() === "") {
      setFirstNameErr("First name is required");
      hasErrors = true;
    } else if (!/^[a-z ,.'-]+$/i.test(first_name)) {
      setFirstNameErr("First name is not valid");
      hasErrors = true;
    }
    if (last_name.trim() === "") {
      setLastNameErr("Last name is required");
      hasErrors = true;
    } else if (!/^[a-z ,.'-]+$/i.test(last_name)) {
      setLastNameErr("Last name is not valid");
      hasErrors = true;
    }
    if (email.trim() === "") {
      setEmailErr("Email is required");
      hasErrors = true;
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) {
      setEmailErr("Email is not valid");
      hasErrors = true;
    }

    if (method === "register") {
      if (password.trim() === "" || password2.trim() === "") {
        setPasswordErr("Password is required");
        setPassword2Err("Please confirm your password");
        hasErrors = true;
      } else {
        validatePassword(password, username, email);
      }

      if (password !== password2) {
        setPassword2Err("Passwords do not match");
        hasErrors = true;
      }
    }

    if (nid.trim() === "") {
      setNidErr("National ID is required");
      hasErrors = true;
    } else if (!/^\d{10}$/.test(nid)) {
      setNidErr("National ID must be exactly 10 digits");
      hasErrors = true;
    }

    if (phone_number.trim() === "") {
      setPhoneNumberErr("Phone number is required");
      hasErrors = true;
    }
    if (city.trim() === "") {
      setCityErr("City is required");
      hasErrors = true;
    }
    if (street_address.trim() === "") {
      setStreetAddressErr("Street address is required");
      hasErrors = true;
    }
    if (zip_code.trim() === "") {
      setZipCodeErr("Zip code is required");
      hasErrors = true;
    }
    if (gender === "") {
      setGenderErr("Gender is required");
      hasErrors = true;
    }
    if (birth_date === "") {
      setBirthDateErr("Birth date is required");
      hasErrors = true;
    } else {
      const age = calculateAge(birth_date);
      if (age < 18) {
        setBirthDateErr("You must be at least 18 years old");
        hasErrors = true;
      }
    }
    if (user_type === "") {
      setUserTypeErr("User type is required");
      hasErrors = true;
    }

    // If there are validation errors, stop the form submission
    if (hasErrors) {
      setFormError("Correct your form before submitting.");
      setLoading(false);
      return;
    } else {
      setFormError(null);
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
        user_photo: user_photo,
      };

      if (method === "register") {
        data.user.password = password;
        data.user.password2 = password2;
      }

      console.log(JSON.stringify(data));

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
          // alert(JSON.stringify(error.response.data));
        } else {
          console.error("Error Message:", error.message);
          // alert(error.message);
        }
      } finally {
        setLoading(false);
        toast.success("Check your email for confirmation.",{
          duration: 4000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={true} />
      <section>
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
          <div className="text-center mb-16">
            <h4 className="text-gray-800 text-base font-semibold mt-6">
              Hello, Doctor! Fill up your details
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
                className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                  usernameErr
                    ? "bg-red-100 outline-red-500"
                    : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                }`}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr && (
                <p className="error text-red-500">{usernameErr}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  First Name
                </label>
                <input
                  name="first_name"
                  type="text"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    firstNameErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter your first name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />
                {firstNameErr && (
                  <p className="error text-red-500">{firstNameErr}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    lastNameErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter your last name"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                />
                {lastNameErr && (
                  <p className="error text-red-500">{lastNameErr}</p>
                )}
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
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    emailErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailErr && <p className="error text-red-500">{emailErr}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Birth Date
                </label>
                <input
                  name="birth_date"
                  type="date"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    birthDateErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter birth date"
                  value={birth_date}
                  onChange={(e) => setBirth_date(e.target.value)}
                />
                {birthDateErr && (
                  <p className="error text-red-500">{birthDateErr}</p>
                )}
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
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    passwordErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordErr && (
                  <p className="error text-red-500">{passwordErr}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="password2"
                  type="password"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    password2Err
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Confirm your password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {password2Err && (
                  <p className="error text-red-500">{password2Err}</p>
                )}
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
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    genderErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  onChange={handleGenderChange}
                >
                  {gender_option.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {genderErr && <p className="error text-red-500">{genderErr}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">NID</label>
                <input
                  name="nid"
                  type="number"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    nidErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter NID"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                />
                {nidErr && <p className="error text-red-500">{nidErr}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  type="text"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    phoneNumberErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter phone number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
                {phoneNumberErr && (
                  <p className="error text-red-500">{phoneNumberErr}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User Type
                </label>
                <select
                  name="user_type"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    userTypeErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  onChange={handleUserType}
                >
                  {type_option.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {userTypeErr && (
                  <p className="error text-red-500">{userTypeErr}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">City</label>
                <input
                  name="city"
                  type="text"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    cityErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {cityErr && <p className="error text-red-500">{cityErr}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Street Address
                </label>
                <input
                  name="street_address"
                  type="text"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    streetAddressErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter street address"
                  value={street_address}
                  onChange={(e) => setStreet_address(e.target.value)}
                />
                {streetAddressErr && (
                  <p className="error text-red-500">{streetAddressErr}</p>
                )}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Zip Code
                </label>
                <input
                  name="zip_code"
                  type="number"
                  className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                    zipCodeErr
                      ? "bg-red-100 outline-red-500"
                      : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                  }`}
                  placeholder="Enter zip code"
                  value={zip_code}
                  onChange={(e) => setZip_code(e.target.value)}
                />
                {zipCodeErr && (
                  <p className="error text-red-500">{zipCodeErr}</p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User Photo
                </label>
                <div className="flex">
                  {uploadingPhoto && (
                    <span className="loading loading-spinner text-accent"></span>
                  )}

                  <input
                    type="file"
                    name="user_photo"
                    className={`w-full text-sm px-4 py-3.5 rounded-md transition-all ${
                      userPhotoErr
                        ? "bg-red-100 outline-red-500"
                        : "bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
                    }`}
                    // Event handler to capture file selection and update the state
                    onChange={handleImage}
                  />
                </div>
                {userPhotoErr && (
                  <p className="error text-red-500">{userPhotoErr}</p>
                )}
              </div>
            </div>
            <div className="text-center">
              {loading && (
                <div className="text-center">
                  <span className="loading loading-spinner text-info"></span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="!mt-12 flex justify-center">
              <button
                type="submit"
                className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                disabled={loading || uploadingPhoto}
              >
                {loading ? "Creating..." : "Create a new account"}
              </button>
            </div>
            {formError && (
              <p className="error text-center error text-red-500">
                {formError}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default PatientRegister;
