import { useEffect, useState } from "react";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import ListCardAdmin from "../../../MainComponent/adminComponent/listCardAdmin";

export default function History() {
  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [error, setError] = useState(""); // opsional: untuk tampilkan pesan error

  const getData = async () => {
    try {
      const res = await API.get("/history");
      console.log(res.data);
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

  const handleCreate = async () => {
    try {
      await API.post("/history", {
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
      await API.delete(`/history/${id}`);
      getData();
      setError("");
    } catch (err) {
      console.error("Error deleting data:", err);
      setError("Gagal menghapus data");
    }
  };

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
