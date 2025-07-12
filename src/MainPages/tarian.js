import React, { useEffect, useState } from "react";
import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";
import ListCard from "../MainComponent/listComponent/listCard";
import API from "../config/api";
import Swal from "sweetalert2";
import LoaderPage from "./loader";

const desc =
  "Tarian adat Toraja tidak hanya sekadar pertunjukan seni, tetapi juga medium penting untuk mengekspresikan nilai-nilai budaya, kepercayaan spiritual, dan struktur sosial masyarakat Toraja. Sebagian besar tarian ini terkait erat dengan siklus kehidupan, terutama upacara kematian Rambu Solo' dan upacara syukuran Rambu Tuka'. Gerakan-gerakan dalam tarian seringkali simbolis, mencerminkan perjalanan arwah, kegembiraan, atau kesedihan.";

const TarianPage = () => {
  const [data, setData] = useState([]); // default: []
  const [categories, setCategories] = useState([]); // default: []
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const defaultTariData = [
    {
      id: 1,
      title: "Tari Pa'gellu",
      description:
        "Tarian sukacita yang biasa dipertunjukkan pada upacara adat.",
      image:
        "https://i.pinimg.com/1200x/11/ce/30/11ce30ac14196a6aa5c4312016583cca.jpg",
    },
  ];
  const defaultTariCategories = [
    { value: 1, label: "Upacara" },
    { value: 2, label: "Penyambutan" },
  ];

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [resDance, resCategories] = await Promise.all([
        API.get("/dance"),
        API.get("/dance/categories"),
      ]);
      const transformedCategories = resCategories.data.map((item) => ({
        value: item.id,
        label: item.name_category,
      }));
      setData(resDance.data || []);
      setCategories(transformedCategories || []);
    } catch (err) {
      console.error(err);
      const result = await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data tarian atau kategori.",
        showCancelButton: true,
        confirmButtonText: "Coba Lagi",
        cancelButtonText: "Tampilkan Default",
      });
      if (result.isConfirmed) {
        fetchAllData();
        return;
      } else {
        setData(defaultTariData);
        setCategories(defaultTariCategories);
      }
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
      <HeaderList
        title="Tarian Khas Toraja"
        image="https://i.pinimg.com/1200x/9d/5c/26/9d5c26608b1364bbb47ae4761f6f3a55.jpg"
      />

      <ListCard
        topic="dance"
        data={data}
        categories={categories}
        title="Tarian Tradisional Khas Toraja"
        description={desc}
        image="https://i.pinimg.com/1200x/11/ce/30/11ce30ac14196a6aa5c4312016583cca.jpg"
      />

      <Footer />
    </div>
  );
};

export default TarianPage;
