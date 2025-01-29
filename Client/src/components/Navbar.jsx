import { NavLink } from "react-router-dom";
import profile_icon from "../assets/profile_icon.png";
import menu_icon from "../assets/menu_icon.png";
import { useState } from "react";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-300 relative">
      {/* Logo */}
      <h1 className="sm:text-3xl text-2xl font-bold text-black cursor-pointer">
        Oppor<span className="sm:text-3xl text-2xl font-bold text-red-600">tune</span>
      </h1>

      {/* Navigation Links */}
      <ul className="hidden md:flex justify-evenly mt-2 gap-5 font-medium">
        <NavLink to="/" className="group">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-red-600 w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
        <NavLink to="/explorejobs" className="group">
          <li className="py-1">EXPLORE JOBS</li>
          <hr className="border-none outline-none h-0.5 bg-red-600 w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
        <NavLink to="/companies" className="group">
          <li className="py-1">COMPANIES</li>
          <hr className="border-none outline-none h-0.5 bg-red-600 w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Profile Icon */}
        <img src={profile_icon} alt="profile-icon" className="sm:w-6 w-4
         cursor-pointer" onClick={() => setProfileMenuVisible(!profileMenuVisible)} />

         {/* Profile Dropdown Menu */}
        {profileMenuVisible && (
          <div className="absolute right-0 mt-38 bg-white shadow-lg rounded-lg w-40 z-10">
            <ul className="flex flex-col text-gray-700">
              <NavLink to="/" className="px-4 py-2 hover:bg-gray-100 hover:text-red-500" onClick={() => setProfileMenuVisible(false)}>Profile</NavLink>
              <NavLink to="/" className="px-4 py-2 hover:bg-gray-100 hover:text-red-500" onClick={() => setProfileMenuVisible(false)}>Jobs</NavLink>
              <button className="px-4 py-2 text-left w-full hover:bg-gray-100 hover:text-red-500" onClick={() => setProfileMenuVisible(false)}>Logout</button>
            </ul>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <img
          src={menu_icon}
          alt="menu-icon"
          className="sm:w-5 w-4 cursor-pointer md:hidden text-[#f9755b]"
          onClick={() => setMenuVisible(!menuVisible)}
        />
      </div>

      {/* Sidebar for Mobile View */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          menuVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "80%" }}
      >
        <div className="flex flex-col text-gray-600 h-full gap-6">
          {/* Close Button */}
          <button
            onClick={() => setMenuVisible(false)}
            className="self-start p-4 text-3xl text-black sm:block"
          >
            &times;
          </button>
          {/* Sidebar Links */}
          <NavLink
            className="py-2 pl-6 text-center font-medium"
            to="/"
            onClick={() => setMenuVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 text-center font-medium"
            to="/explorejobs"
            onClick={() => setMenuVisible(false)}
          >
            Explore Jobs
          </NavLink>
          <NavLink
            className="py-2 pl-6 text-center font-medium"
            to="/companies"
            onClick={() => setMenuVisible(false)}
          >
            Companies
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
