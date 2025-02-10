import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-[#414141] py-14">
      <div className="flex flex-col sm:grid grid-cols-1 gap-10 sm:gap-14 my-10 text-sm">
        
        {/* Company Links Section */}
        <div className="text-center font-mono">
          <h1 className="sm:text-3xl text-2xl font-bold text-black">
            Oppor<span className="text-[#f21c1c]">tune</span>
          </h1>
          <p className="mt-4 sm:text-sm text-xs font-mono text-gray-600">
            Discover, explore, and apply to latest jobs, accelerate your carrier
            with Opportune
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-4 tracking-widest">
            JOBS & CAREERS—
          </h2>
          <div className="space-x-6">
            <Link to="/" className="text-black hover:text-[#f21c1c]">
              Home
            </Link>
            <Link to="/explorejobs" className="text-black hover:text-[#f21c1c]">
              Explore Jobs
            </Link>
            <Link to="/browse" className="text-black hover:text-[#f21c1c]">
              Browse
            </Link>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <h2 className="text-md font-medium mb-2 tracking-wide">
            Get In Touch—
          </h2>
          <div className="flex justify-center gap-6 mt-6 cursor-pointer">
            <FaFacebook className="w-[20px] hover:text-[#f21c1c]" />
            <FaInstagramSquare className="w-[20px] hover:text-[#f21c1c]" />
            <FaTwitter className="w-[20px] hover:text-[#f21c1c]" />
            <FaYoutube className="w-[20px] hover:text-[#f21c1c]" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 border-t border-gray-400 pt-4">
        <p>&copy; 2025 Opportune. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
