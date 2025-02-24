import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Applicants = () => {
  return (
    <>
      <Navbar />
      <div className="mt-4 p-6 bg-white shadow-lg rounded-lg max-w-8xl mx-auto">
        <div className="sm:text-2xl text-xl font-bold text-black mb-4">
          JobTitle
        </div>
        <div className="space-y-4">
          <p className="text-gray-700 sm:text-lg text-sm">jobDescription</p>
          <p className="sm:text-lg text-sm font-semibold">
            Location: <span className="font-normal">jobLocation</span>
          </p>
          <p className="sm:text-lg text-sm font-semibold">
            Experience Required: <span className="font-normal">experience</span>
          </p>
          <p className="sm:text-lg text-sm  font-semibold">
            Package: <span className="font-normal">packageOffered</span>
          </p>
          <p className="sm:text-lg text-sm  font-semibold">
            Number of Positions:{" "}
            <span className="font-normal">openPositions</span>
          </p>
          <p className="sm:text-lg text-sm  font-semibold">
            Job Posted: <span className="font-normal">Date</span>
            <p className="sm:text-lg text-sm mt-4 font-semibold">
              Number of Positions: <span className="font-normal">3</span>
            </p>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applicants;
