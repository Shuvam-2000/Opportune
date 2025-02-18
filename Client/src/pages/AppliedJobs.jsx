import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobs = () => {
  // state to store jobs applied by the user
  const [appliedJobs, setAppliedJobs] = useState([]);

  // error message in case books not avaliable
  const [errorMessage, setErrorMessage] = useState("");

  // fetching the jobs applied by the user from the backend
  useEffect(() => {
    const appliedJobData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/application/jobsapplied",
          {
            withCredentials: true,
          }
        );
        setAppliedJobs(res.data.applications);
      } catch (error) {
        setErrorMessage(error.res.data.message);
      }
    };
    appliedJobData();
  }, []);

  // in case loading fails
  if (!appliedJobs) {
    return (
      <p className="text-center text-gray-700 mt-50 text-lg font-bold">
        Loading Applied Jobs....
      </p>
    );
  }
  return (
    <>
      <Dashboard showProfile={false} />
      <div className="p-6">
        <h2 className="sm:text-2xl text-xl font-bold text-left text-black mt-4 border-b border-b-gray-300 py-2">
          Jobs Applied<span className="text-red-500"> By You—</span>
        </h2>
        {/* Display error message if no jobs found */}
        {errorMessage ? (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                <th className="border sm:px-2 sm:py-1 px-1 py-1 text-sm">Company</th>
                  <th className="border sm:px-2 sm:py-1 px-1 py-1 text-sm">Job Title</th>
                  <th className="border sm:px-2 sm:py-1 px-4 py-1 sm:text-sm text-xs">Application Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((appliedJob) => (
                  <tr key={appliedJob._id} className="text-center border">
                    <td className="border sm:px-2 sm:py-1 px-1 py-1 sm:text-sm text-xs">{appliedJob.job?.company?.companyName}</td>
                    <td className="border sm:px-2 sm:py-1 px-1 py-1 sm:text-sm text-xs">{appliedJob.job?.jobTitle}</td>
                    <td className="border sm:px-4 sm:py-1 px-1 py-1 text-sm">{appliedJob.applicationStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AppliedJobs;
