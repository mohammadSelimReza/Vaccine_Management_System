import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <aside className="bg-base-200 h-96 flex flex-col">

      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Dashboard</div>
        <div className="collapse-content flex flex-col gap-4">
          <NavLink to='/dashboard' >Dashbord</NavLink>
          <NavLink to='/dashboard/user' >User</NavLink>
          <NavLink to='/dashboard/vaccine' >Vaccine</NavLink>
          <NavLink to='/dashboard/campaign' >Campaign</NavLink>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
            My Profile
        </div>
        <div className="collapse-content flex flex-col gap-4">
        <NavLink to='/dashboard/about' >About</NavLink>
        <NavLink to='/dashboard/change-name' >Change your name</NavLink>
        <NavLink to='/dashboard/update-bio' >Update Bio</NavLink>
        <NavLink to='/dashboard/change-password' >Change your password</NavLink>
        </div>
      </div>
    </aside>
  );
};

export default DashboardNav;
