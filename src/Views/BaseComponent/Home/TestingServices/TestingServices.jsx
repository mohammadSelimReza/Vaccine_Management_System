import { FaDna, FaVirus, FaFlask, FaVial, FaMicroscope, FaDiagnoses } from 'react-icons/fa';

const services = [
  { icon: <FaDna />, title: 'Clinical biochemistry', description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra' },
  { icon: <FaVirus />, title: 'Coronavirus care product mix', description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra' },
  { icon: <FaFlask />, title: 'Rigorous testing in clinical trials', description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra' },
  { icon: <FaVial />, title: 'An antibody test', description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra' },
  { icon: <FaMicroscope />, title: 'RT-PCR and Combination tests', description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra' },
  { icon: <FaDiagnoses />, title: 'Rigorous testing in clinical trials', description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra' },
];

const TestingServices = () => {
  return (
    <div className="py-10 lg:max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">World Leader in Testing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all">
            <div className="text-blue-500 text-3xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestingServices;
