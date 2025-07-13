import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Login from "./MainPages/auth";
import HomePage from "./MainPages/home";
import SejarahPage from "./MainPages/sejarah";
import TarianPage from "./MainPages/tarian";
import MakananPage from "./MainPages/makanan";
import DetailPage from "./MainPages/detailPage";
import WisataPage from "./MainPages/wisata";
import History from "./MainPages/adminPage/history/historyPage";
import UploadImage from "./MainPages/adminPage/upload";
import DetailHistory from "./MainPages/adminPage/history/detailHistory";
import FoodPage from "./MainPages/adminPage/food/foodPage";
import AddItems from "./MainComponent/adminComponent/addItems";
import AddFood from "./MainPages/adminPage/food/addFood";
import DetailFood from "./MainPages/adminPage/food/detailFood";
import DancePage from "./MainPages/adminPage/dance/dancePage";
import DetailDance from "./MainPages/adminPage/dance/detailDance";
import AddDance from "./MainPages/adminPage/dance/addDance";
import TourPage from "./MainPages/adminPage/tour/tourPage";
import DetailTour from "./MainPages/adminPage/tour/detailTour";
import AddTour from "./MainPages/adminPage/tour/addTour";
import API from "./config/api";
import HomeAdmin from "./MainPages/adminPage/home/homePage";
import LayoutAdmin from "./layoutAdmin";
import DetailPhilosohy from "./MainPages/adminPage/philosophy/detailPhilosophy";
import AddPhilosophy from "./MainPages/adminPage/philosophy/addPhilosophy";
import PhilosophyPage from "./MainPages/adminPage/philosophy/filosofiPage";

function App() {
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
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="sejarah" element={<SejarahPage />} /> */}
        <div className="p-4">Loading = {isLoggedIn}</div>
        {isLoggedIn == true ? (
          <>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<HomeAdmin />} />

              <Route path="/admin/sejarah" element={<History />} />
              <Route
                path="/admin/sejarah/detail/:id"
                element={<DetailHistory />}
              />
              <Route path="/admin/makanan" element={<FoodPage />} />
              <Route
                path="/admin/makanan/detail/:id"
                element={<DetailFood />}
              />
              <Route path="/admin/add/makanan" element={<AddFood />} />
              <Route path="/admin/tarian" element={<DancePage />} />
              <Route
                path="/admin/tarian/detail/:id"
                element={<DetailDance />}
              />
              <Route path="/admin/add/tarian" element={<AddDance />} />
              <Route path="/admin/wisata" element={<TourPage />} />
              <Route path="/admin/wisata/detail/:id" element={<DetailTour />} />
              <Route path="/admin/add/wisata" element={<AddTour />} />

              <Route path="/admin/filosofi" element={<PhilosophyPage />} />
              <Route
                path="/admin/filosofi/detail/:id"
                element={<DetailPhilosohy />}
              />
              <Route path="/admin/add/filosofi" element={<AddPhilosophy />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="sejarah" element={<SejarahPage />} />
              <Route path="tarian" element={<TarianPage />} />
              <Route path="makanan" element={<MakananPage />} />
              <Route path="wisata" element={<WisataPage />} />
              <Route path="/detail/:topic/:id" element={<DetailPage />} />
            </Route>
          </>
        )}

        {/* <Route path="layanan" element={<Services />} />
          <Route path="kontak" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
