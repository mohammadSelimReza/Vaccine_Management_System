import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import api from "../../api";
import useAuth from "../../hooks/useAuth";
import IMAGES from "../../Images/Images";
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
          <details className="dropdown">
            {patientData ? (
              <summary className="btn m-1">History</summary>
            ) : (
              <summary className="btn m-1">Edit/Add</summary>
            )}
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {patientData ? (
                <>
                  <li>
                    <NavLink to="/vaccine/report">Vaccine Report</NavLink>
                  </li>
                  <li>
                    <NavLink to="/campaign/report">Campaign Report</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/vaccine/edit">Edit Vaccine</NavLink>
                  </li>
                  <li>
                    <NavLink to="/campaign/edit">Edit Campaign</NavLink>
                  </li>
                </>
              )}
            </ul>
          </details>
        )}
      </li>
    </>
  );
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
            <NavLink to='/'>VaccineHub</NavLink>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end">
          {isAuth ? (
            <>
              <NavLink className='btn mr-4'  to="/profile"> <img src={patientData?.user_photo || doctorData?.user_photo} className="w-10 h-10" alt="" /> </NavLink>
              <button onClick={handleLogout} type="submit" className="btn btn-error text-white">
                Logout
              </button>
            </>
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
                      className='btn btn-info text-white'
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
                      className='btn btn-info text-white'
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
