import { useEffect, useState } from "react";
import API from "../../../config/api";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import ListCardAdmin from "../../../MainComponent/adminComponent/listCardAdmin";
import Swal from "sweetalert2";
import LoaderPage from "../../loader"; // pastikan komponen loader ini ada

export default function NewPhilosophyPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true); // tambahkan loading saat fetch data
      const res = await API.get("/philosophy");
      setData(res.data);
      setError("");
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPage />
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-10 bg-white">
      <HeaderAdmin title={"Kelola Data Filosofi Masyarakat Toraja"} />
      <ListCardAdmin
        topic={"filosofi"}
        data={data}
        image="https://res.cloudinary.com/diipdl14x/image/upload/v1751567242/filosofi_dlh9dl.jpg"
        title="Filosofi Budaya Toraja"
        description=""
      />
    </div>
  );
}
