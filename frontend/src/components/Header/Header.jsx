import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import api from "../../api";
import IMAGES from "../../Images/Images";
import useAuth from "../../context/useAuth";
const Header = () => {
  const { isAuth, user, setIsAuth, navigate, doctorData, patientData } =
    useAuth();

  const handleLogout = () => {
    api.post("/user/logout/");
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuth(false);
    navigate("/");
    window.location.reload();
  };
  const link = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/vaccine">Vaccine List</NavLink>
      </li>
      <li>
        <NavLink to="/campaign">Campaign</NavLink>
      </li>
      <li>
        {isAuth && (
          <details className="dropdown relative">
            <summary className="cursor-pointer">
              {patientData ? "History" : "Add"}
            </summary>
            <ul className="dropdown-content absolute bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-52 p-2 z-10">
              {patientData ? (
                <>
                  <li className="hover:bg-gray-100 rounded-md">
                    <NavLink
                      to="/vaccine/report"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Vaccine Report
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-100 rounded-md">
                    <NavLink
                      to="/campaign/report"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Campaign Report
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:bg-gray-100 rounded-md">
                    <NavLink
                      to="/vaccine/edit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Add Vaccine
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-100 rounded-md">
                    <NavLink
                      to="/campaign/edit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      Add Campaign
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </details>
        )}
      </li>
    </>
  );
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dofqxmuya/";
  const imageUrl = patientData?.user_photo
    ? `${cloudinaryBaseUrl}${patientData.user_photo}`
    : IMAGES.image6;

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <NavLink to="/">VaccineHub</NavLink>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end">
          {isAuth && patientData ? (
            <>
              <NavLink
                className="border-l-neutral-400 border-4 rounded-full mr-4"
                to="/profile"
              >
                {" "}
                <img
                  src={
                    patientData?.user_photo ||
                    "https://res.cloudinary.com/dofqxmuya/image/upload/v1725378249/default_user_i0wpzv.png"
                  }
                  className="w-10 h-10 rounded-full"
                  alt=""
                />{" "}
              </NavLink>
            </>
          ) : null}
          {isAuth && doctorData ? (
            <>
              <NavLink
                className="border-l-neutral-400 border-4 rounded-full mr-4"
                to="/dashboard"
              >
                {" "}
                <img
                  src={
                    doctorData?.user_photo ||
                    "https://res.cloudinary.com/dofqxmuya/image/upload/v1725378249/default_user_i0wpzv.png"
                  }
                  className="w-10 h-10 rounded-full"
                  alt=""
                />{" "}
              </NavLink>
            </>
          ) : null}

          {isAuth ? (
            <button
              onClick={handleLogout}
              type="submit"
              className="btn btn-error text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="btn btn-outline btn-primary mr-4"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Sign Up
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div className="flex gap-20">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="w-80 h-80"
                        src={IMAGES.image4}
                        alt="doctor"
                      />
                      <NavLink
                        className="btn btn-info text-white"
                        to="/registration/doctor"
                        onClick={() =>
                          document.getElementById("my_modal_1").close()
                        }
                      >
                        Register as doctor?
                      </NavLink>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="w-80 h-80"
                        src={IMAGES.image5}
                        alt="patient"
                      />
                      <NavLink
                        className="btn btn-info text-white"
                        to="/registration/patient"
                        onClick={() =>
                          document.getElementById("my_modal_1").close()
                        }
                      >
                        Register as patient?
                      </NavLink>
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
              <NavLink to="/login" className="btn btn-info">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
