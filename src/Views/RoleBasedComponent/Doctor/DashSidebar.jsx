import { useState, useEffect } from "react";
import { FaTachometerAlt, FaTable, FaChartBar, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useUserProfile from "../../../plugin/UserProfile";
import { logout } from "../../../Utils/useAuth";

const DashSidebar = () => {
  const { doctor } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/logout");
  };
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar") && !event.target.closest(".hamburger-btn")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);
  console.log(doctor);
  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-ghost btn-circle hamburger-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </div>

      {/* Overlay (for closing when clicking outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile) */}
      <div
        className={`sidebar fixed inset-y-0 left-0 w-64 h-full bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button (Mobile Only) */}
        <div className="flex justify-end p-3 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-lg"
          >
            ✖
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-5 flex items-center space-x-3 border-b border-gray-700">
          <img
            src={doctor?.user_photo}
            alt="User"
            className="w-10 h-10 rounded-full border border-gray-500"
          />
          <div>
            <h2 className="text-sm font-semibold">
              {doctor?.user?.first_name} {doctor?.user?.last_name}
            </h2>
            <p className="text-xs text-gray-400">Welcome</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-2 space-y-2">
          <ul>
            <li onClick={() => setIsOpen(false)}>
              <Link
                className="flex items-center space-x-2 p-2 rounded bg-gray-800 hover:bg-gray-700"
                to="/doctor/dashboard/state"
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
                to="/doctor/dashboard/vaccine/report"
              >
                <FaTable />
                <span>Vaccine Report</span>
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link
                to="/doctor/dashboard/campaign/report"
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
              >
                <FaChartBar />
                <span>Campaign Report</span>
              </Link>
            </li>

            {/* Account Settings Dropdown */}
            <li className="p-2 rounded hover:bg-gray-700">
              <details className="group">
                <summary className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
                  <FaUsers />
                  <span>Account Settings</span>
                </summary>
                <ul className="mt-2 ml-6 space-y-2 text-gray-300 text-sm">
                  <li onClick={() => setIsOpen(false)} className="hover:text-white">
                    <Link to="/doctor/dashboard/doctor/profile">Profile</Link>
                  </li>
                  <li onClick={() => setIsOpen(false)} className="hover:text-white">
                    <Link to="/doctor/dashboard/doctor/name/update">Update Name</Link>
                  </li>
                  <li onClick={() => setIsOpen(false)} className="hover:text-white">
                    <Link to="/doctor/dashboard/doctor/bio/update">Update Bio</Link>
                  </li>
                  <li onClick={() => setIsOpen(false)} className="hover:text-white">
                    <Link to="/doctor/dashboard/doctor/pass/update">Change Password</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="menu menu-horizontal px-1 gap-4">
            <Link to="/" className="btn btn-info lg:btn-md sm:btn-xs">
              Home
            </Link>

            <Link
              onClick={handleLogout}
              className="btn btn-error text-white lg:btn-md sm:btn-xs"
            >
              Logout
            </Link>
          </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DashSidebar;
