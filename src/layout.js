import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./MainComponent/navbar";
import Footer from "./MainComponent/footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Ini akan merender konten halaman */}
      </main>
    </div>
  );
};

export default Layout;
