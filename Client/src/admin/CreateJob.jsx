import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const CreateJob = () => {
  const navigate = useNavigate();
  const [newCreatedJob, setNewCreatedJob] = useState({
    jobTitle: "",
    jobDescription: "",
    jobRequirements: "",
    packageOffered: "",
    jobLocation: "",
    jobType: "",
    openPositions: "",
    experience: "",
  });

  // fetch all companies data from the redux store
  const { allcompanies } = useSelector((store) => store.company);

  const handleJobData = (e) => {
    setNewCreatedJob({
      ...newCreatedJob,
      [e.target.name]: e.target.value,
    });
  };

  // functionality to create new job
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://opportune-server.onrender.com/jobs/newjobs",
        newCreatedJob,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Job Created");
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.res?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 mb-4 p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Add New Job —</h2>

        <form onSubmit={handleOnSubmit} className="grid sm:grid-cols-3 gap-6">
          {/* Job Role */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Job Role</label>
            <input
              type="text"
              name="jobTitle"
              value={newCreatedJob.jobTitle}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black"
              placeholder="Add Job Role"
            />
          </div>

          {/* Job Type */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Job Type</label>
            <input
              type="text"
              name="jobType"
              value={newCreatedJob.jobType}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black"
              placeholder="Full-time, Part-time, etc."
            />
          </div>

          {/* Job Location */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Job Location</label>
            <input
              type="text"
              name="jobLocation"
              value={newCreatedJob.jobLocation}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black"
              placeholder="Add Job Location"
            />
          </div>

          {/* Package Offered */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Package Offered</label>
            <input
              type="text"
              name="packageOffered"
              value={newCreatedJob.packageOffered}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black"
              placeholder="Salary Package"
            />
          </div>

          {/* Open Positions */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Positions Open</label>
            <input
              type="text"
              name="openPositions"
              value={newCreatedJob.openPositions}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black"
              placeholder="Number of openings"
            />
          </div>

          {/* Experience Required */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">
              Experience Required
            </label>
            <input
              type="text"
              name="experience"
              value={newCreatedJob.experience}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black"
              placeholder="Years of Experience"
            />
          </div>

          {/* Skills Required */}
          <div className="flex flex-col col-span-2">
            <label className="mb-2 text-sm font-medium">Skills Required</label>
            <input
              type="text"
              name="jobRequirements"
              value={newCreatedJob.jobRequirements}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black"
              placeholder="Add Skills Required"
            />
          </div>

          {/* Job Description */}
          <div className="flex flex-col col-span-2">
            <label className="mb-2 text-sm font-medium">Job Description</label>
            <textarea
              name="jobDescription"
              value={newCreatedJob.jobDescription}
              onChange={handleJobData}
              className="border p-2 text-sm w-full rounded hover:border-black h-24"
              placeholder="Add Job Description"
            />
          </div>
          {/* Buttons */}
          <div className="col-span-2 mt-6 text-center flex justify-center items-center gap-4 sm:ml-35">
            {allcompanies.length === 0 ? (
              <p className="text-sm text-gray-700">
                You need to register a company to create a job.{" "}
                <span
                  className="text-red-500 underline cursor-pointer"
                  onClick={() => navigate("/admin/register-company")}
                >
                  Create a company
                </span>
              </p>
            ) : (
              <>
                <button
                  onClick={() => navigate("/admin/jobs")}
                  type="button"
                  className="border p-2 text-sm w-full rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border p-2 text-sm w-full rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateJob;
