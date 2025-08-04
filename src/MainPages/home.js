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
import LoaderPage from "./loader"; // pastikan file loader sudah ada

const HomePage = () => {
  const [dataSejarah, setDataSejarah] = useState([]);
  const [dataDance, setDataDance] = useState([]);
  const [dataFood, setDataFood] = useState([]);
  const [dataTour, setDataTour] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const resHistory = await API.get("/history");
      const resPhilosophy = await API.get("/philosophy");
      const resDance = await API.get("/dance/part");
      const resFood = await API.get("/food/part");
      const resTour = await API.get("/tourist/part");

      // Default image URL
      const defaultImage =
        "https://512pixels.net/wp-content/uploads/2025/06/11-0-Night-thumbnail.jpg";

      // Transform history data
      let transformedHistory = resHistory.data.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.description,
        img: item.images?.[0]?.image || defaultImage,
      }));

      // Add philosophy data
      if (resPhilosophy.data.length > 0) {
        transformedHistory.push({
          id: resPhilosophy.data[0].id,
          title: resPhilosophy.data[0].title,
          desc: resPhilosophy.data[0].description,
          img: filosofi || defaultImage,
        });
      }

      // Transform dance data
      const transformedDance =
        resDance.data?.map((item) => ({
          ...item,
          images: [
            {
              image: item.images?.[0]?.image || defaultImage,
            },
          ],
        })) || [];

      // Transform food data
      const transformedFood =
        resFood.data?.map((item) => ({
          ...item,
          images: [
            {
              image: item.images?.[0]?.image || defaultImage,
            },
          ],
        })) || [];

      // Transform tour data
      const transformedTour =
        resTour.data?.map((item) => ({
          ...item,
          images: [
            {
              image: item.images?.[0]?.image || defaultImage,
            },
          ],
        })) || [];

      console.log(transformedDance);
      setDataSejarah(transformedHistory);
      setDataDance(transformedDance);
      setDataFood(transformedFood);
      setDataTour(transformedTour);
      setError(""); // clear error
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPage />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <div className="snap-start h-screen">
        <HeroWithVideo />
      </div>
      <div className="snap-start h-screen">
        <MapSection />
      </div>
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
