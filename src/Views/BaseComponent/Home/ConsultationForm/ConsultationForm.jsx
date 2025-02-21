import Toast from "../../../../plugin/useToast";

const ConsultationForm = () => {
  const handleBtn = (e) =>{
    e.preventDefault();
    Toast().fire({
      title: "Successfully booked!",
      icon: "success"
    })
  }
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-xl max-w-screen-lg mx-auto rounded-xl p-6">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">Sign up for an Online Consultation:</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name (required)"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email Address (required)"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              placeholder="Leave us a message"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <button onClick={handleBtn} className="btn bg-blue-600 hover:bg-blue-700 text-white w-full">
            SEND
          </button>
        </form>
      </div>

      {/* Real-Life Context Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-blue-50 rounded-xl">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            How Online Consultation Helps
          </h3>
          <p className="text-gray-600 mb-4">
            “I was struggling with severe migraines for weeks. Booking an online consultation
            gave me instant access to a doctor who provided guidance and treatment from the
            comfort of my home. It saved me time and helped me recover faster.”  
          </p>
          <p className="text-sm text-gray-500 font-semibold">— Sarah L., Verified Patient</p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
