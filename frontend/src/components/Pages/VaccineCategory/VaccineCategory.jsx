import { useEffect, useState } from "react";
import api from "../../../api";
import Slider from "react-slick";
// import IMAGES from '../../../Images/Images';
const VaccineCategory = () => {
  const [vaccines, setVaccines] = useState([]);
  const [error, setError] = useState(null);
  console.log("nice page");
  useEffect(() => {
    console.log("vaccine page");

    // Fetch vaccine list when component mounts
    api
      .get("/vaccine/list/")
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2300,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container max-w-screen-lg mx-auto my-12">
      <h2 className="text-center text-2xl font-bold">Vaccine Category</h2>
      <p className="text-center text-sm font-semibold mt-2 mb-8">Vaccine We Provide</p>
      <Slider {...settings}>
        {vaccines.map((vaccine) => (
          <div key={vaccine.id}>
            <h2 className="md:text-xl font-bold text-center h-10">{vaccine.vaccine_type } </h2>
            <h2 className="text-center md:text-base font-medium w-2/3 mx-auto">{vaccine.description} </h2>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VaccineCategory;
