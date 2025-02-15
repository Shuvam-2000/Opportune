import Dashboard from "./Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react";
import { setUser } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  
  // state to handle user information
  const [updateInfo, setUpdateInfo] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills ? user?.profile?.skills.join(" , ") : "",
    resume: user?.profile?.resume || ""
  });

  // implementing the onchange function for other fields uploads
  const changeInfoHandler = (e) => {
    setUpdateInfo({...updateInfo, [e.target.name]: e.target.value})
  };

  // implementing the file handling function for file uploads
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setUpdateInfo({...updateInfo, file})
  };

  // update user information functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("fullname", updateInfo.fullname);
    formData.append("email", updateInfo.email);
    formData.append("phoneNumber", updateInfo.phoneNumber);
    formData.append("bio", updateInfo.bio);
    formData.append("skills", updateInfo.skills)
    if(updateInfo.file){
      formData.append("file", updateInfo.file)
    }
    if (!user?._id) {
      return toast.error("User ID not found");
    }
    try {
      const res = await axios.put(`http://localhost:4000/user/profileupdate/${user?._id}`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile Updated SucessFully")
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response.message)
    }
  };
  return (
    <>
      <Dashboard showProfile={false} />

      {/* Back to Profile button */}
      <div className="mt-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 border border-black px-4 py-2 rounded-md hover:bg-red-500 text-sm transition-all duration-300 hover:text-white"
        >
          <ArrowLeftToLine size={20} />
          <span>Go Back To Profile</span>
        </Link>
      </div>

      {/* Profile Update Form */}
      <div className="max-w-2xl mx-auto mt-4 mb-10 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
        <h2 className="sm:text-2xl text-xl font-bold text-center">Update Your Profile —</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="fullname"
            onChange={changeInfoHandler}
            value={updateInfo.fullname}
            className="border sm:p-3 p-2 text-sm w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="phoneNumber"
            onChange={changeInfoHandler}
            value={updateInfo.phoneNumber}
            className="border sm:p-3 p-2 text-sm w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Phone Number"
          />
          <input
            type="email"
            name="email"
            onChange={changeInfoHandler}
            value={updateInfo.email}
            className="border sm:p-3 p-2 text-sm w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />
          <textarea
            name="bio"
            onChange={changeInfoHandler}
            value={updateInfo.bio}
            className="border sm:p-3 p-2 text-sm w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Bio"
          ></textarea>
          <input
            type="text"
            name="skills"
            onChange={changeInfoHandler}
            value={updateInfo.skills}
            className="border sm:p-3 p-2 text-sm w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Skills (comma separated)"
          />

          {/* Proifle Picture & Resume Update Field */}
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={changeFileHandler}
            className="border sm:p-3 p-2 text-sm w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white sm:px-4 sm:py-3 px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
