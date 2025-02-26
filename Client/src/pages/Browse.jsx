import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";
import ScrollToTop from "../components/ScrollToTop"

const Browse = () => {
  // fetching all the jobs posted from the redux store
  useGetAllJobs(true); // Search filter applied
  const { alljobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <>
    <ScrollToTop />
    <div className="min-h-screen px-4 sm:px-8 py-4">
      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center text-sm py-4 sm:my-4 border-gray-300">
        <h1 className="text-center sm:text-3xl text-xl font-bold">
          Browsed<span className="text-red-500"> Jobs—</span>
        </h1>
      </div>

      {/* Search Results Heading */}
      <h1 className="text-sm sm:text-2xl font-semibold text-gray-700 mt-4 mb-4">
        Search Results:{" "}
        <span className="text-blue-500">({alljobs.length})</span>
      </h1>

      {/* Job Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full sm:mt-0 mt-10"
      >
        {alljobs.length > 0 ? (
          alljobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer sm:p-10 p-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-200"
            >
              {/* Job Info */}
              <div className="flex flex-col flex-grow sm:gap-1 gap-3">
                <h1 className="text-sm text-gray-700 font-medium mt-2 mb-4">
                  {job.jobTitle}
                </h1>
                <p className="text-sm text-gray-600">{job.jobDescription}</p>

                <div className="flex justify-between text-sm text-gray-500 font-medium mt-8 sm:gap-4 gap-4">
                  <span>Type: {job.jobType}</span>
                  <span>Package: {job.packageOffered}</span>
                  <span>Experience: {job.experience}</span>
                  <span>Positions: {job.openPositions}</span>
                </div>
                {/* Apply Button */}
                <button
                  onClick={() => navigate(`/jobdescription/${job._id}`)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg mt-6 sm:px-2 sm:py-2 px-20 py-2 transition-all duration-300 cursor-pointer"
                >
                  Check Details
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No jobs searched.</p>
        )}
      </motion.div>
    </div>
    </>
  );
};

export default Browse;
