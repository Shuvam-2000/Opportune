const LatestJobs = () => {
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="mt-8 px-4">
      <h1 className="sm:text-2xl text-xl font-bold text-center mb-2">
        Latest <span className="text-red-500">Job Openings—</span>
      </h1>
      <p className="text-center text-gray-500 sm:text-sm text-xs mb-8">
          Discover exciting & latest job opportunities that match your skills 
        </p>

      {/* Job Postings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.slice(0, 6).map((job) => (
          <div
            key={job}
            className=" rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 hover:bg-gray-50 cursor-pointer p-6 flex flex-col items-center text-center py-10"
          >
            <p className="text-lg font-semibold text-gray-700">Job #{job}</p>

            <div className="mt-4 w-full">
              <p className="text-sm font-bold mb-2 text-gray-900">
                Company Name
              </p>
              <p className="text-xs text-gray-500 font-medium mb-4">
                Short job description goes here.
              </p>
              <p className="text-xs text-gray-500 font-medium mb-4">
                Job Title
              </p>
              <div className="flex gap-4 justify-center">
                <p className="text-xs text-gray-500 font-medium mb-4">
                  Job type
                </p>
                <p className="text-xs text-gray-500 font-medium mb-4">
                  Package
                </p>
                <p className="text-xs text-gray-500 font-medium mb-4">
                  Experience
                </p>
              </div>
              <button className="w-full text-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 transition-all duration-300 cursor-pointer">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
