import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Import wrapper route
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

// Halaman umum
import Layout from "./layout";
import Login from "./MainPages/auth";
import HomePage from "./MainPages/home";
import SejarahPage from "./MainPages/sejarah";
import TarianPage from "./MainPages/tarian";
import MakananPage from "./MainPages/makanan";
import DetailPage from "./MainPages/detailPage";
import WisataPage from "./MainPages/wisata";

// Halaman admin
import LayoutAdmin from "./layoutAdmin";
import HomeAdmin from "./MainPages/adminPage/home/homePage";
import History from "./MainPages/adminPage/history/historyPage";
import DetailHistory from "./MainPages/adminPage/history/detailHistory";
import FoodPage from "./MainPages/adminPage/food/foodPage";
import AddFood from "./MainPages/adminPage/food/addFood";
import DetailFood from "./MainPages/adminPage/food/detailFood";
import DancePage from "./MainPages/adminPage/dance/dancePage";
import DetailDance from "./MainPages/adminPage/dance/detailDance";
import AddDance from "./MainPages/adminPage/dance/addDance";
import TourPage from "./MainPages/adminPage/tour/tourPage";
import DetailTour from "./MainPages/adminPage/tour/detailTour";
import AddTour from "./MainPages/adminPage/tour/addTour";
import NewPhilosophyPage from "./MainPages/adminPage/food copy/newPhilosophyPage";
import AddNewPhilosophy from "./MainPages/adminPage/food copy/addNewPhilosophy";
import DetailNewPhilosophy from "./MainPages/adminPage/food copy/detailNewPhilosophy";

import API from "./config/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await API.get("/auth/check");
        if (res.data) setIsLoggedIn(true);
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
    <Router>
      <Routes>
        {/* Routes untuk user yang belum login */}
        <Route element={<PublicRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="sejarah" element={<SejarahPage />} />
            <Route path="tarian" element={<TarianPage />} />
            <Route path="makanan" element={<MakananPage />} />
            <Route path="wisata" element={<WisataPage />} />
            <Route path="/detail/:topic/:id" element={<DetailPage />} />
          </Route>
        </Route>

        {/* Routes untuk user yang sudah login */}
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path="sejarah" element={<History />} />
            <Route path="sejarah/detail/:id" element={<DetailHistory />} />
            <Route path="makanan" element={<FoodPage />} />
            <Route path="makanan/detail/:id" element={<DetailFood />} />
            <Route path="add/makanan" element={<AddFood />} />
            <Route path="tarian" element={<DancePage />} />
            <Route path="tarian/detail/:id" element={<DetailDance />} />
            <Route path="add/tarian" element={<AddDance />} />
            <Route path="wisata" element={<TourPage />} />
            <Route path="wisata/detail/:id" element={<DetailTour />} />
            <Route path="add/wisata" element={<AddTour />} />
            <Route path="filosofi" element={<NewPhilosophyPage />} />
            <Route path="filosofi/detail/:id" element={<DetailNewPhilosophy />} />
            <Route path="add/filosofi" element={<AddNewPhilosophy />} />
          </Route>
        </Route>

        {/* Redirect route tidak valid */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/admin" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
