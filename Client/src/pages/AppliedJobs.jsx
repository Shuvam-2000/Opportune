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
        setErrorMessage("You Have Not Applied To Any Jobs Till Now", error);
      }
    };
    appliedJobData();
  }, []);
  return (
    <>
      <Dashboard showProfile={false} />
      <div className="p-6">
        <h2 className="sm:text-2xl text-xl font-bold text-left text-black mt-4 border-b border-b-gray-300 py-2">
          Jobs Applied<span className="text-red-500"> By You—</span>
        </h2>
        {/* Jobs Applied By The User */}
      </div>
    </>
  );
};

export default AppliedJobs;
