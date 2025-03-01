import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { setUser } from "../store/authSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = ({ showProfile = true }) => {
  // fetching user information from the store
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // state to handle profile menu
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = useNavigate();

  // user logout functionality
  const handleLogout = async () => {
    try {
      const res = await axios.get("https://opportune-server.onrender.com/user/logout", {
        withCredentials: true,
      });
      dispatch(setUser(null));
      navigate("/");
      toast.success(res.data.message || "Logged Out SuccessFully");
    } catch (error) {
      toast.error("An Unexpected Error Occured", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-300 relative">
        {/* Username */}
        {user ? (
          <h1
            onClick={() => navigate("/dashboard")}
            className="sm:text-3xl text-2xl font-bold text-black cursor-pointer"
          >
            Hi,{" "}
            <span className="sm:text-3xl text-2xl font-bold text-red-600">
              {user.fullname}
            </span>
          </h1>
        ) : (
          <h1 className="sm:text-3xl text-2xl font-bold text-black cursor-pointer">
            Guest{" "}
            <span className="sm:text-3xl text-2xl font-bold text-red-600">
              User
            </span>
          </h1>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 cursor-pointer">
          <NavLink
            className="py-2 px-4 text-center font-medium rounded-md hover:text-red-500"
            to="/dashboard"
          >
            Your Profile
          </NavLink>
          <NavLink
            className="py-2 px-4 text-center font-medium rounded-md hover:text-red-500"
            to="/appliedjobs"
          >
            Applied Jobs
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition cursor-pointer"
          >
            <RiLogoutCircleLine className="text-lg" /> Logout
          </button>
        </div>

        {/* Side Menu Icon for Mobile */}
        <AlignRight
          className="md:hidden cursor-pointer"
          size={20}
          onClick={() => setMenuVisible(!menuVisible)}
        />
      </div>

      {/* Sidebar for Mobile View */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          menuVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "60%" }}
      >
        <div className="flex flex-col text-gray-600 h-full gap-6 p-6">
          {/* Close Button */}
          <button
            onClick={() => setMenuVisible(false)}
            className="self-start text-3xl text-black"
          >
            &times;
          </button>
          <NavLink
            className="py-2 text-center font-medium hover:text-red-500 text-black"
            to="/dashboard"
            onClick={() => setMenuVisible(false)}
          >
            Your Profile
          </NavLink>
          <NavLink
            className="py-2 mt-0 text-center font-medium hover:text-red-500 text-black"
            to="/appliedjobs"
            onClick={() => setMenuVisible(false)}
          >
            Applied Jobs
          </NavLink>
          <button
            onClick={() => {
              setMenuVisible(false);
              handleLogout();
            }}
            className="flex items-center gap-2 py-1 px-4 font-medium rounded-md bg-red-600 text-white hover:bg-red-600 transition cursor-pointer"
          >
            <RiLogoutCircleLine className="text-lg ml-5" /> Logout
          </button>
        </div>
      </div>
      {showProfile && <Profile />}
    </>
  );
};

export default Dashboard;
