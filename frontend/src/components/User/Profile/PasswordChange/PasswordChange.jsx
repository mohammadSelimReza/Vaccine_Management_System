import { useState } from "react";
// import useAuth from "../../../../hooks/useAuth";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../../../../constants";
import useAuth from "../../../../context/useAuth";
import toast from "react-hot-toast";
const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {setIsAuth} = useAuth();
  const navigate = useNavigate();
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (password !== password2) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = api.put(`/user/update-password/`, {
        password: password,
        password2: password2,
      });

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError("Failed to change your password. Please try again.");
      }
    } catch (error) {
      setError(
        "An error occurred while changing your password. Please try again."
      );
    } finally {
      setLoading(false);
      toast.success("You have successfully changed your password.");
      navigate("/profile");
      // window.location.reload();
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="max-w-96 mx-auto">
      <h1 className="md:text-2xl font-bold text-center mb-10">
        Change Your Password
      </h1>
      <label className="input input-bordered flex items-center gap-2">
        <span className="text-sm w-32">New Password:</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          className="grow"
          placeholder="Enter a new password"
          value={password}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 my-10">
        <span className="text-xs w-30">Confirm New Password:</span>
        <input
          onChange={(e) => setPassword2(e.target.value)}
          name="password2"
          type="password"
          className="grow"
          placeholder="Confirm your new password"
          value={password2}
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Updating..." : "Update your password"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && (
        <p className="text-green-500 mt-4">
          Your password has been updated successfully!
        </p>
      )}
    </form>
  );
};

export default PasswordChange;
