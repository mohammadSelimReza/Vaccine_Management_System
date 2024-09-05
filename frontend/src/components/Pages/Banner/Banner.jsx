import { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../../../api";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [banner, setBanner] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await api.get("/app/details/");
        setBanner(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBanner();
  }, []);

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dofqxmuya/image/upload/v1725238756/sltburxwn1qzti8gtvfx.jpg)",
        }}
      >
        <div className="hero-overlay bg-gray-700 bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold"> Protect Your Health with Vaccination</h1>
            <p className="mb-5">
            Join the fight against preventable diseases. Schedule your vaccination today and secure a healthier future for you and your loved ones.
            </p>
            <button className="btn btn-primary">Book For Vaccine</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
