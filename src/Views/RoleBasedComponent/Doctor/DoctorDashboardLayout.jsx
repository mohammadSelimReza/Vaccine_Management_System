import { Outlet } from "react-router";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import DashSidebar from "./DashSidebar";

const DoctorDashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <DashHeader />

      {/* Main Content Section */}
      <main className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <DashSidebar />
        </div>

        {/* Main Content (Outlet) */}
        <div className="flex-grow p-6 bg-gray-100 md:pt-32">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <DashFooter />
    </div>
  );
};

export default DoctorDashboardLayout;
