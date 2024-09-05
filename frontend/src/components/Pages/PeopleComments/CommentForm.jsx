import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../context/useAuth";
import { useState } from "react";
import api from "../../../api";
import toast from "react-hot-toast";

const CommentForm = () => {
  const location = useLocation();
  const { patient_name, campaign_name, campaign_id } = location.state || {};

  const [patient, setPatient] = useState(patient_name || "");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [patientPhoto, setPatientPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleImage = (event) => {
    // setUser_photo(event.target.files[0]);
    uploadPhoto(event.target.files[0]); // Pass the file to the upload function
  };
 
  const uploadPhoto = async (file) => {
    setUploadingPhoto(true); // Set uploading to true when starting the upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vaccinereactup");
    formData.append("cloud_name", "dofqxmuya");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dofqxmuya/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      setPatientPhoto(data.secure_url); // Set the URL of the uploaded image
    } catch (err) {
      console.error(err);
      toast.error(err);
      setError("Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false); // Set uploading to false after the upload is finished
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      patient_name: patient,
      patient_img: patientPhoto, // Include patient image
      campaign: campaign_id,
      text: comment,
    };

    api
      .post("/vaccine/comments/", formData)
      .then((response) => {
        toast.success("Comment posted successfully");
        navigate("/");
        // Handle success (e.g., reset form or redirect)
      })
      .catch((error) => {
        console.error("Error posting comment", error);
        toast.error("Error posting comment");
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 shadow-lg mt-56 mb-4 mx-auto"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <label className="input input-bordered flex items-center gap-2 w-2/3 mb-4">
          Patient Name:
          <input
            type="text"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="grow"
            placeholder="Patient Name"
            required
          />
        </label>
        <div className="mb-4 w-full">
          <label className="text-gray-800 text-sm mb-2 block">User Photo</label>
          <div className="flex items-center">
            {uploadingPhoto && (
              <span className="loading loading-spinner text-accent"></span>
            )}
            <input
              type="file"
              name="patient_photo"
              className="bg-gray-100 text-gray-800 focus:bg-transparent outline-blue-500"
              onChange={handleImage}
              disabled={uploadingPhoto} // Disable file input while uploading
            />
          </div>
        </div>
        <label className="input input-bordered flex items-center gap-2 w-2/3 mb-4">
          Campaign Name:
          <input
            type="text"
            className="grow"
            placeholder="Campaign Name"
            defaultValue={campaign_name}
            readOnly
          />
        </label>
        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
          Write your feedback here...
        </h2>
        <div className="w-full px-3 mb-2 mt-2">
          <textarea
            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="Type Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="w-full flex items-start px-3">
          <div className="-mr-1">
            <input
              type="submit"
              className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              value="Post Comment"
              disabled={uploadingPhoto} // Disable submit button during photo upload
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
