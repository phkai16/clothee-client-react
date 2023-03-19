import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Announcement from "./Announcement";

const Layout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <>
      <Navbar />
      <Announcement />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default Layout;
