import { FaTachometerAlt, FaTable, FaChartBar, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserProfile from "../../../plugin/UserProfile";

const DashSidebar = () => {
  const { doctor } = useUserProfile();

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      {/* Profile Section */}
      <div className="p-5 flex items-center space-x-3 border-b border-gray-700">
        <img
          src={doctor?.user?.image}
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

      {/* Search Input */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Type to search..."
          className="w-full px-3 py-2 text-sm bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="p-2 space-y-2">
          {/* Dashboard Link */}
          <li>
            <Link
              className="flex items-center space-x-2 p-2 rounded bg-gray-800 hover:bg-gray-700"
              to="/doctor/dashboard/state"
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Vaccine Report */}
          <li>
            <Link
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
              to="/doctor/dashboard/vaccine/report"
            >
              <FaTable />
              <span>Vaccine Report</span>
            </Link>
          </li>

          {/* Campaign Report */}
          <li>
            <Link
              to="/doctor/dashboard/campaign/report"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              <FaChartBar />
              <span>Campaign Report</span>
            </Link>
          </li>

          {/* Account Settings (Dropdown) */}
          <li className="p-2 rounded hover:bg-gray-700">
            <details className="group">
              <summary className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
                <FaUsers />
                <span>Account Settings</span>
              </summary>
              <ul className="mt-2 ml-6 space-y-2 text-gray-300 text-sm">
                <li className="hover:text-white">
                  <Link to='/doctor/dashboard/doctor/profile' href="#">Profile</Link>
                </li>
                <li className="hover:text-white">
                  <a href="/doctor/dashboard/doctor/name/update">Update Name</a>
                </li>
                <li className="hover:text-white">
                  <Link to='/doctor/dashboard/doctor/bio/update' href="#">Update Bio</Link>
                </li>
                <li className="hover:text-white">
                  <a href="/doctor/dashboard/doctor/pass/update">Change Password</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashSidebar;
