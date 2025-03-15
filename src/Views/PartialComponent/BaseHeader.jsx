import { Link, useNavigate } from "react-router";
import UserProfile from "../../plugin/UserProfile";
import { logout } from "../../Utils/useAuth";

const BaseHeader = () => {
  const { doctor, patient } = UserProfile();
  let role = " ";
  if (doctor == null) {
    role = patient;
  }
  if (patient == null) {
    role = doctor;
  }
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/logout");
  };
  const menu = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/vaccine/list">Vaccine</a>
      </li>
      <li>
        <a href="/campaign/list">Campaign</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </>
  );
  return (
    <>
      <div className="bg-base-200 shadow-md ">
        <div className="navbar  max-w-screen-xl mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {menu}
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl" href="/">
              Vaccine Hub
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">{menu}</ul>
          </div>

          <div className="navbar-end gap-4">
            {role ? (
              <>
                {role?.user_type == "doctor" ? (
                  <Link
                    to="/doctor/dashboard/state"
                    className="btn btn-outline lg:btn-md sm:btn-xs"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/user/profile"
                    className="btn btn-outline lg:btn-md sm:btn-xs"
                  >
                    {role?.user?.username}
                  </Link>
                )}
                <Link
                  onClick={handleLogout}
                  className="btn btn-error text-white lg:btn-md sm:btn-xs"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn bg-blue-600 text-white lg:btn-md sm:btn-xs"
                >
                  Login
                </Link>
                <Link
                  to="/patient/register"
                  className="btn bg-blue-600 text-white lg:btn-md sm:btn-xs"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseHeader;
