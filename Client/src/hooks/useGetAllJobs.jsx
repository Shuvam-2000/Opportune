import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setallJobs } from "../store/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  // state to handle error messages
  const [errorMessage, setErrorMessage] = useState('')

  // fetching fetched query from the redux store
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const getAllJobs = async () => {
      try {
        // check if search query is empty or keyword is provided if not then do not append the ?keyowrd to the API url
        const queryparams = searchedQuery ? `?keyword=${searchedQuery}` : "";
        const res = await axios.get(
          `http://localhost:4000/jobs/alljobs${queryparams}`,
          {
            withCredentials: true,
          }
        );
        if (res.data?.success) {
          dispatch(setallJobs(res.data.allJobs)); // disptach the fetched jobs to redux store
        }
      } catch (error) {
        console.error("Error fetching jobs:", error); // Debugging log
        setErrorMessage(error.response?.data?.message || "Failed to fetch jobs");
      }
    };
    getAllJobs();
  }, [searchedQuery, dispatch]); // run when searchedQuery or distpatch changes
  return { errorMessage };  // error message in case the jobs fetching failed
};

export default useGetAllJobs;
