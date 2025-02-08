import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ExploreJobs = () => {
  // state to show job filters
  const [showFilters, setShowFilters] = useState(false);

  // job array(will be replaced by actual API call)
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

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
      <div className="flex flex-col sm:flex-row sm:gap-12 mt-8">
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
                  type="radio"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Bangalore</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="radio"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Noida</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-600 cursor-pointer mt-2">
                <input
                  type="radio"
                  name="location"
                  className="h-3 w-3 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm">Pune</span>
              </label>
            </div>
          </div>
        </div>

        {/* Job Cards (Right) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full sm:mt-0 mt-10">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer sm:p-10 p-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-200"
              >
                {/* Job Info */}
                <div className="flex flex-col flex-grow sm:gap-1 gap-3">
                  <h1 className="text-lg mr-8 font-bold text-gray-900">
                    Company Name
                  </h1>
                  <p className="text-sm text-gray-600">
                    Short job description goes here.
                  </p>
                  <p className="text-sm text-gray-700 font-medium mt-4">
                    Job Title
                  </p>

                  <div className="flex justify-between text-sm text-gray-500 font-medium mt-6 sm:gap-0 gap-4">
                    <span>Job Type</span>
                    <span>Package</span>
                    <span>Experience</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg sm:px-6 sm:py-2 px-20 py-2 transition-all duration-300 cursor-pointer">
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No Jobs Available Now
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreJobs;
