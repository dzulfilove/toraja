import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./MainComponent/navbar";
import Footer from "./MainComponent/footer";
import Sidebar from "./MainComponent/sidebar";
import API from "./config/api";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cek login status saat mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await API.get("/auth/check");
        // asumsikan jika berhasil, berarti login
        if (res.data) setIsLoggedIn(true);
        console.log(res);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen flex">
      {isLoggedIn ? (
        <>
          <Sidebar />
          <main className="flex-grow ml-56">
            <Outlet />
          </main>
        </>
      ) : (
        <div className="flex flex-col flex-grow">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
