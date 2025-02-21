import { useEffect, useState } from "react";
import BaseHeader from "../../PartialComponent/BaseHeader";
import BaseFooter from "../../PartialComponent/BaseFooter";
import { motion } from "framer-motion";
const teamMembers = [
  {
    name: "Dr. John Doe",
    role: "Chief Medical Officer",
    image: "https://res.cloudinary.com/dofqxmuya/image/upload/v1725597284/k8f8ympr4sorkrxv6c1a.avif",
  },
  {
    name: "Jane Smith",
    role: "Vaccine Specialist",
    image: "https://res.cloudinary.com/dofqxmuya/image/upload/v1725581062/rkverrb8rrztimtcjgwu.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Healthcare Consultant",
    image: "https://res.cloudinary.com/dofqxmuya/image/upload/v1725414387/z1zt4o34d7lfr7stzibf.jpg",
  },
];

const About = () => {
  const [visibleTeam, setVisibleTeam] = useState([]);

  useEffect(() => {
    // Simulate loading team members dynamically
    const loadTeam = () => {
      setTimeout(() => setVisibleTeam(teamMembers), 500);
    };
    loadTeam();
  }, []);

  return (
    <>
      <BaseHeader />
      <div className="w-full mx-auto lg:w-3/4">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Vaccine Hub
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your trusted partner for vaccine information and booking.
          </p>
          <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
            Learn More
          </button>
        </section>

        {/* Our Mission */}
        <section className="py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Vaccine Hub, we are committed to providing accurate and
            up-to-date vaccine information while making the booking process
            seamless and accessible to everyone.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-100 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Why Choose Vaccine Hub?
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
              <div className="text-4xl text-blue-500 mb-4">💉</div>
              <h3 className="font-bold text-xl mb-2">
                Comprehensive Information
              </h3>
              <p className="text-gray-600">
                Stay informed with the latest vaccine updates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
              <div className="text-4xl text-green-500 mb-4">📅</div>
              <h3 className="font-bold text-xl mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your vaccine appointments effortlessly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
              <div className="text-4xl text-purple-500 mb-4">🔒</div>
              <h3 className="font-bold text-xl mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is secure with us.</p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {visibleTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg w-60 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Us */}
        <section className="py-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have any questions or feedback? Reach out to us and we'll be happy
            to assist you.
          </p>
          <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
            Contact Us
          </button>
        </section>
      </div>
      <BaseFooter />
    </>
  );
};

export default About;
