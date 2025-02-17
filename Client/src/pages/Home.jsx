import Banner from "../components/Banner";
import JobCategory from "../components/JobCategory";
import LatestJobs from "../components/LatestJobs";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  return (
    <>
      <Banner />
      <JobCategory />
      <LatestJobs />
    </>
  );
};

export default Home;
