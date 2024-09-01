import { Outlet } from "react-router-dom";
import ProfileNav from "../ProfileNav/ProfileNav";

const ProfileLayout = () => {
  return (
    <div className="md:max-w-screen-lg mx-auto">
      <div className="flex">
        <div className="w-2/6 mt-20">
          <ProfileNav></ProfileNav>
        </div>
        <div className="w-4/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
