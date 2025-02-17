import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExploreJobs = () => {
  // state to show job filters
  const [showFilters, setShowFilters] = useState(false);

  // fetching all the jobs posted from the redux store
  const { alljobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 sm:px-8 py-4">
      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center text-sm py-4 sm:my-4 border-gray-300">
        <h1 className="text-center sm:text-3xl text-xl font-bold">
          Explore<span className="text-red-500"> Jobs—</span>
        </h1>
        <p className="text-center text-gray-500 sm:text-sm text-xs max-w-2xl mt-4">
          Discover exciting job opportunities that match your skills and
          ambitions. Start your career journey today!
        </p>
      </div>

      {/* Job Listings & Filters */}
      <div className="flex flex-col sm:flex-row sm:gap-4 mt-8">
        {/* Job Filter (Left) */}
        <div className="w-full sm:w-1/3">
          <button
            className="sm:hidden flex items-center justify-between w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="font-medium">Filter Jobs</span>
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Filter Section */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } sm:block mt-4 sm:mt-0`}
          >
            <div className="border border-gray-300 bg-white shadow-md rounded-lg p-4 w-56">
              <h1 className="text-md font-medium text-gray-700 mb-3">
                Job Location :
              </h1>

              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Bangalore</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Noida</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Pune</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Delhi NCR</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Kolkata</span>
              </label>
            </div>

            {/* Job Role Filter */}
            <div className="border border-gray-300 bg-white shadow-md rounded-lg p-4 w-56 mt-4">
              <h1 className="text-md font-medium text-gray-700 mb-3">
                Job Role :
              </h1>

              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Frontend Developer</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Software Developer</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Software Enginner</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Backend Developer</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">UI/UX Designer</span>
              </label>
            </div>

            {/* Job Type */}
            <div className="border border-gray-300 bg-white shadow-md rounded-lg p-4 w-56 mt-4">
              <h1 className="text-md font-medium text-gray-700 mb-3">
                Job Type :
              </h1>

              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Full Time</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Part Time</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Internship</span>
              </label>
            </div>
          </div>
        </div>

        {/* Job Cards (Right) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full sm:mt-0 mt-10">
          {alljobs.length > 0 ? (
            alljobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer sm:p-10 p-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-200"
              >
                {/* Job Info */}
                <div className="flex flex-col flex-grow sm:gap-1 gap-3">
                  <h1 className="text-lg mr-8 font-bold text-gray-900">
                    {job.company?.companyName}
                  </h1>
                  <p className="text-sm text-gray-700 font-medium mt-2 mb-4">
                    {job.jobTitle}
                  </p>
                  <p className="text-sm text-gray-600">{job.jobDescription}</p>

                  <div className="flex flex-wrap justify-between text-sm text-gray-500 font-medium mt-8 gap-4">
                    <span className="w-full sm:w-auto">
                      Type: {job.jobType || "Not Disclosed"}
                    </span>
                    <span className="w-full sm:w-auto">
                      Package: {job.packageOffered || "Not Disclosed"}
                    </span>
                    <span className="w-full sm:w-auto">
                      Exp: {job.experience}
                    </span>
                    <span className="w-full sm:w-auto">
                      Positions: {job.openPositions || "Not Disclosed"}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => navigate(`/jobdescription/${job._id}`)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg sm:px-6 sm:py-2 px-20 py-2 transition-all duration-300 cursor-pointer"
                >
                  Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center mt-20 col-span-full text-gray-500">
              No Jobs Available Now
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreJobs;
