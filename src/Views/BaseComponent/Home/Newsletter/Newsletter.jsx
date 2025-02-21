import Toast from "../../../../plugin/useToast";

const Newsletter = () => {
  const handleBtn = (e) =>{
    e.preventDefault();
    Toast().fire({
      title:"Successfully Subscribed",
      icon:"success",
    })
  }
  return (
    <div>
      <div className="bg-blue-600 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
            Stay updated on our latest news and medical guides
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-4">
            <input
              type="email"
              placeholder="Add email"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 w-full sm:w-64 md:w-80 mb-4 sm:mb-0 sm:mr-4"
            />
            <button onClick={handleBtn} className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
