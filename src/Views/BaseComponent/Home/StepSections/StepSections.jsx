
const StepsSection = () => {
  const steps = [
    { number: "1", title: "Sign up for free", description: "Nam rhoncus nisl purus, ac lobortisamet dapibus malesuada" },
    { number: "2", title: "Book a service", description: "Nam rhoncus nisl purus, ac lobortisamet dapibus malesuada" },
    { number: "3", title: "Start your visit", description: "Nam rhoncus nisl purus, ac lobortisamet dapibus malesuada" },
  ];

  return (
    <div className="bg-base-100 max-w-screen-lg mx-auto py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {steps.map((step, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border-t-4 border-primary">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">{step.number}</span>
                <h3 className="text-lg font-bold">{step.title}</h3>
              </div>
              <p className="text-gray-500 mt-2">{step.description}</p>
              <button className="btn btn-primary mt-4 px-6">READ MORE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
