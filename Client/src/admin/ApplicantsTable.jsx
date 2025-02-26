import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus } from "../store/applicationSlice";
import toast from "react-hot-toast";

const ApplicantsTable = () => {
  const dispatch = useDispatch();
  
  // fetch applicant data from the redux
  const applicants = useSelector((store) => store.application.applicants);

  // functionlity to update the job application status
  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      await axios.post(`http://localhost:4000/application/status/${applicantId}/update`, {
        applicationStatus: newStatus   // send updated status to the backend
      },{
        withCredentials: true
      });
      // update the redux store with the application status and applicantId
      dispatch(updateStatus({ id: applicantId, status: newStatus }));
      toast.success("Job Application Status Updated")
    } catch (error) {
      toast.error("Error updating application status:", error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left">
            <th className="px-4 py-3 text-sm">Applicant Name</th>
            <th className="px-4 py-3 text-sm">Email</th>
            <th className="px-4 py-3 text-sm">Contact No</th>
            <th className="px-4 py-3 text-sm">Resume</th>
            <th className="px-4 py-3 text-sm">Date</th>
            <th className="px-4 py-3 text-sm w-32 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants && applicants.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <tr
                key={item._id}
                className="bg-gray-50 even:bg-gray-100 text-left border-b"
              >
                <td className="px-4 py-3 text-sm">
                  {item?.applicant?.fullname || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {item.applicant?.email || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {item?.applicant?.phoneNumber || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm">
                  <a
                    href={item?.applicant?.profile?.resume || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-4 py-3 text-sm">
                  {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-4 py-3 text-center">
                  <select
                    className="border border-gray-300 sm:text-sm text-xs sm:px-4 px-2 pb-1 pt-1 rounded-md font-mono cursor-pointer"
                    value={item.applicationStatus || "pending"}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No applicants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
