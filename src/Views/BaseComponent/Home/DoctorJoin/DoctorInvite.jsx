
import { FaUserMd } from "react-icons/fa";
import { Link } from "react-router";

const DoctorInvite = () => {
  return (
    <section className="py-16">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center px-6">
        {/* Image Section */}
        <div className="md:w-1/2 md:mr-10 flex justify-center">
          <img
            src="https://res.cloudinary.com/dofqxmuya/image/upload/v1725597069/j5rbnihzp654xwf52yd2.avif"
            alt="Doctor"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 mt-6 md:mt-0 text-center md:text-left">
          <h2 className="text-4xl font-bold text-blue-900">
            Are You a Doctor? <br /> Join Us to Help People!
          </h2>
          <p className="text-gray-700 my-10 text-xl text-justify">
            If you are a doctor and passionate about contributing to society by 
            helping people in need, we invite you to join our network. Together, 
            we can make a real difference in healthcare access and quality.
          </p>

          {/* Call-to-Action Button */}
          <Link to='/doctor/register'
            href="#"
            className="mt-6 inline-flex items-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg shadow-md transition"
          >
            <FaUserMd className="mr-2" />
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorInvite;
