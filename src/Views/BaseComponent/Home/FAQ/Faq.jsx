import { FaSyringe, FaShieldVirus, FaHandHoldingMedical } from "react-icons/fa";

const faqs = [
  {
    icon: <FaHandHoldingMedical size={30} className="text-white" />,
    title: "Why should I get vaccinated for COVID-19?",
    description:
      "COVID-19 vaccines help prevent severe illness, reduce hospitalization rates, and protect vulnerable populations. Vaccination is a crucial step toward ending the pandemic.",
    link: "#",
    bgColor: "bg-green-500",
  },
  {
    icon: <FaShieldVirus size={30} className="text-white" />,
    title: "What are the differences between the vaccines?",
    description:
      "Different COVID-19 vaccines use different technologies but have all been proven effective at preventing severe illness. Learn about mRNA, vector-based, and protein-based vaccines.",
    link: "#",
    bgColor: "bg-blue-500",
  },
  {
    icon: <FaSyringe size={30} className="text-white" />,
    title: "When and how do I get a COVID-19 vaccine?",
    description:
      "Vaccines are available at clinics, pharmacies, and healthcare providers. Boosters are recommended for extended protection. Check eligibility and appointment availability.",
    link: "#",
    bgColor: "bg-red-500",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-blue-600 py-20 mb-20">
      <div className="max-w-screen-xl mx-auto">
        <div className=" text-center text-white">
          <h2 className="text-3xl font-bold">
            FAQ’s and Myths About Vaccination
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg text-center"
            >
              {/* Icon Badge */}
              <div
                className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full ${faq.bgColor}`}
              >
                {faq.icon}
              </div>

              {/* FAQ Content */}
              <h3 className="text-lg font-semibold text-gray-900 mt-8">
                {faq.title}
              </h3>
              <p className="text-gray-600 mt-2">{faq.description}</p>

              {/* Read More Link */}
              <a
                href={faq.link}
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
