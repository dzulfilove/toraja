import React, { useEffect, useState } from "react";
import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";
import ListCard from "../MainComponent/listComponent/listCard";
import API from "../config/api";
import Swal from "sweetalert2";
import LoaderPage from "./loader"; // pastikan ada loader

const desc =
  "Kuliner Toraja memiliki cita rasa yang kuat dan unik, didominasi oleh penggunaan bumbu rempah alami serta cara memasak tradisional. Banyak hidangan dimasak dalam bambu atau daun pisang, memberikan aroma khas dan mempertahankan kekayaan rasa. Makanan Toraja tidak hanya sekadar santapan, tetapi juga bagian integral dari ritual adat dan kehidupan sehari-hari.";

const MakananPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const defaultFoodData = [
    {
      id: 1,
      title: "Pa'piong",
      description: "Makanan khas Toraja yang dimasak dalam bambu.",
      image:
        "https://i.pinimg.com/1200x/fc/0b/dd/fc0bdd8b1b86fff3cc8080ec650985f1.jpg",
    },
  ];
  const defaultFoodCategories = [
    { value: 1, label: "Daging" },
    { value: 2, label: "Sayuran" },
  ];

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [resFoods, resCategories] = await Promise.all([
        API.get("/food"),
        API.get("/food/categories"),
      ]);
      const transformedCategories = resCategories.data.map((item) => ({
        value: item.id,
        label: item.name_category,
      }));
      setData(resFoods.data || []);
      setCategories(transformedCategories || []);
    } catch (err) {
      console.error(err);
      const result = await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data makanan atau kategori.",
        showCancelButton: true,
        confirmButtonText: "Coba Lagi",
        cancelButtonText: "Tampilkan Default",
      });
      if (result.isConfirmed) {
        fetchAllData();
        return;
      } else {
        setData(defaultFoodData);
        setCategories(defaultFoodCategories);
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
        title="Makanan Khas Toraja"
        image="https://i.pinimg.com/1200x/1d/3f/60/1d3f60d5b1ae11bfc8aa92f769bfe95a.jpg"
      />
      <ListCard
        topic="food"
        data={data}
        categories={categories}
        title="Makanan Tradisional Khas Toraja"
        description={desc}
        image="https://i.pinimg.com/1200x/fc/0b/dd/fc0bdd8b1b86fff3cc8080ec650985f1.jpg"
      />
      <Footer />
    </div>
  );
};

export default MakananPage;
