import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div>
        <ul className="menu bg-base-200 rounded-box w-56">
            
          <li>
            <Link to='/user/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/user/vaccine/report'>Vaccine History</Link>
          </li>
          <li>
            <Link to='/user/capaign/report'>Campaign History</Link>
          </li>
          <li>
            <details open>
              <summary>Account Setting</summary>
              <ul>
                <li>
                  <Link to='/user/update/name'>Update your name </Link>
                </li>
                <li>
                  <Link to='/user/update/profile' >Edit Profile Info </Link>
                </li>
                <li>
                  <Link to='/user/change/password'>Password Change</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
