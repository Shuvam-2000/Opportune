import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { alljobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

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
        {alljobs?.length > 0 ? (
          alljobs.slice(0, 6).map((job) => (
            <div
              key={job._id}
              className="rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 hover:bg-gray-50 cursor-pointer p-8 flex flex-col items-center text-center py-12"
            >
              <p className="text-lg font-bold mb-2 text-gray-900">
                {job.company?.companyName}
              </p>

              <div className="mt-6 py-2 w-full">
                <p className="text-sm font-semibold text-black sm:mb-6 mb-4">
                  {job.jobTitle}
                </p>
                <p className="text-xs text-gray-500 font-medium sm:mb-6 mb-4">
                  {job.jobDescription}
                </p>

                <div className="flex gap-4 justify-center">
                  <p className="text-xs text-black font-medium mb-4">
                    Type: {job.jobType || ""}
                  </p>
                  <p className="text-xs text-black font-medium mb-4">
                    Salary: {job.packageOffered || "Not Disclosed"}
                  </p>
                  <p className="text-xs text-black font-medium mb-4">
                    Exp: {job.experience}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/jobdescription/${job._id}`)}
                  className="w-full text-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 transition-all duration-300 cursor-pointer"
                >
                  Check Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No job openings available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
