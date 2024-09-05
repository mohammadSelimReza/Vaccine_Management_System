import IMAGES from "../../../Images/Images";
const VaccineImportant = () => {
  return (
    <div className="max-w-screen-lg mx-auto my-20">
      <h1 className="md:text-2xl font-bold text-center mb-10">Frequently Asked Questions</h1>
      <div className="flex">
        <div className="w-2/5">
          <img className="h-full" src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1725396414/Vaccine-FAQ_bnwmf3.jpg`} alt="choose_us" />
        </div>
        <div className="w-3/5">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is the recommended age for getting vaccinated?
            </div>
            <div className="collapse-content">
              <p>
                The recommended age for vaccination varies depending on the type
                of vaccine. Generally, vaccines for diseases like measles,
                mumps, and rubella (MMR) are administered to children between
                12-15 months of age, with a booster dose at 4-6 years. Adults
                may also require certain vaccines depending on their health,
                travel plans, and local recommendations.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Are there any side effects of vaccines?
            </div>
            <div className="collapse-content">
              <p>
                Most vaccines are safe and well-tolerated. Common side effects
                are usually mild and include pain at the injection site, fever,
                fatigue, or mild rash. Severe side effects are rare but can
                include allergic reactions. It is always best to consult a
                healthcare provider for specific concerns.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Can pregnant women receive vaccines?
            </div>
            <div className="collapse-content">
              <p>
                Yes, some vaccines are safe and recommended for pregnant women,
                such as the influenza (flu) vaccine and the Tdap (tetanus,
                diphtheria, and pertussis) vaccine. However, other vaccines,
                like live vaccines (e.g., MMR), are typically not recommended
                during pregnancy. Always consult a healthcare provider before
                receiving vaccines during pregnancy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccineImportant;
