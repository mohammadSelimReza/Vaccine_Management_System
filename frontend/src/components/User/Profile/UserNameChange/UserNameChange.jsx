import { useState } from "react";
import api from "../../../../api";
import useAuth from "../../../../hooks/useAuth";

const UserNameChange = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const response = await api.patch(`/user/update-name/`, {
                first_name: firstName || user?.first_name,
                last_name: lastName || user?.last_name
            });
            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError("Failed to update your name. Please try again.");
            }
        } catch (error) {
            setError("An error occurred while updating your name. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleNameSubmit} className="max-w-80 mx-auto">
            <h1 className="md:text-2xl font-bold text-center mb-10">Change Your Name</h1>
            <label className="input input-bordered flex items-center gap-2">
                First Name:
                <input
                    onChange={(e) => setFirstName(e.target.value)}
                    name="first_name"
                    type="text"
                    className="grow"
                    defaultValue={user?.first_name}
                    placeholder="Enter your first name..."
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-10">
                Last Name:
                <input
                    onChange={(e) => setLastName(e.target.value)}
                    name="last_name"
                    type="text"
                    className="grow"
                    defaultValue={user?.last_name}
                    placeholder="Enter your last name..."
                />
            </label>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update your name"}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">Your name has been updated successfully!</p>}
        </form>
    );
};

export default UserNameChange;
