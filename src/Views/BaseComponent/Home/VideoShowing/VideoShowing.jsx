import ReactPlayer from "react-player";

const VideoShowing = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10 lg:my-20">
      <h1 className="text-xl md:text-3xl text-center font-bold mb-10">Vaccine Awareness</h1>
      <div
        className="cursor-pointer w-full max-w-4xl aspect-video relative"
      >
        <ReactPlayer
          url="https://youtu.be/bMjjdcID-g8?si=1V9CGy-PgEHVMkK7"
          width="100%"
          height="100%"
          light={true}
          playing={false}
        />
      </div>

    </div>
  );
};

export default VideoShowing;
