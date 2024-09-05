import { useState } from "react";
import IMAGES from "../../../Images/Images";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import toast from "react-hot-toast";
import useAuth from "../../../context/useAuth";
// import useAuth from "../../../context/useAuth";
const Login = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setIsAuth,setUser} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setIsAuth(true);  // Update authentication state
        setUser(res.data.user);  // Assuming user data is included in the response
        toast.success("You have logged in successfully.");
        setTimeout(() => {
          navigate("/"); // Redirect to the homepage after 3 seconds
          window.location.reload();
        }, 500); // Navigate to the home page or dashboard
      } else {
        navigate("/login");
        
      }
    } catch (error) {
      toast.error("Invalid username and password"); // Show a proper error message instead of an alert
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse md:w-2/3 md:mx-auto">
          <div className="text-center lg:text-left hidden md:block">
            <img src={IMAGES.image1} alt="first image" />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="text-center">
                {loading && (
                  <div className="text-center">
                    <span className="loading loading-spinner text-info"></span>
                  </div>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
