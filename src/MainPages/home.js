import React, { useEffect, useState } from "react";
import HeroWithVideo from "../MainComponent/homeComponent/hero";
import HomeSlider from "../MainComponent/homeComponent/homeSlider";
import MapSection from "../MainComponent/homeComponent/map";
import HomeTarian from "../MainComponent/homeComponent/homeTarian";
import HomeMakanan from "../MainComponent/homeComponent/homeMakanan";
import Footer from "../MainComponent/footer";
import HomeWisata from "../MainComponent/homeComponent/homeWisata";
import API from "../config/api";
import filosofi from "../assets/filosofi.jpg";
import { url } from "../config/route";

const HomePage = () => {
  const [dataSejarah, setDataSejarah] = useState([]);
  const [error, setError] = useState(""); // opsional: untuk tampilkan pesan error
  const [dataDance, setDataDance] = useState([]);
  const [dataFood, setDataFood] = useState([]);
  const [dataTour, setDataTour] = useState([]);

  const getDataSejarah = async () => {
    try {
      const res = await API.get("/history");
      console.log(res.data);
      let transformedData = res.data.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.description,
        img: `${url}/${item.images[0].image}`,
      }));
      const philosophy = await getDataPhilosophy();
      transformedData.push({
        id: philosophy[0].id,
        title: philosophy[0].title,
        desc: philosophy[0].description,
        img: filosofi,
      });

      console.log(transformedData, "final data");
      setDataSejarah(transformedData);
      setError(""); // clear error
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    }
  };

  useEffect(() => {
    getDataSejarah();
    getDataDance();
    getDataFood();
    getDataTour();
  }, []);

  const getDataPhilosophy = async () => {
    try {
      const res = await API.get("/philosophy");
      console.log("filosofi", res.data);
      setError(""); // clear error
      return res.data;
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    }
  };

  const getDataDance = async () => {
    try {
      const res = await API.get("/dance");

      setDataDance(res.data);
      setError(""); // clear error
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    }
  };

  const getDataFood = async () => {
    try {
      const res = await API.get("/food");

      setDataFood(res.data);
      setError(""); // clear error
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    }
  };

  const getDataTour = async () => {
    try {
      const res = await API.get("/tourist");

      setDataTour(res.data);
      setError(""); // clear error
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    }
  };

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <div className="snap-start h-screen">
        <HeroWithVideo />
      </div>
      <div className="snap-start h-screen">
        <MapSection />
      </div>

      {/* Slider Section */}
      <div className="snap-start h-screen">
        <HomeSlider slides={dataSejarah} />
      </div>
      <div className="snap-start h-screen">
        <HomeTarian data={dataDance} />
      </div>
      <div className="snap-start h-screen">
        <HomeMakanan data={dataFood} />
      </div>
      <div className="snap-start h-screen">
        <HomeWisata data={dataTour} />
      </div>
      <div className="snap-start h-screen">
        <Footer />
      </div>
    </div>
  );
};
export default HomePage;
