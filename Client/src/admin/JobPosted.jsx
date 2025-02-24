import { useNavigate } from "react-router-dom";
import { ArrowLeftToLine, SquarePlus } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Eye } from 'lucide-react';

const JobPosted = () => {
  const navigate = useNavigate();
  const { alljobs } = useSelector((store) => store.job); // Fetch all jobs from Redux
  const { user } = useSelector((store) => store.auth); // Fetch logged-in user

  // Filter jobs created by the logged-in user
  const userCreatedJobs = alljobs.filter((job) => job.jobcreated_by === user._id);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="flex flex-row sm:flex-row justify-between items-center sm:gap-4 gap-16">
          <button
            onClick={() => navigate("/admin/companies")}
            className="bg-red-500 flex items-center gap-2 text-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow-md hover:bg-red-600 cursor-pointer w-full sm:w-auto"
          >
            <ArrowLeftToLine size={18} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/create-job")}
            className="bg-blue-500 flex items-center gap-3 text-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow-md hover:bg-blue-600 cursor-pointer w-full sm:w-auto"
          >
            <SquarePlus size={18} />
            New Job
          </button>
        </div>

        {/* Jobs Table */}
        <div className="border rounded-lg shadow-md p-4 mt-6 bg-white">
          <div className="w-full overflow-x-auto mt-4">
            <table className="w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left">
                  <th className="px-4 py-3 text-sm">Job Title</th>
                  <th className="px-4 py-3 text-sm">Location</th>
                  <th className="px-4 py-3 text-sm">Job Created</th>
                  <th className="px-4 py-3 text-sm w-32 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {userCreatedJobs.length > 0 ? (
                  userCreatedJobs.map((job) => (
                    <tr key={job._id} className="bg-gray-50 even:bg-gray-100 text-left border-b">
                      <td className="px-4 py-3 text-sm">{job.jobTitle}</td>
                      <td className="px-4 py-3 text-sm">{job.jobLocation}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(job.createdAt).toISOString().split("T")[0]}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className="bg-red-500 items-center flex gap-2 text-white px-3 py-1 text-xs sm:text-sm rounded-md shadow-md hover:bg-red-600 transition cursor-pointer"
                          onClick={() => navigate(`/applicants/${job._id}`)}
                        >
                          <Eye size={15} />
                          Applicants
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No jobs created yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobPosted;
