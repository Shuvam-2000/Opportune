


const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg px-6 md:px-10 lg:px-20 py-12 mt-4 text-white text-center">
      {/* Heading */}
      <h1 className="sm:text-5xl text-xl font-bold leading-tight tracking-wide">
        Search, Apply & <br /> Get Your <span className="text-black">Dream Job</span>
      </h1>

      {/* Subheading */}
      <p className="sm:text-lg text-sm mt-4 text-gray-200 tracking-wide">
        Find your perfect job with top companies. Apply now and kickstart your career.
      </p>

      {/* Search Bar */}
      <div className="flex mt-6 sm:w-full w-[70] sm:max-w-lg bg-white rounded-full p-1 shadow-md">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="flex-1 px-3 sm:px-4 sm:py-2 py-1 sm:text-sm text-sm text-gray-800 outline-none rounded-l-full"
        />
        <button className="bg-black sm:text-sm text-sm text-white px-5 sm:px-6 sm:py-2 py-1 rounded-r-full hover:bg-gray-900 cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
};

export default Banner;
