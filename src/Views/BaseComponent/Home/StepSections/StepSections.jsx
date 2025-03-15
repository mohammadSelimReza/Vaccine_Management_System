import { Link } from "react-router";

const StepsSection = () => {
  const steps = [
    { 
      number: "1", 
      title: "Register for Vaccination", 
      description: "Sign up on the portal with your details to schedule a vaccination appointment.", 
      btn: "Sign Up",
      link: "/login",
    },
    { 
      number: "2", 
      title: "Book Your Slot", 
      description: "Choose a convenient date and time at your nearest vaccination center.", 
      btn: "Book Vaccine",
      link: "/vaccine/list"
    },
    { 
      number: "3", 
      title: "Prepare for Your Shot", 
      description: "Stay hydrated, get enough rest, and bring your ID and medical history if required.",
      btn: "Lets get Shot",
      link: "/vaccine/list" 
    },
  ];
  

  return (
    <div className="bg-base-100 max-w-screen-xl lg:w-full mx-auto px-4 lg:px-0 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border-t-4 border-primary"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">{step.number}</span>
              <h3 className="text-lg font-bold">{step.title}</h3>
            </div>
            <p className="text-gray-500 mt-2">{step.description}</p>
            <Link to={`${step.link}`}>
            <button className="mt-4 btn bg-blue-600 text-white lg:btn-md sm:btn-xs">{step.btn}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsSection;
