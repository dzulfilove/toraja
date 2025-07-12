import { useEffect, useState } from "react";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import ListCardAdmin from "../../../MainComponent/adminComponent/listCardAdmin";
import Swal from "sweetalert2";

export default function DancePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(""); // opsional: untuk tampilkan pesan error
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/dance/categories`);
      const transformedData = res.data.map((item) => ({
        value: item.id,
        label: item.name_category,
      }));
      setCategories(transformedData);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat kategori Tarian.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const res = await API.get("/dance");

      setData(res.data);
      setError(""); // clear error
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-10 bg-white">
      <HeaderAdmin title={"Kelola Data Tarian Tradisional"} />
      <ListCardAdmin
        topic={"tarian"}
        data={data}
        image="https://res.cloudinary.com/diipdl14x/image/upload/v1751567242/filosofi_dlh9dl.jpg"
        title="Tarian Tradisional Khas Budaya Toraja"
        description=""
        categories={categories}
      />
    </div>
  );
}
