import IMAGES from "../../../Images/Images";

const Banner = () => {
  return (
    <div className="md:flex max-w-4xl mx-auto">
      <div className="w-1/2 flex justify-center items-center">
        <div>
          <h2 className="md:text-4xl font-bold">The vaccines</h2>
          <h2 className="md:text-4xl font-bold mb-6">Protect you</h2>
          <h6 className="w-2/3 md:text-base font-medium text-justify mb-6">
            Your health is our priority. Get vaccinated today for a healthier
            tomorrow.
          </h6>
          <button className="btn btn-outline btn-info">Book For Vaccine</button>
        </div>
      </div>
      <div className="w-1/2">
        <img src={IMAGES.image2} alt="banner-img" />
      </div>
    </div>
  );
};

export default Banner;
