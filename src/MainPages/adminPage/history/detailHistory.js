import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../config/api";
import DetailAdmin from "../../../MainComponent/adminComponent/detailAdmin";
import HeaderAdmin from "../../../MainComponent/adminComponent/headerAdmin";
import Breadcrumb from "../../../MainComponent/adminComponent/breadcrumb";
import Swal from "sweetalert2";

const DetailHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load detail data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/history/${id}`);
      console.log(res.data, "data detail");
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

  // ✅ Update title & description + update/tambah gambar
  const updateText = async (title, description, images) => {
    try {
      console.log("update begin");
      await API.put(`/history/${id}`, { title, description });
      console.log("Update title & description sukses");
      console.log(images);
      const editedImages = images.filter(
        (img) => img.isEdit === true && img.id && img.file
      );
      const deletedImage = images.filter(
        (img) => img.isDeleted === true && img.id
      );
      for (const img of deletedImage) {
        await deleteSingleImage(img.id, img.file);
      }
      for (const img of editedImages) {
        await updateSingleImage(img.id, img.file);
      }

      const newImages = images.filter((img) => img.isNew === true && img.file);
      for (const img of newImages) {
        await addImage(img.file);
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diperbarui.",
      });
      loadData(); // refresh data
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memperbarui data!",
      });
    }
  };

  // Tambah gambar baru
  const addImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file, "ADD");
    await API.post(`/history/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // Update gambar lama
  const updateSingleImage = async (imageId, file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file, "UPDATE");

    await API.put(`/history/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const deleteSingleImage = async (imageId) => {
    const formData = new FormData();

    await API.delete(`/history/${id}/image/${imageId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak ditemukan</p>;

  return (
    <div className="relative h-screen overflow-y-auto snap-y snap-mandatory font-montserrat p-4 bg-toraja-putih">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Sejarah", href: "/admin/sejarah" },
          { label: "Detail" }, // halaman aktif biasanya tidak ada href
        ]}
      />
      <HeaderAdmin title={"Update Detail Data Sejarah"} />
      <DetailAdmin
        data={data}
        updateText={updateText}
        categories={[]}
        topic={"sejarah"}
      />
    </div>
  );
};

export default DetailHistory;
