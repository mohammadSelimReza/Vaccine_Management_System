import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const BaseFooter = () => {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="container max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 text-center lg:text-left px-4">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">VaccineHub</h2>
          <p>
            VaccineHub serves as a central platform for managing vaccine-related
            data, providing users with detailed information on vaccine
            availability, schedules, and tracking. It also enables individuals
            to book vaccination appointments and doctors to update patient
            records.
          </p>
        </div>
        <div className="space-y-4">
          <nav className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
            <a href="/about" className="hover:text-gray-300">
              About us
            </a>
            <a href="/services" className="hover:text-gray-300">
              Services
            </a>
            <a href="/faq" className="hover:text-gray-300">
              FAQ
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </nav>
          <div className="text-xl font-bold text-center">
            <FaPhoneAlt className="inline-block mr-2" />
            <div>
            <p>+1-795-5582-795</p>
            <p className="text-sm">Emergency Hotline 24/7</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex flex-col items-center lg:items-end text-gray-200">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-2xl text-blue-400" />
            <div className="text-center md:text-right">
              <p className="font-bold">Head Office Location:</p>
              <p>9873 Ridgewood Street</p>
              <p>Elgin, IL 60120</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-2xl text-blue-400" />
            <div className="flex sm:block gap-2 text-right">
              <p className="font-bold">Email:</p>
              <p>info@vaxi.com</p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="/" className="text-2xl hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="/" className="text-2xl hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="/" className="text-2xl hover:text-blue-400">
              <FaLinkedin />
            </a>
            <a href="/" className="text-2xl hover:text-blue-400">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-blue-400 pt-4">
        <p>© 2025 Design - VaccineHub | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default BaseFooter;
