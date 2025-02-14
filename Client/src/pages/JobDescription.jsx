// import { useParams } from "react-router-dom";

const JobDescription = () => {
  // const { id } = useParams();
  const isApplied = true;

  return (
    <div className="mt-4 p-6 bg-white shadow-lg rounded-lg max-w-8xl mx-auto">
      <div className="sm:text-2xl text-xl font-bold text-red-500 mb-4">
        <p>Company Name</p>
      </div>

      <div className="space-y-4">
        <p className="sm:text-xl text-sm font-semibold">
          Job Title: <span className="font-normal">Software Engineer</span>
        </p>

        <p className="text-gray-700 sm:text-lg text-sm">
          We are looking for a passionate Software Engineer to join our team...
        </p>
        <p className="sm:text-lg text-sm font-semibold">
          Location: <span className="font-normal">Bangalore</span>
        </p>
        <p className="sm:text-lg text-sm font-semibold">
          Experience Required: <span className="font-normal">2-5 years</span>
        </p>
        <p className="sm:text-lg text-sm  font-semibold">
          Package: <span className="font-normal">6-12 LPA</span>
        </p>
        <p className="sm:text-lg text-sm  font-semibold">
          Number of Positions: <span className="font-normal">3</span>
        </p>

        <p className="sm:text-lg text-sm font-semibold">Skills Required:</p>
        <div className="flex flex-wrap gap-2">
          {["JavaScript", "React", "Node.js", "MongoDB", "Express"].map(
            (skill, index) => (
              <span
                key={index}
                className="px-3 py-1 mr-2 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mt-6 text-left">
        <button
          className={`sm:px-6 sm:py-2 px-4 py-2 text-white font-medium rounded-lg ${
            isApplied
              ? "bg-red-600 cursor-not-allowed opacity-60"
              : "bg-red-500 hover:bg-red-600 cursor-pointer"
          }`}
          disabled={isApplied}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobDescription;
