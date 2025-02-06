const JobCategory = () => {

  const category = [
      "Frontend Developer",
      "Backend Developer",
      "Data Engineer",
      "UI UX Designer",
      "Software Developer"
  ]

  return (
      <div className="p-4 mt-8">
          <div className="flex justify-center overflow-x-auto space-x-6 py-2 items-center scrollbar-hide min-w-full">
              {category.map((cat, index) => (
                  <button
                      key={index}
                      className="bg-red-500 text-white sm:text-sm text-xs px-2 py-1 sm:px-6 sm:py-2 rounded-lg hover:bg-red-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                      {cat}
                  </button>
              ))}
          </div>
      </div>
  );
}

export default JobCategory;
