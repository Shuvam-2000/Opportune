const LatestJobs = () => {
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="mt-4">
      <h1 className="sm:text-2xl text-xl font-bold text-center">
        Latest <span className="text-red-500">Job Openings—</span>
      </h1>

      {/* Job Postings */}
      {jobs.map((job) => (
          <div key={job}>
            {job}
          </div>
      ))}
    </div>
  );
};

export default LatestJobs;
