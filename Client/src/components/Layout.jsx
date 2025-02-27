import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Chatbot from "./Chatbot";

const Layout = () => {
  return (
    <>
      <Navbar />
        <Outlet />
        <Chatbot />
      <Footer />
    </>
  );
};

export default Layout;
