import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Hamburger Button for Small Screens */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Menu for large screens and toggleable on small screens */}
      <ul className={`menu bg-base-200 rounded-box w-56 ${isOpen ? 'block' : 'hidden'} lg:block`}>
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
                <Link to='/user/update/profile'>Edit Profile Info </Link>
              </li>
              <li>
                <Link to='/user/change/password'>Password Change</Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
