

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-300 relative">
        {/* Logo */}
        <h1 className="sm:text-3xl text-2xl font-bold text-black cursor-pointer">
            Oppor<span className="sm:text-3xl text-2xl font-bold text-red-600">tune</span>
        </h1>
    </div>
  )
}

export default Navbar