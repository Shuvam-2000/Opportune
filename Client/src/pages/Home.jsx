import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import JobCategory from "../components/JobCategory";
import LatestJobs from "../components/LatestJobs";
import useGetAllJobs from "../hooks/useGetAllJobs";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useGetAllJobs(); // Fetch jobs data from backend

  // Redirect recruiter to company page
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies", { replace: true });
    }
  }, []); // Fixed missing dependencies

  return (
    <>
      <ScrollToTop />
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <Banner />
        <div className="mt-8">
          <JobCategory />
        </div>
        <div className="mt-8">
          <LatestJobs />
        </div>
      </div>
    </>
  );
};

export default Home;
