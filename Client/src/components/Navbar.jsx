import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import profile_icon from "../assets/profile_icon.png";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  // state to show side menu bar for mobile view
  const [menuVisible, setMenuVisible] = useState(false);

  // state to handle profile menu
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  // store for handling the login button and proifle icon dynamically during user authentication
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  // user logout functionality
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/user/logout", {
        withCredentials: true,
      });
      dispatch(setUser(null));
      toast.success("Logged Out SuccessFully");
    } catch (error) {
      toast.error("Logout error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-300 relative">
      {/* Logo */}
      <h1 className="sm:text-3xl text-2xl font-bold text-black cursor-pointer">
        Oppor
        <span className="sm:text-3xl text-2xl font-bold text-red-600">
          tune
        </span>
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
        <NavLink to="/browse" className="group">
          <li className="py-1">BROWSE</li>
          <hr className="border-none outline-none h-0.5 bg-red-600 w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Profile Icon or Login Button */}
        {user ? (
          <img
            src={profile_icon}
            alt="profile-icon"
            className="sm:w-6 w-4 cursor-pointer"
            onClick={() => setProfileMenuVisible(!profileMenuVisible)}
          />
        ) : (
          <button
            className="sm:text-sm text-xs hidden sm:block font-medium bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {/* Profile Dropdown Menu */}
        {profileMenuVisible && (
          <div className="absolute right-0 mt-34 py-2 bg-white shadow-lg rounded-lg w-40 z-10">
            <ul className="flex flex-col text-gray-700">
              <NavLink
                to="/dashboard"
                className="px-4 py-2 hover:bg-gray-100 hover:text-red-500"
                onClick={() => setProfileMenuVisible(false)}
              >
                Your Dashboard
              </NavLink>
              <NavLink
                to="/"
                className="px-4 py-2 hover:bg-gray-100 hover:text-red-500"
                onClick={() => {
                  setProfileMenuVisible(false);
                  handleLogout();
                }}
              >
                Logout
              </NavLink>
            </ul>
          </div>
        )}

        {/* Side Menu Icon */}
        <AlignRight
          className="md:hidden cursor-pointer"
          size={20}
          onClick={() => setMenuVisible(!menuVisible)}
        />
      </div>

      {/* Sidebar for Mobile View */}
      <div
        className={`fixed top-0 right-0 h-95 bg-white rounded-b-lg shadow-lg transform transition-transform duration-500 ease-in-out ${
          menuVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ width: "100%" }}
      >
        <div className="flex flex-col text-gray-600 h-full gap-6 tracking-wider">
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
            Home
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
            to="/browse"
            onClick={() => setMenuVisible(false)}
          >
            Browse
          </NavLink>
          {user ? (
            ""
          ) : (
            <NavLink
              className="py-2 pl-6 text-center font-medium"
              to="/login"
              onClick={() => setMenuVisible(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
