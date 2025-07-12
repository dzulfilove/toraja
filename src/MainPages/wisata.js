import React, { useEffect, useState } from "react";
import Footer from "../MainComponent/footer";
import HeaderList from "../MainComponent/listComponent/headerList";
import ListCard from "../MainComponent/listComponent/listCard";
import Swal from "sweetalert2";
import API from "../config/api";
import LoaderPage from "./loader";

const desc =
  "Toraja menawarkan pengalaman wisata yang kaya, memadukan keindahan alam pegunungan yang memukau dengan kekayaan budaya yang otentik. Anda bisa menjelajahi situs megalitikum kuno, menyaksikan upacara adat yang penuh makna, atau menikmati panorama lanskap persawahan terasering yang hijau. Setiap sudut Toraja menjanjikan cerita dan keunikan yang tak terlupakan.";

// ✅ Default data untuk backup
const defaultData = [
  {
    id: 1,
    title: "Kete Kesu'",
    description: "Desa tradisional dengan rumah Tongkonan yang indah dan kuburan tebing.",
    image: "https://i.pinimg.com/1200x/74/7b/d9/747bd9458f1151a8c076128ad30ebbe0.jpg",
  },
  {
    id: 2,
    title: "Londa",
    description: "Kuburan di tebing batu dengan peti mati kayu dan patung tau-tau.",
    image: "https://i.pinimg.com/1200x/cf/2c/c0/cf2cc00bef38e3e3eaca168275fd8887.jpg",
  },
];

const defaultCategories = [
  { value: 1, label: "Budaya" },
  { value: 2, label: "Alam" },
];

const WisataPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [resWisata, resCategories] = await Promise.all([
        API.get("/tourist"),
        API.get("/tourist/categories"),
      ]);

      const transformedCategories = resCategories.data.map((item) => ({
        value: item.id,
        label: item.name_category,
      }));

      setData(resWisata.data || []);
      setCategories(transformedCategories || []);
    } catch (err) {
      console.error("Error loading data:", err);
      // ✅ Show swal with retry option
      const result = await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data wisata atau kategori.",
        showCancelButton: true,
        confirmButtonText: "Coba Lagi",
        cancelButtonText: "Tampilkan Default",
      });

      if (result.isConfirmed) {
        // Retry
        fetchAllData();
        return;
      } else {
        // Load default data
        setData(defaultData);
        setCategories(defaultCategories);
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
      <HeaderList
        title="Wisata Daerah Toraja"
        image="https://i.pinimg.com/1200x/cf/2c/c0/cf2cc00bef38e3e3eaca168275fd8887.jpg"
      />
      <ListCard
        topic="tourist"
        data={data}
        categories={categories}
        title="Wisata Daerah Masyarakat Toraja"
        description={desc}
        image="https://i.pinimg.com/1200x/74/7b/d9/747bd9458f1151a8c076128ad30ebbe0.jpg"
      />
      <Footer />
    </div>
  );
};

export default WisataPage;
