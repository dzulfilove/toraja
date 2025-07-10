import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./MainComponent/navbar";
import Footer from "./MainComponent/footer";
import Sidebar from "./MainComponent/sidebar";
import API from "./config/api";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-grow ml-56">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
