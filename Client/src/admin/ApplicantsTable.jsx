import { useSelector } from "react-redux";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left">
            <th className="px-4 py-3 text-sm">Applicant Name</th>
            <th className="px-4 py-3 text-sm">Email</th>
            <th className="px-4 py-3 text-sm">Contact No</th>
            <th className="px-4 py-3 text-sm">Job Applied</th>
            <th className="px-4 py-3 text-sm">Resume</th>
            <th className="px-4 py-3 text-sm">Date</th>
            <th className="px-4 py-3 text-sm w-32 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50 even:bg-gray-100 text-left border-b">
            <td className="px-4 py-3 text-sm">Applicant Name</td>
            <td className="px-4 py-3 text-sm">Email</td>
            <td className="px-4 py-3 text-sm">Contact No</td>
            <td className="px-4 py-3 text-sm">Job Applied</td>
            <td className="px-4 py-3 text-sm">Resume</td>
            <td className="px-4 py-3 text-sm">Applied Date</td>
            <td className="px-4 py-3 text-center">
              <select className="border border-gray-300 sm:text-sm text-xs sm:px-4 px-2 pb-1 pt-1 rounded-md font-mono cursor-pointer">
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
