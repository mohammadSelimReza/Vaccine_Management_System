import "./Tips.css";
const ImmunizationTips = () => {
  return (
    <div className="section bg-base-100 py-12 px-6 md:px-16">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">Immunization Tips</h2>
        <p className="text-gray-600 mt-2">
          Stay informed about vaccines to protect yourself and others from
          preventable diseases.
        </p>
      </div>

      {/* Layout Container */}
      <div className="relative flex flex-col items-center justify-center mt-10 md:flex-row md:flex-wrap md:gap-12">
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 md:mt-0 md:w-full md:h-auto md:relative lg:w-auto">
          <div className=" flex flex-col items-center text-center md:absolute md:bottom-16 md:-left-28">
            <div className="p-4 rounded-full bg-primary text-white">
              <span className="text-2xl">💉</span>
            </div>
            <h3 className="font-bold text-lg mt-2">Safe & Effective</h3>
            <p className="text-gray-500 text-sm w-32">
              Vaccines go through strict testing to ensure safety.
            </p>
          </div>

          <div className=" flex flex-col items-center text-center md:absolute md:top-18 md:right-16">
            <div className="p-4 rounded-full bg-primary text-white">
              <span className="text-2xl">🧪</span>
            </div>
            <h3 className="font-bold text-lg mt-2">Antibody Testing</h3>
            <p className="text-gray-500 text-sm w-32">
              Antibody tests check immune response post-vaccine.
            </p>
          </div>
        </div>
        {/* Center Image */}
        <div className=" w-48 h-48 md:w-64 md:h-64 lg:w-1/3 lg:h-1/3 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src="https://res.cloudinary.com/dofqxmuya/image/upload/v1739751409/Img1_nciqc1.png"
            alt="Nurse with Vaccine"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Information Boxes (Grid for Mobile, Absolute for Large Screens) */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 md:mt-0 md:w-full md:h-auto md:relative lg:w-auto">
          <div className=" flex flex-col items-center text-center md:absolute md:bottom-6 md:right-18">
            <div className="p-4 rounded-full bg-primary text-white">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-bold text-lg mt-2">Immunity Passports</h3>
            <p className="text-gray-500 text-sm w-32">
              Some countries require proof of vaccination for travel.
            </p>
          </div>
          <div className=" flex flex-col items-center text-center md:absolute md:top-0 md:left-10">
            <div className="p-4 rounded-full bg-primary text-white">
              <span className="text-2xl">🧤</span>
            </div>
            <h3 className="font-bold text-lg mt-2">Personal Protection</h3>
            <p className="text-gray-500 text-sm w-32">
              Vaccines help strengthen your immune system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmunizationTips;
