import { Link, Navigate } from "react-router";
import { logout } from "../../../Utils/useAuth";

const DashHeader = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    Navigate("/logout");
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-md fixed">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            VaccineHub
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-4">
            <Link to="/" className="btn btn-outline lg:btn-md sm:btn-xs">
              Home
            </Link>

            <Link
              onClick={handleLogout}
              className="btn btn-error text-white lg:btn-md sm:btn-xs"
            >
              Logout
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
