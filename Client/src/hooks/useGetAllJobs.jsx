import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setallJobs } from "../store/jobSlice";

const useGetAllJobs = (filterBySearch = false) => {  // Pass true to apply search filter
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const { searchJobQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        // Apply search filter only if filterBySearch is true
        let queryparams = "";
        if (filterBySearch && searchJobQuery) {
          queryparams = `?keyword=${searchJobQuery}`;
        }

        const res = await axios.get(
          `http://localhost:4000/jobs/alljobs${queryparams}`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          dispatch(setallJobs(res.data.allJobs));  // Store jobs in Redux
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Failed to fetch jobs");
      }
    };
    getAllJobs();
  }, [searchJobQuery, dispatch, filterBySearch]);

  return { errorMessage };
};

export default useGetAllJobs;
