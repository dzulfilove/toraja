import { useEffect, useState } from "react";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import ListCardAdmin from "../../../MainComponent/adminComponent/listCardAdmin";
import LoaderPage from "../../loader"; // pastikan file ini ada

export default function History() {
  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // tambahkan loading

  const getData = async () => {
    try {
      setLoading(true); // mulai loading
      const res = await API.get("/history");
      setData(res.data);
      setError("");
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    } finally {
      setLoading(false); // selesai loading
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreate = async () => {
    try {
      setLoading(true); // loading saat create
      await API.post("/history", {
        title: newTitle,
        description: newDesc,
        image: "", // atau path default
      });
      setNewTitle("");
      setNewDesc("");
      getData();
      setError("");
    } catch (err) {
      console.error("Error creating data:", err);
      setError("Gagal menambah data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true); // loading saat delete
      await API.delete(`/history/${id}`);
      getData();
      setError("");
    } catch (err) {
      console.error("Error deleting data:", err);
      setError("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPage />
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-10 bg-white">
      <HeaderAdmin title={"Kelola Data Sejarah"} />
      <ListCardAdmin
        topic={"sejarah"}
        data={data}
        image="https://res.cloudinary.com/diipdl14x/image/upload/v1751567242/filosofi_dlh9dl.jpg"
        title="Sejarah dan Asal Usul Budaya Toraja"
        description=""
      />
    </div>
  );
}
