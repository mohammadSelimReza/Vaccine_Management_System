import ReactPlayer from "react-player";

const VideoShowing = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10 lg:py-20">
      <h1 className="text-xl md:text-3xl text-center font-bold mb-10">
        Vaccine Awareness
      </h1>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Left - Video */}
        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <ReactPlayer
              url="https://youtu.be/bMjjdcID-g8?si=1V9CGy-PgEHVMkK7"
              width="100%"
              height="100%"
              light={true}
              playing={false}
              controls
            />
          </div>
        </div>

        {/* Right - Text Card */}
        <div className="w-full lg:w-1/2 bg-blue-50 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Why Vaccination Matters?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Vaccination helps protect individuals and communities from 
            dangerous diseases. It strengthens immunity, prevents outbreaks, 
            and ensures long-term health security.
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600">
            <li>Reduces the spread of infectious diseases</li>
            <li>Protects high-risk individuals</li>
            <li>Ensures lifelong immunity</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Stay informed and ensure your vaccinations are up to date!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoShowing;
