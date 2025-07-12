import React, { useEffect, useState } from "react";

import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";
import ListSejarah from "../MainComponent/sejarahComponent/listSejarah";
import ListFilosofi from "../MainComponent/sejarahComponent/listFilosofi";
import SejarahSection from "../MainComponent/sejarahComponent/sejarahSection";
import AsalSection from "../MainComponent/sejarahComponent/asalSection";
import API from "../config/api";
import { url } from "../config/route";
import LoaderPage from "./loader";

const SejarahPage = () => {
  const [dataSejarah, setDataSejarah] = useState({
    id: null,
    title: "",
    desc: "",
    img: [],
  });
  const [dataFilosofi, setDataFilosofi] = useState([]);
  const [dataAsal, setDataAsal] = useState({
    id: null,
    title: "",
    desc: "",
    img: [],
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      // ambil data sejarah & asal
      const resSejarah = await API.get("/history");
      let transformedData = resSejarah.data.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.description,
        img: item.images && item.images.length > 0 ? item.images : [],
      }));
      const sejarah = transformedData.find((a) =>
        a.title.toLowerCase().includes("sejarah")
      ) || { id: null, title: "", desc: "", img: [] };
      const asal = transformedData.find(
        (a) => !a.title.toLowerCase().includes("sejarah")
      ) || { id: null, title: "", desc: "", img: [] };

      setDataSejarah(sejarah);
      setDataAsal(asal);

      // ambil data filosofi
      const resFilosofi = await API.get("/philosophy");
      setDataFilosofi(resFilosofi.data || []);

      setError("");
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <HeaderList
        title="Sejarah dan Asal Usul"
        image="https://i.pinimg.com/736x/3c/22/3f/3c223fb465fcd2f831cb1b27ebc8cdf7.jpg"
      />

      <ListSejarah />
      {isLoading ? (
        <>
          <LoaderPage />
        </>
      ) : (
        <>
          <SejarahSection data={dataSejarah} />
          <AsalSection data={dataAsal} />
          <ListFilosofi data={dataFilosofi} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default SejarahPage;
