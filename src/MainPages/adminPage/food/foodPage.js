import { useEffect, useState } from "react";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import ListCardAdmin from "../../../MainComponent/adminComponent/listCardAdmin";

export default function FoodPage() {
  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [error, setError] = useState(""); // opsional: untuk tampilkan pesan error

  const getData = async () => {
    try {
      const res = await API.get("/food");

      // Transformasi data
      const transformedData = res.data.map((item) => ({
        ...item, // Pertahankan properti lainnya
        title: item.nama, // Ubah 'nama' menjadi 'title'
        image: [
          {
            // Ubah 'image' string menjadi array objek
            url: item.image,
            id: Math.random().toString(36).substring(2, 9), // Generate random ID
          },
        ],
        nama: undefined, // Hapus properti nama lama (optional)
      }));

      console.log(transformedData);
      setData(transformedData);
      setError(""); // clear error
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreate = async () => {
    try {
      await API.post("/food", {
        title: newTitle,
        description: newDesc,
        image: "", // atau path default
      });
      setNewTitle(""); // reset input
      setNewDesc("");
      getData();
      setError("");
    } catch (err) {
      console.error("Error creating data:", err);
      setError("Gagal menambah data");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/food/${id}`);
      getData();
      setError("");
    } catch (err) {
      console.error("Error deleting data:", err);
      setError("Gagal menghapus data");
    }
  };

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-10 bg-toraja-putih">
      <HeaderAdmin title={"Kelola Data Makanan Tradisional"} />
      <ListCardAdmin
        topic={"food"}
        data={data}
        image="https://res.cloudinary.com/diipdl14x/image/upload/v1751567242/filosofi_dlh9dl.jpg"
        title="Makanan Tradisional Khas Budaya Toraja"
        description=""
      />
    </div>
  );
}
