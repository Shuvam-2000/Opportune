import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSingleJob } from "../store/jobSlice";
import toast from "react-hot-toast";
import ScrollToTop from "../components/ScrollToTop";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // state for handling error messages if job info not avaliable
  const [errorMessage, setErrorMessage] = useState("");

  // fetching user from redux sotre
  const { user } = useSelector((store) => store.auth);

  // fetching single job info from the redux store
  const { singlejob } = useSelector((store) => store.job);

  // fucntionality to show job apply state for every user
  const isApplied =
    singlejob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  // state to handlejob apply state for user dynamically
  const [alreadyApplied, setAlreadyApllied] = useState(isApplied);

  // fucntionality to apply in a job
  const applyToJob = async () => {
    try {
      const res = await axios.get(
        `https://opportune-server.onrender.com/application/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAlreadyApllied(true);
        // Update Redux store to reflect application state(for real time UI update)
        dispatch(
          setSingleJob({
            ...singlejob,
            applications: [
              ...(singlejob?.applications || []),
              { applicant: user?._id },
            ],
          })
        );
        toast.success(res.data.message || "Applied to the Job Successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // functionality to fetch job information with its id
  useEffect(() => {
    const getSingleAllJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/jobs/${jobId}`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          dispatch(setSingleJob(res.data.job));
          setAlreadyApllied(
            res?.data?.job?.applications.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        setErrorMessage(error.res?.data?.message || "Something Went Wrong");
      }
    };
    getSingleAllJobs();
  }, [jobId, dispatch, user?._id]);

  // show error message in case job information not avaliable
  if (errorMessage) {
    return (
      <p className="text-center text-gray-700 mt-50 text-lg font-bold">
        {errorMessage}
      </p>
    );
  }

  return (
    <>
    <ScrollToTop />
      <div className="mt-4 p-6 bg-white shadow-lg rounded-lg max-w-8xl mx-auto">
        <div className="sm:text-2xl text-xl font-bold text-black mb-4">
          {singlejob?.jobTitle}
        </div>

        <div className="space-y-4">
          <p className="text-gray-700 sm:text-lg text-sm">
            {singlejob?.jobDescription}
          </p>
          <p className="sm:text-lg text-sm font-semibold">
            Location:{" "}
            <span className="font-normal">{singlejob?.jobLocation}</span>
          </p>
          <p className="sm:text-lg text-sm font-semibold">
            Experience Required:{" "}
            <span className="font-normal">{singlejob?.experience}</span>
          </p>
          <p className="sm:text-lg text-sm  font-semibold">
            Package:{" "}
            <span className="font-normal">
              {singlejob?.packageOffered || "Not Disclosed"}
            </span>
          </p>
          <p className="sm:text-lg text-sm  font-semibold">
            Number of Positions:{" "}
            <span className="font-normal">{singlejob?.openPositions}</span>
          </p>
          <p className="sm:text-lg text-sm  font-semibold">
            Total Applicants:{" "}
            <span className="font-normal">
              {singlejob?.applications?.length > 0
                ? singlejob?.applications?.length
                : 0}
            </span>
          </p>
          <p className="sm:text-lg text-sm  font-semibold">
            Job Posted:{" "}
            <span className="font-normal">
              {singlejob?.createdAt.split("T")[0]}
            </span>
          </p>

          <p className="sm:text-lg text-sm font-semibold">Skills Required:</p>
          <div className="flex flex-wrap gap-4 mt-2">
            {" "}
            {/* Added gap-4 for better spacing */}
            {singlejob?.jobRequirements?.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {skill.trim()}{" "}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 text-left">
          <button
            onClick={alreadyApplied ? null : applyToJob}
            className={`sm:px-6 sm:py-2 px-4 py-2 text-white font-medium rounded-lg ${
              alreadyApplied
                ? "bg-red-600 cursor-not-allowed opacity-60"
                : "bg-red-500 hover:bg-red-600 cursor-pointer"
            }`}
            disabled={alreadyApplied}
          >
            {alreadyApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
