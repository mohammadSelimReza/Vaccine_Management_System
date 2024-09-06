import DashboardNav from "../DashboardNav/DashboardNav";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        
        {/* Main content section */}
        <div className="drawer-content flex-1">
          {/* The Open drawer button will only be visible on smaller screens */}
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          
          {/* Outlet for rendering the page content */}
          <Outlet />
        </div>
        
        {/* Sidebar */}
        <div className="drawer-side">
          {/* Close the drawer when clicking on overlay */}
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          
          {/* Sidebar content */}
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <DashboardNav />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
