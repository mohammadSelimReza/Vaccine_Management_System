import { NavLink } from "react-router-dom";

const ProfileNav = () => {
  return (
    <aside className="flex flex-col border border-gray-300 rounded-lg p-6 bg-white shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>
      <NavLink
        className="mb-4 text-lg text-gray-600 hover:text-blue-600 hover:font-medium transition duration-200"
        to="/profile"
        activeClassName="font-semibold text-blue-600 border-l-4 border-blue-600 pl-2"
      >
        Personal Information
      </NavLink>
      <NavLink
        className="mb-4 text-lg text-gray-600 hover:text-blue-600 hover:font-medium transition duration-200"
        to="/profile/update-name"
        activeClassName="font-semibold text-blue-600 border-l-4 border-blue-600 pl-2"
      >
        Change Your Name
      </NavLink>
      <NavLink
        className="mb-4 text-lg text-gray-600 hover:text-blue-600 hover:font-medium transition duration-200"
        to="/profile/update-bio"
        activeClassName="font-semibold text-blue-600 border-l-4 border-blue-600 pl-2"
      >
        Change Your Bio
      </NavLink>
      <NavLink
        className="mb-4 text-lg text-gray-600 hover:text-blue-600 hover:font-medium transition duration-200"
        to="/profile/change-password"
        activeClassName="font-semibold text-blue-600 border-l-4 border-blue-600 pl-2"
      >
        Change Your Password
      </NavLink>            
    </aside>
  );
};

export default ProfileNav;
