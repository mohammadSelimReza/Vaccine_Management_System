import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import api from "../../../api";

const CommentForm = () => {
    const location = useLocation();
    const { patient_name, campaign_name, campaign_id } = location.state || {};
    const { user } = useAuth();
    const userid = user?.username === patient_name ? user.id : null;
    console.log(userid);

    const [patient, setPatient] = useState(patient_name || "");
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            patient: userid,
            patient_name: patient,
            campaign: campaign_id,
            text: comment,
        };
        console.log("FormData:", formData);
        console.log(JSON.stringify(formData))
        api.post('/vaccine/comments/', formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 shadow-lg mt-56 mb-4 mx-auto"
        >
            <div className="flex flex-wrap -mx-3 mb-6">
                <label className="input input-bordered flex items-center gap-2 w-2/3 mb-4">
                    Name:
                    <input
                        type="text"
                        
                        onChange={(e) => setPatient(e.target.value)}
                        className="grow"
                        placeholder="Patient Name"
                    />
                </label>
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
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
