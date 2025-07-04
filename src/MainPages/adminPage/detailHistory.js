import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../config/api";
import DetailAdmin from "../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../MainComponent/adminComponent/headerAdmin";

const DetailHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  // Load detail data
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/history/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Update title & description
  const updateText = async (title, description) => {
    try {
      await API.put(`/history/${id}`, { title, description });
      alert("Berhasil update data!");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal update data.");
    }
  };

  // Upload / update image
  const uploadImage = async (imageFile) => {
    if (!imageFile) return alert("Pilih gambar dulu!");
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await API.put(`/history/image/${id}`, formData);
      alert("Berhasil update gambar!");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal upload gambar.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak ditemukan</p>;
  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-10 bg-toraja-putih">
      <HeaderAdmin title={"Update Detail Data Sejarah"} />
      <DetailAdmin
        data={data}
        updateText={updateText}
        uploadImage={uploadImage}
      />
    </div>
  );
};
export default DetailHistory;
