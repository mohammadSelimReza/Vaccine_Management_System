import { Link, useNavigate } from "react-router-dom";
import BaseHeader from "../PartialComponent/BaseHeader";
import BaseFooter from "../PartialComponent/BaseFooter";
import { useState } from "react";
import { handleDoctorLogin, handlePatientLogin, login, setUser } from "../../Utils/useAuth";
import Toast from "../../plugin/useToast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      console.log(JSON.stringify({ username, password }));
      await login(username, password);
      Toast().fire({
        title: "You have logged in successfully",
        icon: "success",
      });

      setProcessing(false);
      navigate("/");
    } catch (error) {
      Toast().fire({
        title: `${error}`,
        icon: "error",
      });
      setProcessing(false);
    }
  };
  console.log(username,password);
  const handlePatient = async () => {
    console.log("patient");
    setUsername("srreza");
    setPassword("Django_project@2025");
    setProcessing(true);
    try {
      console.log(JSON.stringify({ username, password }));
      await handlePatientLogin();
      setProcessing(false);
      navigate("/");
    } catch (error) {
      Toast().fire({
        title: `${error}`,
        icon: "error",
      });
      setProcessing(false);
    }
  };
  console.log(username,password);
  const handleDoctor = async () => {
    // e.preventDefault();
    setProcessing(true);
    setUsername("mreza");
    setPassword("Django_project@2024");
    try {
      console.log(JSON.stringify({ username, password }));
      await handleDoctorLogin();
      setProcessing(false);
      navigate("/");
    } catch (error) {
      Toast().fire({
        title: `${error.response.data.detail}`,
        icon: "error",
      });
      setProcessing(false);
    }
  };
  return (
    <>
      <BaseHeader />

      <section className="container mx-auto flex flex-col items-center md:mt-32 min-h-screen">
        <div className="w-full max-w-md">
          <div className="card shadow-xl bg-base-100">
            <div className="card-body p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-1">Sign in</h1>
                <span>
                  Don’t have an account?{" "}
                  <Link
                    to="/patient/register"
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="username"
                    name="username"
                    className="input input-bordered w-full"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="**************"
                    required
                  />
                </div>

                {/* Remember me and forgot password */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberme"
                      className="checkbox checkbox-primary"
                      required
                    />
                    <label htmlFor="rememberme" className="ml-2">
                      Agree to login
                    </label>
                  </div>
                  <Link to="#" className="text-primary text-sm hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit button */}
                <div className="w-full">
                  <button type="submit" className="btn btn-primary w-full">
                    {processing ? (
                      <> logging... </>
                    ) : (
                      <>
                        Sign in <i className="fas fa-sign-in-alt ml-2"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-center md:mt-10">Test login</h5>
          <div className="flex flex-col gap-4 md:my-2">
            <button onClick={handleDoctor} className="btn btn-outline">
              Login as Doctor
            </button>
            <button onClick={handlePatient} className="btn btn-primary">
              Login as Patient
            </button>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Login;
