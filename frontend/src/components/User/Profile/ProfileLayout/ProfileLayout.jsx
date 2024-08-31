import { Outlet } from "react-router-dom";
import ProfileNav from "../ProfileNav/ProfileNav";

const ProfileLayout = () => {
  return (
    <div className="md:max-w-screen-lg mx-auto">
      <div className="flex">
        <div className="w-1/5">
          <ProfileNav></ProfileNav>
        </div>
        <div className="w-4/5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
