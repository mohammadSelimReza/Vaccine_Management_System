import { useEffect, useState } from "react";
import Toast from "../../../../plugin/useToast";
import publicApiInstance from "../../../../Utils/publicApiInstance";
import { motion, AnimatePresence } from "framer-motion";

const ConsultationForm = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading,setLoading] = useState(true);
  const fetchTestimonial = async () => {
    setLoading(true);
    try {
      const res = await publicApiInstance.get(`/api/testimonial/`);
      setTestimonials(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 3000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const handleBtn = (e) => {
    e.preventDefault();
    Toast().fire({
      title: "Successfully booked!",
      icon: "success",
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-xl lg:w-[1280px] mx-auto rounded-xl p-6">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Book for an Online Consultation:
        </h2>
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
          <button
            onClick={handleBtn}
            className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            SEND
          </button>
        </form>
      </div>

      {/* Testimonial Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            How Online Consultation Helps
          </h3>
         <div className="lg:h-52">
         <AnimatePresence mode="wait">
            {testimonials.length > 0 && (
              <motion.div
                key={testimonials[index]?.id || index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="p-6"
              >
                <p className="text-lg text-gray-700 lg:h-36">
                  {
                    loading ?
                    (
                      <>
                        <div className="skeleton h-10 mb-4 w-full"></div>
                        <div className="skeleton h-10  w-full"></div>
                      </>
                    )
                    :
                    (
                      <>"{testimonials[index]?.message}" </>
                    )
                  }
                </p>
                <h3 className="mt-2 font-semibold text-end text-blue-600">
                {
                    loading ?
                    (
                      <div className="flex justify-end">
                        <div className="skeleton h-4 w-28"></div>
                      </div>
                    )
                    :
                    (
                      <> - {testimonials[index]?.name} </>
                    )
                  }
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

         </div>
          {/* Navigation Buttons
          <div className="mt-4 flex gap-4">
            <button
              onClick={() =>
                setIndex((prevIndex) =>
                  prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
                )
              }
              className="btn bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
              }
              className="btn bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
