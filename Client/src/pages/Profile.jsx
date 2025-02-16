import { ArrowLeftToLine } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import profile_image from "../assets/proifle_image.webp";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // delete user profile fucntionality
  const handleProfileDelete = async () => {
    try {
      if (!user?._id) {
        return toast.error("User ID not found");
      }
      const res = await axios.delete(
        `http://localhost:4000/user/profiledelete/${user?._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message || "Profile Deleted SuccessFully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error Deleting User Proifle", error);
    }
  };

  // in case profile lading fails
  if (!user) {
    return (
      <p className="text-center text-gray-700 mt-50 text-lg font-bold">
        Loading profile...
      </p>
    );
  }

  return (
    <>
      {/* Back to Home page button */}
      <button className="border border-black mt-4 sm:py-2 sm:px-4 px-2 py-2 rounded-md hover:bg-red-500 text-sm transition-all duration-500 hover:text-white">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeftToLine size={20} />
          <span>Back to Home</span>
        </Link>
      </button>

      {/* Profile Content */}
      <div className=" border border-gray-300 shadow-lg rounded-lg max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 items-center md:items-start sm:gap-14">
        <div className="flex justify-center md:justify-start w-full md:w-auto cursor-pointer mt-10 sm:mt-12">
          <img
            src={profile_image}
            alt="Profile"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gray-500 object-cover"
          />
        </div>

        {/* User Information */}
        <div className="px-10 py-10 mt-6 md:mt-4 md:ml-10 text-left w-full max-w-lg">
          <div className="space-y-8">
            {" "}
            <p className="text-sm font-semibold text-gray-700">
              Name:{" "}
              <span className="text-gray-900 font-medium">{user.fullname}</span>
            </p>
            <p className="text-sm font-medium text-gray-700">
              Bio:{" "}
              <span className="text-gray-900 font-medium">
                {user.profile?.bio || "No bio available"}
              </span>
            </p>
            <p className="text-sm font-medium text-gray-700">
              Skills:{" "}
              <span className="text-gray-900 font-medium">
                {user.profile?.skills.join(" , ") || "No bio available"}
              </span>
            </p>
            <p className="text-sm font-medium text-gray-700">
              Resume:{" "}
              {user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user?.profile?.resumeOriginalName || "Download Resume"}
                </a>
              ) : (
                <span className="text-gray-900 font-medium">
                  No resume available
                </span>
              )}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              Email:{" "}
              <span className="text-gray-900 font-medium">{user.email}</span>
            </p>
            <p className="text-sm font-semibold text-gray-700">
              Phone Number:{" "}
              <span className="text-gray-900 font-medium">
                {user.phoneNumber || "Not provided"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 mb-4">
        <button onClick={() => navigate('/update-profile')} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm transition-all duration-500 flex items-center gap-2 cursor-pointer">
          <Pencil size={16} /> Edit Profile
        </button>
        <button
          onClick={handleProfileDelete}
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition-all duration-500 flex items-center gap-2 cursor-pointer"
        >
          <Trash2 size={16} /> Delete Profile
        </button>
      </div>
    </>
  );
};

export default Profile;
