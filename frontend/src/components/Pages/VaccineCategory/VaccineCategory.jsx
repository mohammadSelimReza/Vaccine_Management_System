import { useEffect, useState } from "react";
import api from "../../../api";
import Slider from "react-slick";
// import IMAGES from '../../../Images/Images';
const VaccineCategory = () => {
  const [vaccines, setVaccines] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch vaccine list when component mounts
    api
      .get("/vaccine/vaccine-type/")
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
    responsive: [
      {
        breakpoint: 1024, // Below 1024px screen width
        settings: {
          slidesToShow: 3, // Show 3 slides
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Below 768px screen width
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Below 480px screen width
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container max-w-screen-lg mx-auto my-12">
      <h2 className="text-center text-2xl font-bold">Vaccine Category</h2>
      {/* <p className="text-center text-sm font-semibold mt-2 mb-8">Ve</p> */}
      <Slider {...settings}>
        {vaccines.map((vaccine) => (
          <div key={vaccine.id}>
            <img
              src={`https://res.cloudinary.com/dofqxmuya/${vaccine.type_img}`}
              className="w-full md:w-56 h-40 p-4"
              alt=""
            />
            <h2 className="md:text-xl font-bold text-center h-10">
              {vaccine.vaccine_type}{" "}
            </h2>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VaccineCategory;
