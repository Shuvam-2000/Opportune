import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetApplicants, setApplicants } from "../store/applicationSlice";

const Applicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { applicants } = useSelector((store) => store.application)
  useEffect(() => {
    const fetchApplicants = async () => {
      dispatch(resetApplicants())  // reset data to null
      try {
        const res = await axios.get(
          `http://localhost:4000/application/applicants/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          dispatch(setApplicants(res?.data?.job));
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchApplicants();
  }, []);
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-2xl font-semibold mb-4">Applicants: ({applicants?.applications?.length})</h1>
        <div className="border rounded-lg shadow-md p-4 mt-6 bg-white">
          <ApplicantsTable />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applicants;
