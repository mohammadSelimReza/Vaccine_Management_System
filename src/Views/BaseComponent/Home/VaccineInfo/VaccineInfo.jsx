
const VaccineInfo = () => {
  return (
    <div className="max-w-screen-xl mx-auto bg-white p-6 md:p-12 flex flex-col md:flex-row items-center gap-8">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src="https://res.cloudinary.com/dofqxmuya/image/upload/v1725324227/kggk1kxuatduuih9v7q0.jpg"
          alt="COVID-19 Vaccine"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          COVID-19 Vaccines: How They Protect You
        </h2>
        <p className="text-gray-600 mt-4">
          COVID-19 vaccines help protect you by teaching your immune system to recognize and fight the virus. 
          These vaccines significantly reduce the risk of severe illness, hospitalization, and death.
        </p>
        <p className="text-gray-600 mt-2">
          The vaccines have undergone extensive testing and have been proven safe and effective. 
          Booster doses can further enhance your protection, especially against new variants.
        </p>

        {/* CTA Link */}
        <a
          href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html"
          className="text-primary font-semibold mt-4 inline-flex items-center"
        >
          Learn More &rarr;
        </a>
      </div>
    </div>
  );
};

export default VaccineInfo;
