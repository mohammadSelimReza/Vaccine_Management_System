import { useEffect, useState } from "react";
import api from "../../../api";
import Slider from "react-slick";
// import useAuth from "../../../hooks/useAuth";
const PeopleComments = () => {
  const [vaccines, setVaccines] = useState([]);
  // const [patientCommentId,setPatientCommentId] = useState("");
  const [error, setError] = useState(null);
  // const {patientData} = useAuth();
  useEffect(() => {
    console.log("vaccine page");

    // Fetch vaccine list when component mounts
    api
      .get("/vaccine/comments/")
      .then((res) => {
        // If using Axios, the response data is in res.data
        console.log(res.data); // Log data for debugging
        setVaccines(res.data); // Store the fetched data in state
      })
      .catch((err) => {
        console.error("Error fetching vaccine list:", err);
        setError(err.message); // Store error message
      });
  }, []);
  const settings = {
    dots: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2300,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="slider-container max-w-screen-lg mx-auto my-12">
      <h2 className="text-center text-2xl font-bold mb-8">
        Feedback from Vaccine Campaign
      </h2>
      <Slider {...settings}>
        {vaccines.map((vaccine) => (
          <div key={vaccine.id} className="shadow-lg rounded-lg p-4 mb-4 h-52 p-10 bg-white">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="inline-block relative">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <img
                      className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
                      src={
                        vaccine.patient_img
                          ? vaccine.patient_img
                          : "https://res.cloudinary.com/dofqxmuya/image/upload/v1725378249/default_user_i0wpzv.png"
                      }
                      alt="Profile picture"
                    />
                    <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                  </div>
                </div>
              </div>
              <div className="ml-6">
                <p className="flex items-baseline">
                  <span className="text-gray-600 font-bold">
                    {vaccine.patient_name}
                  </span>
                </p>
                <div className="flex items-center mt-1">
                  <svg
                    className="w-4 h-4 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-yellow-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
                <div className="flex items-center mt-4 text-gray-600">
                  <div className="flex items-center">{vaccine.text}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PeopleComments;
