import { Link, Outlet } from "react-router";
import DashSidebar from "./DashSidebar";

const DoctorDashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="relative flex flex-grow">
        <div className="absolute top-8 md:relative md:w-64 flex-shrink-0">
          <DashSidebar />
        </div>
        <div className="flex-grow bg-gray-100">
          <Link to='/'>
          <h1 className="text-start mx-auto text-3xl md:text-4xl font-bold pl-40 md:pt-10">VacciHub</h1>
          </Link>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboardLayout;
