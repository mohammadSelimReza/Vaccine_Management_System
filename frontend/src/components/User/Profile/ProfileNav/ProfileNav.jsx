import { NavLink } from "react-router-dom";

const ProfileNav = () => {
    return (
        <div className="flex flex-col border-2">
            <NavLink to='/profile' >My Profile</NavLink>
            <NavLink to='/profile/update-name'>Change Your Name</NavLink>
            <NavLink to='/profile/update-bio'>Change Your Bio</NavLink>
            <NavLink to='/profile/change-password'>Change Your Password</NavLink>            
        </div>
    );
};

export default ProfileNav;