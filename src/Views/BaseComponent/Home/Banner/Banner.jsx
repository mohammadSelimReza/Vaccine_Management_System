import { Link } from "react-router";
import "./Banner.css";
const Banner = () => {
  return (
    <section className="banner bg-blue-50 px-6 py-10 md:px-10 md:py-20">
      <div className="max-w-screen-xl mx-auto text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4 md:mb-6">
          Protected Together
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-semibold mb-4 md:mb-6 md:w-3/5 mx-auto md:mx-0">
          Your health is our priority. We stand united to safeguard our
          community, ensuring a healthier tomorrow for everyone. Together, we
          can overcome challenges and protect what matters most.
        </p>
        <div className="mb-4 text-sm text-gray-500">Emergency Hotline 24/7</div>
        <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition">
            <span className="material-icons">call</span> +1-795-5582-795
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Link to='/about'>CONTACT US</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
