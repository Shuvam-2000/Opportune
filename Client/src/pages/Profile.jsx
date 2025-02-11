import { ArrowLeftToLine } from "lucide-react";
import profile_image from "../assets/proifle_image.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);

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
    </>
  );
};

export default Profile;
